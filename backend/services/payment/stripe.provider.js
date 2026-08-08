import { PaymentProvider } from './payment.provider.js';

import Stripe from 'stripe';

export class StripeProvider extends PaymentProvider {
  constructor() {
    super();
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_mock');
  }

  async createPaymentSession(orderData) {
    // Generate Stripe checkout session
    const line_items = orderData.items.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.product.title,
          images: item.product.images?.length ? [item.product.images[0]] : []
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity || 1,
    }));

    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/checkout/cancel`,
      customer_email: orderData.userEmail,
      metadata: {
        orderId: orderData._id.toString(),
        userId: orderData.user.toString()
      }
    });

    return {
      sessionId: session.id,
      url: session.url,
      provider: 'stripe'
    };
  }

  async handleWebhook(req) {
    const sig = req.headers['stripe-signature'];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event;
    try {
      // req.body must be raw buffer for signature verification
      event = this.stripe.webhooks.constructEvent(req.rawBody || req.body, sig, webhookSecret);
    } catch (err) {
      throw new Error(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      return {
        eventType: event.type,
        orderId: session.metadata.orderId,
        userId: session.metadata.userId,
        status: 'succeeded',
        transactionId: session.payment_intent,
        receiptUrl: session.receipt_url || null, // Not always present on session
        rawData: session
      };
    }

    return { eventType: event.type, status: 'ignored' };
  }

  async refundPayment(transactionId, amount) {
    const refund = await this.stripe.refunds.create({
      payment_intent: transactionId,
      amount: Math.round(amount * 100)
    });
    return { status: 'refunded', transactionId: refund.id };
  }
}
