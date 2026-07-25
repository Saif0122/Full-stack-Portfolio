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
    if (event.status === 'succeeded') {
      const payment = await paymentRepo.findByTransactionId(event.transactionId);
      if (payment) {
        await paymentRepo.update(payment._id, { status: 'succeeded', providerResponse: event.rawData });
        // Handle post-payment logic (e.g. generate licenses, send emails, activate order)
        return { success: true, orderId: payment.order };
      }
    }
    return { success: true };
  }
}
