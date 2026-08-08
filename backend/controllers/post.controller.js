import { PostService } from '../services/post.service.js';
const postService = new PostService();

export const getAllPosts = async (req, res, next) => {
  try {
    const data = await postService.getAllPosts();
    res.status(200).json({ success: true, data });
  } catch (error) { next(error); }
};

export const getPost = async (req, res, next) => {
  try {
    const data = await postService.getPostById(req.params.id);
    if (!data) return res.status(404).json({ success: false, message: 'Post not found' });
    res.status(200).json({ success: true, data });
  } catch (error) { next(error); }
};

export const getPostBySlug = async (req, res, next) => {
  try {
    const data = await postService.getPostBySlug(req.params.slug);
    if (!data) return res.status(404).json({ success: false, message: 'Post not found' });
    res.status(200).json({ success: true, data });
  } catch (error) { next(error); }
};

export const createPost = async (req, res, next) => {
  try {
    const data = await postService.createPost(req.body);
    res.status(201).json({ success: true, data });
  } catch (error) { next(error); }
};

export const updatePost = async (req, res, next) => {
  try {
    const data = await postService.updatePost(req.params.id, req.body);
    res.status(200).json({ success: true, data });
  } catch (error) { next(error); }
};

export const deletePost = async (req, res, next) => {
  try {
    await postService.deletePost(req.params.id);
    res.status(200).json({ success: true, data: {} });
  } catch (error) { next(error); }
};

import Post from '../models/post.model.js';
import { ApiError } from '../utils/ApiError.js';

export const bulkPublish = async (req, res, next) => {
  try {
    const { postIds } = req.body;
    await Post.updateMany({ _id: { $in: postIds } }, { status: 'published' });
    res.status(200).json({ success: true, message: 'Posts published successfully' });
  } catch (error) { next(error); }
};

export const bulkDelete = async (req, res, next) => {
  try {
    const { postIds } = req.body;
    await Post.deleteMany({ _id: { $in: postIds } });
    res.status(200).json({ success: true, message: 'Posts deleted successfully' });
  } catch (error) { next(error); }
};

export const duplicatePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).lean();
    if (!post) throw new ApiError(404, 'Post not found');
    
    delete post._id;
    post.title = `${post.title} (Copy)`;
    post.slug = `${post.slug}-copy-${Date.now()}`;
    post.status = 'draft';
    post.isPinned = false;
    post.views = 0;
    post.likes = [];
    post.bookmarks = [];

    const newPost = await Post.create(post);
    res.status(201).json({ success: true, data: newPost });
  } catch (error) { next(error); }
};

export const togglePin = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) throw new ApiError(404, 'Post not found');
    
    post.isPinned = !post.isPinned;
    await post.save();
    res.status(200).json({ success: true, data: post });
  } catch (error) { next(error); }
};

export const incrementView = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } }, { new: true });
    res.status(200).json({ success: true, views: post.views });
  } catch (error) { next(error); }
};

export const toggleLike = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) throw new ApiError(404, 'Post not found');
    
    const userId = req.user._id;
    const isLiked = post.likes.includes(userId);
    if (isLiked) {
      post.likes.pull(userId);
    } else {
      post.likes.push(userId);
    }
    await post.save();
    res.status(200).json({ success: true, liked: !isLiked });
  } catch (error) { next(error); }
};

export const toggleBookmark = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) throw new ApiError(404, 'Post not found');
    
    const userId = req.user._id;
    const isBookmarked = post.bookmarks.includes(userId);
    if (isBookmarked) {
      post.bookmarks.pull(userId);
    } else {
      post.bookmarks.push(userId);
    }
    await post.save();
    res.status(200).json({ success: true, bookmarked: !isBookmarked });
  } catch (error) { next(error); }
};
