import Payment from '../models/payment.model.js';

export class PaymentRepository {
  async findAll(query = {}) {
    return await Payment.find(query).populate('order user');
  }

  async findById(id) {
    return await Payment.findById(id);
  }

  async findByTransactionId(transactionId) {
    return await Payment.findOne({ transactionId });
  }

  async create(data) {
    return await Payment.create(data);
  }

  async update(id, data) {
    return await Payment.findByIdAndUpdate(id, data, { new: true });
  }
}
