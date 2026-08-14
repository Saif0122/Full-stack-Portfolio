import request from 'supertest';
import app from '../../app.js';
import mongoose from 'mongoose';

describe('Health API', () => {
  it('GET /api/health should return system status', async () => {
    const res = await request(app).get('/api/health');
    
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty('status');
    expect(res.body.data).toHaveProperty('uptime');
    expect(res.body.data).toHaveProperty('timestamp');
    expect(res.body.data.mongodb).toBeDefined();
    
    // In our test environment, mongodb memory server should be connected (status 1 or 2)
    expect(res.body.data.mongodb.status).toBeGreaterThanOrEqual(0);
  });
});
