const request = require('supertest');
const initializeApp = require('../../core/app');
const { SUCCESS_MESSAGE } = require('../../utils/messages');

const app = initializeApp()

describe("fetch customers", () => {
  describe("given customers exists", () => {
    it ('should return statuc 200 and the customer data', async () => {
      const { statusCode, body } = await request(app).get('/api/v1/customers')

      expect(statusCode).toEqual(200)
      expect(body.message).toEqual(SUCCESS_MESSAGE.FETCH_CUSTOMER)
      expect(body.data.length).toBeGreaterThan(0)
    })
  })
})