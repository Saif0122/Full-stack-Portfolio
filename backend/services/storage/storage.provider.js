export class StorageProvider {
  /**
   * Upload a file
   * @param {Buffer} fileBuffer 
   * @param {String} fileName 
   */
  async upload(fileBuffer, fileName) {
    throw new Error('Not implemented');
  }

  /**
   * Retrieve a file stream or secure URL
   * @param {String} filePath 
   */
  async getSecureUrl(filePath) {
    throw new Error('Not implemented');
  }

  /**
   * Get a readable stream for a file
   * @param {String} filePath 
   */
  async getFileStream(filePath) {
    throw new Error('Not implemented');
  }
}
