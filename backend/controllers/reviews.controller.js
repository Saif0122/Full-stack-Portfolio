import Review from '../models/review.model.js';
import Product from '../models/product.model.js';

export const getReviews = async (req, res, next) => {
  try {
    const { productId } = req.query;
    const filter = { status: 'approved' };
    if (productId) filter.product = productId;
    
    const reviews = await Review.find(filter).populate('user', 'name avatarUrl').sort('-createdAt');
    res.status(200).json({ success: true, data: reviews });
  } catch (error) {
    next(error);
  }
};

export const createReview = async (req, res, next) => {
  try {
    const { product, rating, comment } = req.body;

    // Check if user already reviewed
    const existingReview = await Review.findOne({ user: req.user._id, product });
    if (existingReview) {
      return res.status(400).json({ success: false, message: 'You have already reviewed this product' });
    }

    const review = await Review.create({
      user: req.user._id,
      product,
      rating,
      comment,
      status: 'approved' // Auto-approve for MVP
    });

    // Update product rating
    const reviews = await Review.find({ product, status: 'approved' });
    const numReviews = reviews.length;
    const avgRating = reviews.reduce((acc, item) => item.rating + acc, 0) / numReviews;
    
    await Product.findByIdAndUpdate(product, {
      rating: avgRating,
      reviewCount: numReviews
    });

    res.status(201).json({ success: true, data: review });
  } catch (error) {
    next(error);
  }
};
