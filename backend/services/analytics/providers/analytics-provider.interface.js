export class AnalyticsProviderInterface {
  constructor(config) {
    this.config = config;
  }

  /**
   * Initializes connection with the provider using stored credentials
   */
  async connect(credentials) {
    throw new Error('Method not implemented: connect');
  }

  /**
   * Disconnects the provider
   */
  async disconnect() {
    throw new Error('Method not implemented: disconnect');
  }

  /**
   * Tests the active connection
   * @returns {boolean} true if connection is valid
   */
  async testConnection() {
    throw new Error('Method not implemented: testConnection');
  }

  /**
   * Synchronizes metrics for a given date range
   * @param {Date} startDate 
   * @param {Date} endDate 
   * @returns {Array} Array of snapshot data
   */
  async syncMetrics(startDate, endDate) {
    throw new Error('Method not implemented: syncMetrics');
  }

  /**
   * Returns current API quota status
   */
  async getQuotaStatus() {
    throw new Error('Method not implemented: getQuotaStatus');
  }
}
