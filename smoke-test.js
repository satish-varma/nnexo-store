const request = require('supertest');
const express = require('express');
const app = require('./src/app');

// We will mock mongoose to avoid DB connection errors during the smoke test
jest.mock('mongoose', () => {
    const actualMongoose = jest.requireActual('mongoose');
    return {
        ...actualMongoose,
        connect: jest.fn().mockResolvedValue({ connection: { host: 'mock-host' } }),
    };
});

describe('NNEXO Backend Smoke Test', () => {
    it('should respond to the root route', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toContain('Welcome to NNEXO API');
    });

    it('should have auth routes defined', async () => {
        const res = await request(app).post('/api/v1/auth/otp/request').send({ phoneNumber: '1234567890' });
        // It should at least hit the controller (even if it fails later due to missing DB models)
        expect(res.statusCode).not.toEqual(404);
    });
});
