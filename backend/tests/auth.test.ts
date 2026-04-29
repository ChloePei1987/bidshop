import request from 'supertest';
import app from '../src/index';

describe('Auth API', () => {
  const user = {
    email: `test_${Date.now()}@test.com`,
    password: '123456',
    name: 'test user'
  };

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send(user);

    expect(res.status).toBe(201);
    expect(res.body.token).toBeDefined();
    expect(res.body.user.email).toBe(user.email);
    expect(res.body.user.id).toBeDefined();
    expect(res.body.user.name).toBe(user.name);
  });

  it('should login successfully', async () => {
    await request(app).post('/auth/register').send(user);

    const res = await request(app)
      .post('/auth/login')
      .send({
        email: user.email,
        password: user.password
      });

    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
    expect(res.body.user.email).toBe(user.email);
    expect(res.body.user.id).toBeDefined();
    expect(res.body.user.name).toBe(user.name);
  });

  it('should fail with wrong password', async () => {
    await request(app).post('/auth/register').send(user);

    const res = await request(app)
      .post('/auth/login')
      .send({
        email: user.email,
        password: 'wrongpassword'
      });

    expect(res.status).toBe(401);
    expect(res.body.error).toBe("Invalid email or password");
  });
});