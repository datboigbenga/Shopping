const request = require('supertest');
const initializeApp = require('../../core/app');
const db = require('../../models')
const { SUCCESS_MESSAGE } = require("../../utils/messages")

const app = initializeApp()

describe("discounts", () => {
  describe('create discounts', () =>{
    describe.skip("given all the details are correct", () =>{
      it('should return status 201 and success message', async () => {
        const discountDetails = {
          "type": "testDiscount",
          "percent": 20
      }

        const { body, statusCode } = await request(app).post('/api/v1/discounts')
          .send(discountDetails)
          .set('Accept', 'application/json')

        expect(statusCode).toEqual(201)
        expect(body.message).toEqual(SUCCESS_MESSAGE.DISCOUNT_CREATED)
      })
    })


    describe("given details are missing", () => {
      it("should return 400 and an error message", async () => {
        const discountDetails = {
          type: "Jon Bellion"
        }

        const { body, statusCode } = await request(app).post('/api/v1/discounts')
          .send(discountDetails)
          .set('Accept', 'application/json')

        
        expect(statusCode).toEqual(400)
        expect(body.message).toEqual(expect.stringContaining('required'))
      })
    })
  })
})