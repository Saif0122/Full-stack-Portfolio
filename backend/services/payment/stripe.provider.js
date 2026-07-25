import { PaymentProvider } from './payment.provider.js';

export class StripeProvider extends PaymentProvider {
  constructor() {
    super();
    // this.stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
  }

  async createPaymentSession(orderData) {
    // Mock Stripe implementation
    return {
      sessionId: `cs_test_${Date.now()}`,
      clientSecret: `pi_test_${Date.now()}_secret`,
      provider: 'stripe',
      url: 'https://checkout.stripe.com/pay/cs_test_mock',
    };
  }

  async handleWebhook(req) {
    // Mock Stripe webhook parsing
    return {
      eventType: 'payment_intent.succeeded',
      orderId: req.body?.data?.object?.metadata?.orderId || 'mock_order_id',
      status: 'succeeded',
      transactionId: `tx_${Date.now()}`,
      rawData: req.body,
    };
  }

  async refundPayment(transactionId, amount) {
    return { status: 'refunded', transactionId };
  }
}
