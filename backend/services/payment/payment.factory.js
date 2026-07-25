import { StripeProvider } from './stripe.provider.js';
import { PaddleProvider } from './paddle.provider.js';
import { LemonSqueezyProvider } from './lemon-squeezy.provider.js';

export class PaymentFactory {
  /**
   * Get the active payment provider
   * @param {String} providerName - 'stripe', 'paddle', 'lemon_squeezy'
   * @returns {import('./payment.provider.js').PaymentProvider}
   */
  static getProvider(providerName) {
    switch (providerName) {
      case 'stripe':
        return new StripeProvider();
      case 'paddle':
        return new PaddleProvider();
      case 'lemon_squeezy':
        return new LemonSqueezyProvider();
      default:
        // Default to stripe if not specified
        return new StripeProvider();
    }
  }
}
