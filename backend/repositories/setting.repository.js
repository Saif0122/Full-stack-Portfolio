import Setting from '../models/setting.model.js';

export class SettingRepository {
  async findAll(query = {}) {
    return await Setting.find(query);
  }

  async findByKey(key) {
    return await Setting.findOne({ key });
  }

  async create(data) {
    return await Setting.create(data);
  }

  async update(key, data) {
    return await Setting.findOneAndUpdate({ key }, data, { new: true, upsert: true });
  }

  async delete(key) {
    return await Setting.findOneAndDelete({ key });
  }
}
