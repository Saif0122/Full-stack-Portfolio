export const getOrders = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, data: [] });
  } catch (error) {
    next(error);
  }
};

export const createOrder = async (req, res, next) => {
  try {
    res.status(201).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};
