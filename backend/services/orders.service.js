import { OrderRepository } from '../repositories/order.repository.js';

export class OrdersService {
  constructor() {
    this.orderRepository = new OrderRepository();
  }

  async getAllOrders(query = {}) {
    return await this.orderRepository.findAll(query);
  }

  async getOrderById(id) {
    return await this.orderRepository.findById(id);
  }

  async createOrder(data) {
    // Basic validation / logic placeholder
    return await this.orderRepository.create(data);
  }
}
