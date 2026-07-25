import { MediaRepository } from '../repositories/media.repository.js';

const mediaRepo = new MediaRepository();

export class MediaService {
  async getAllMedia() {
    return await mediaRepo.findAll();
  }

  async getMediaById(id) {
    return await mediaRepo.findById(id);
  }

  async uploadMedia(data) {
    // Note: Actual file handling would happen via a storage service
    return await mediaRepo.create(data);
  }

  async updateMedia(id, data) {
    return await mediaRepo.update(id, data);
  }

  async deleteMedia(id) {
    return await mediaRepo.delete(id);
  }
}
