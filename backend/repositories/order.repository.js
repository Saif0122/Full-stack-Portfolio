import Order from '../models/order.model.js';

export class OrderRepository {
  async findAll(query = {}) {
    return await Order.find(query);
  }

  async findById(id) {
    return await Order.findById(id);
  }

  async create(data) {
    return await Order.create(data);
  }

  async updateStatus(id, status) {
    return await Order.findByIdAndUpdate(id, { status }, { new: true });
  }
}
