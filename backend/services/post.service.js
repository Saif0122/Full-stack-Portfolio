import { PostRepository } from '../repositories/post.repository.js';

const postRepo = new PostRepository();

export class PostService {
  async getAllPosts() {
    return await postRepo.findAll();
  }

  async getPostById(id) {
    return await postRepo.findById(id);
  }

  async getPostBySlug(slug) {
    return await postRepo.findBySlug(slug);
  }

  async createPost(data) {
    return await postRepo.create(data);
  }

  async updatePost(id, data) {
    return await postRepo.update(id, data);
  }

  async deletePost(id) {
    return await postRepo.delete(id);
  }
}
