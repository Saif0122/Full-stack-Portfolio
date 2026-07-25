import Post from '../models/post.model.js';

export class PostRepository {
  async findAll(query = {}) {
    return await Post.find(query).populate('categories tags author');
  }

  async findById(id) {
    return await Post.findById(id).populate('categories tags author');
  }

  async findBySlug(slug) {
    return await Post.findOne({ slug }).populate('categories tags author');
  }

  async create(data) {
    return await Post.create(data);
  }

  async update(id, data) {
    return await Post.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    return await Post.findByIdAndDelete(id);
  }
}
