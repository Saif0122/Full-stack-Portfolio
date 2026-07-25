import { SettingRepository } from '../repositories/setting.repository.js';

const settingRepo = new SettingRepository();

export class SettingService {
  async getAllSettings() {
    return await settingRepo.findAll();
  }

  async getSetting(key) {
    return await settingRepo.findByKey(key);
  }

  async createSetting(data) {
    return await settingRepo.create(data);
  }

  async updateSetting(key, data) {
    return await settingRepo.update(key, data);
  }

  async deleteSetting(key) {
    return await settingRepo.delete(key);
  }
}
