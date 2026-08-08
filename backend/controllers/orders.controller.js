export const getOrders = async (req, res, next) => {
  try {
    const { OrderRepository } = await import('../repositories/order.repository.js');
    const orderRepo = new OrderRepository();
    // In production, support pagination and filtering
    const orders = await orderRepo.findAll({});
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    next(error);
  }
};

export const getMyOrders = async (req, res, next) => {
  try {
    const { OrderRepository } = await import('../repositories/order.repository.js');
    const orderRepo = new OrderRepository();
    const orders = await orderRepo.findAll({ user: req.user._id });
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    next(error);
  }
};

export const createOrder = async (req, res, next) => {
  try {
    const { OrderRepository } = await import('../repositories/order.repository.js');
    const orderRepo = new OrderRepository();
    const order = await orderRepo.create({ ...req.body, user: req.user._id });
    res.status(201).json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};
