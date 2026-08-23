export const getCategories = async (req, res, next) => {
  try {
    res.status(501).json({ success: false, message: 'Not Implemented' });
  } catch (error) {
    next(error);
  }
};
