import request from 'supertest';
import app from '../src/index';

describe('Order Flow', () => {
  let token: string;

  beforeAll(async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({
        email: `test_${Date.now()}@test.com`,
        password: '123456',
        name: 'test user'
      });

    token = res.body.token;
  });

  it('should add item to cart and place order successfully', async () => {
    // Add to cart
    await request(app)
      .post('/cart/items')
      .set('Authorization', `Bearer ${token}`)
      .send({
        productId: 'p-001',
        quantity: 2
      });

    // Place order
    const res = await request(app)
      .post('/orders')
      .set('Authorization', `Bearer ${token}`)
      .send({
        customer: {
          name: 'Test User',
          email: 'test@test.com',
          address: '29 Roberton St',
          city: 'Auckland',
          postcode: '1026'
        }
      });

    expect(res.status).toBe(201);
    expect(res.body.status).toBe('CONFIRMED');
    expect(res.body.items.length).toBeGreaterThan(0);
  });

  it('should reject request without authentication', async () => {
    const res = await request(app)
      .get('/cart');

    expect(res.status).toBe(401);
    expect(res.body.error).toBe("Missing or invalid Authorization header");
  });

  it('should reject request with cart is empty', async () => {
    const res = await request(app)
      .post('/orders')
      .set('Authorization', `Bearer ${token}`)
      .send({
        customer: {
          name: 'Test User',
          email: 'test@test.com',
          address: '1 Queen St',
          city: 'Auckland',
          postcode: '1010'
        }
      });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Cannot place an order with an empty cart");
  });
});