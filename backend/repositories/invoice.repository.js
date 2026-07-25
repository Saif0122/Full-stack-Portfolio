import Invoice from '../models/invoice.model.js';

export class InvoiceRepository {
  async findAll(query = {}) {
    return await Invoice.find(query).populate('order user');
  }

  async findById(id) {
    return await Invoice.findById(id).populate('order user');
  }

  async findByNumber(invoiceNumber) {
    return await Invoice.findOne({ invoiceNumber }).populate('order user');
  }

  async create(data) {
    return await Invoice.create(data);
  }

  async update(id, data) {
    return await Invoice.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    return await Invoice.findByIdAndDelete(id);
  }
}
