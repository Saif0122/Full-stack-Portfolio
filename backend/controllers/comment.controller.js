import Comment from '../models/comment.model.js';
import Post from '../models/post.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';

// Get comments for a post
export const getPostComments = async (req, res, next) => {
  try {
    const { postId } = req.params;
    
    // Only get top-level comments (parentComment is null)
    const comments = await Comment.find({ post: postId, parentComment: null, isApproved: true })
      .populate('user', 'name email avatar')
      .sort({ createdAt: -1 })
      .lean();
      
    // Fetch replies for each comment (could be optimized with aggregation if depth is deep)
    for (let comment of comments) {
      comment.replies = await Comment.find({ parentComment: comment._id, isApproved: true })
        .populate('user', 'name email avatar')
        .sort({ createdAt: 1 });
    }

    res.status(200).json(new ApiResponse(200, comments, 'Comments retrieved successfully'));
  } catch (error) {
    next(error);
  }
};

// Add a comment
export const addComment = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { content, parentComment } = req.body;
    
    if (!content) {
      throw new ApiError(400, 'Comment content is required');
    }

    const post = await Post.findById(postId);
    if (!post) {
      throw new ApiError(404, 'Post not found');
    }

    const newComment = await Comment.create({
      post: postId,
      user: req.user._id,
      content,
      parentComment: parentComment || null
    });

    await newComment.populate('user', 'name email avatar');

    res.status(201).json(new ApiResponse(201, newComment, 'Comment added successfully'));
  } catch (error) {
    next(error);
  }
};

// Like/Unlike a comment
export const toggleCommentLike = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const comment = await Comment.findById(id);
    if (!comment) {
      throw new ApiError(404, 'Comment not found');
    }

    const isLiked = comment.likes.includes(userId);
    if (isLiked) {
      comment.likes.pull(userId);
    } else {
      comment.likes.push(userId);
    }

    await comment.save();

    res.status(200).json(new ApiResponse(200, { liked: !isLiked }, 'Comment like toggled'));
  } catch (error) {
    next(error);
  }
};

// Report a comment
export const reportComment = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const comment = await Comment.findByIdAndUpdate(
      id,
      { $inc: { reports: 1 } },
      { new: true }
    );

    if (!comment) {
      throw new ApiError(404, 'Comment not found');
    }

    res.status(200).json(new ApiResponse(200, null, 'Comment reported'));
  } catch (error) {
    next(error);
  }
};

// Admin: Get all comments (including unapproved)
export const getAllComments = async (req, res, next) => {
  try {
    const comments = await Comment.find()
      .populate('user', 'name email avatar')
      .populate('post', 'title slug')
      .sort({ createdAt: -1 });
      
    res.status(200).json(new ApiResponse(200, comments, 'All comments retrieved'));
  } catch (error) {
    next(error);
  }
};

// Admin: Moderate comment
export const moderateComment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { isApproved } = req.body;
    
    const comment = await Comment.findByIdAndUpdate(
      id,
      { isApproved },
      { new: true }
    );
    
    if (!comment) {
      throw new ApiError(404, 'Comment not found');
    }

    res.status(200).json(new ApiResponse(200, comment, 'Comment moderated'));
  } catch (error) {
    next(error);
  }
};
