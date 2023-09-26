const request = require('supertest');
const initializeApp = require('../../core/app');
const db = require('../../models')
const { SUCCESS_MESSAGE } = require("../../utils/messages")

const app = initializeApp()

describe("customer", () => {
  describe('create customer', () =>{
    describe.skip("given all the details are correct", () =>{
      it('should return status 201 and success message', async () => {
        const customerDetails = {
          fullName: "Jon Bellion",
          email: "bellion@gmail.com",
          userType: "affiliate"
        }

        const { body, statusCode } = await request(app).post('/api/v1/customers')
          .send(customerDetails)
          .set('Accept', 'application/json')

        expect(statusCode).toEqual(201)
        expect(body.message).toEqual(SUCCESS_MESSAGE.USER_CREATED)

      })
    })


    describe("given details are missing", () => {
      it("should return 400 and an error message", async () => {
        const customerDetails = {
          fullName: "Jon Bellion",
        }

        const { body, statusCode } = await request(app).post('/api/v1/customers')
          .send(customerDetails)
          .set('Accept', 'application/json')

        expect(statusCode).toEqual(400)
        expect(body.message).toEqual(expect.stringContaining('required'))
      })
    })
  })
})