export class StorageProvider {
  /**
   * Upload an asset.
   * @param {Buffer} buffer - File buffer
   * @param {Object} metadata - File metadata (filename, mimetype, etc)
   * @param {Object} options - Provider specific options
   * @returns {Promise<Object>} - The uploaded asset details
   */
  async upload(buffer, metadata, options = {}) {
    throw new Error('Method not implemented.');
  }

  /**
   * Delete an asset.
   * @param {String} publicId - The asset ID or filename
   * @returns {Promise<void>}
   */
  async delete(publicId) {
    throw new Error('Method not implemented.');
  }

  /**
   * Generate a URL for the asset.
   * @param {String} publicId - The asset ID or filename
   * @returns {String} - Full URL
   */
  generateUrl(publicId) {
    throw new Error('Method not implemented.');
  }

  /**
   * Generate a set of responsive URLs for the asset.
   * @param {String} publicId - The asset ID or filename
   * @returns {Promise<Array<{width: Number, url: String}>>}
   */
  async generateResponsiveVariants(publicId) {
    throw new Error('Method not implemented.');
  }

  /**
   * Generate an Open Graph Image URL.
   * @param {String} publicId 
   * @returns {Promise<String>}
   */
  async generateOpenGraphImage(publicId) {
    throw new Error('Method not implemented.');
  }
}
