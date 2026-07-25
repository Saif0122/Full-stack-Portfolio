export class PaymentProvider {
  /**
   * Initialize a payment intent/session
   * @param {Object} orderData 
   * @returns {Promise<Object>} The payment session data (e.g. clientSecret, url)
   */
  async createPaymentSession(orderData) {
    throw new Error('Method not implemented.');
  }

  /**
   * Process a webhook event
   * @param {Object} req - The Express request object
   * @returns {Promise<Object>} Normalized event data { eventType, orderId, status, rawData }
   */
  async handleWebhook(req) {
    throw new Error('Method not implemented.');
  }

  /**
   * Refund a payment
   * @param {String} transactionId 
   * @param {Number} amount 
   * @returns {Promise<Object>}
   */
  async refundPayment(transactionId, amount) {
    throw new Error('Method not implemented.');
  }
}
