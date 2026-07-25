export const getLicenses = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, data: [] });
  } catch (error) {
    next(error);
  }
};

export const validateLicense = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, valid: true });
  } catch (error) {
    next(error);
  }
};
