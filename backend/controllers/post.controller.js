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
