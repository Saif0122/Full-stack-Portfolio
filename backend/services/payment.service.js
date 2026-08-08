import { PaymentRepository } from '../repositories/payment.repository.js';
import { PaymentFactory } from './payment/payment.factory.js';

const paymentRepo = new PaymentRepository();

export class PaymentService {
  async getUserPayments(userId) {
    return await paymentRepo.findAll({ user: userId });
  }

  async createPayment(providerName, orderData) {
    const provider = PaymentFactory.getProvider(providerName);
    const session = await provider.createPaymentSession(orderData);
    
    // Save pending payment record
    const paymentRecord = await paymentRepo.create({
      order: orderData._id,
      user: orderData.user,
      provider: providerName,
      transactionId: session.sessionId,
      amount: orderData.total,
      status: 'pending'
    });

    return { session, paymentRecord };
  }

  async handleWebhook(providerName, req) {
    const provider = PaymentFactory.getProvider(providerName);
    const event = await provider.handleWebhook(req);
    
    // Update payment record based on event
    if (event.status === 'succeeded' && event.orderId) {
      const { OrderRepository } = await import('../repositories/order.repository.js');
      const { generateLicense } = await import('../utils/licenseGenerator.js');
      const orderRepo = new OrderRepository();
      
      const order = await orderRepo.findById(event.orderId);
      if (order && order.status !== 'completed') {
        // Mark order as completed
        await orderRepo.update(order._id, { 
          status: 'completed', 
          paymentIntentId: event.transactionId,
          receiptUrl: event.receiptUrl 
        });

        // Generate licenses for digital products
        const generatedLicenses = [];
        for (const item of order.items) {
          const licenseKey = await generateLicense(order.user, item.product, order._id);
          item.licenseKey = licenseKey;
          generatedLicenses.push({ key: licenseKey });
        }
        await order.save();

        // Send Emails
        const { EmailFactory } = await import('./email/email.factory.js');
        const emailProvider = EmailFactory.getProvider();
        const { UserRepository } = await import('../repositories/user.repository.js');
        const userRepo = new UserRepository();
        const user = await userRepo.findById(order.user);

        if (user) {
          await emailProvider.sendOrderConfirmation(order, user);
          await emailProvider.sendLicenseDelivery(generatedLicenses, user);
        }

        return { success: true, orderId: order._id };
      }
    }
    return { success: true };
  }
}
