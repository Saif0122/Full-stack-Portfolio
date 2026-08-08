export class EmailProvider {
  /**
   * Send an email
   * @param {Object} options - Email options
   * @param {String} options.to - Recipient email
   * @param {String} options.subject - Email subject
   * @param {String} options.html - HTML content
   */
  async sendEmail(options) {
    throw new Error('Not implemented');
  }

  async sendOrderConfirmation(order, user) {
    throw new Error('Not implemented');
  }

  async sendLicenseDelivery(licenses, user) {
    throw new Error('Not implemented');
  }
}
