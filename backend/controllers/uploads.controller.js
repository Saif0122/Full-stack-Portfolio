export const uploadFile = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, url: '' });
  } catch (error) {
    next(error);
  }
};
