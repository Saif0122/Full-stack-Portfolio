import { PaymentProvider } from './payment.provider.js';

export class LemonSqueezyProvider extends PaymentProvider {
  constructor() {
    super();
    // Initialize Lemon Squeezy SDK
  }

  async createPaymentSession(orderData) {
    return {
      sessionId: `ls_${Date.now()}`,
      provider: 'lemon_squeezy',
      url: 'https://store.lemonsqueezy.com/checkout/mock',
    };
  }

  async handleWebhook(req) {
    return {
      eventType: 'order_created',
      orderId: req.body?.meta?.custom_data?.orderId || 'mock_order_id',
      status: 'succeeded',
      transactionId: `ls_tx_${Date.now()}`,
      rawData: req.body,
    };
  }

  async refundPayment(transactionId, amount) {
    return { status: 'refunded', transactionId };
  }
}
