import { InvoiceRepository } from '../repositories/invoice.repository.js';

const invoiceRepo = new InvoiceRepository();

export class InvoiceService {
  async getUserInvoices(userId) {
    return await invoiceRepo.findAll({ user: userId });
  }

  async getInvoiceByNumber(invoiceNumber) {
    return await invoiceRepo.findByNumber(invoiceNumber);
  }

  async generateInvoice(orderData) {
    const data = {
      order: orderData._id,
      user: orderData.user,
      invoiceNumber: `INV-${Date.now()}`,
      amount: orderData.total,
      billingDetails: orderData.billingDetails || {}
    };
    return await invoiceRepo.create(data);
  }
}
