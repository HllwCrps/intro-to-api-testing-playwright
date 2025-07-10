import { expect, test } from '@playwright/test'
import { StatusCodes } from 'http-status-codes'
import { LoginDto } from './dto/login-dto'
import { OrderDto } from './dto/order-dto'

const serviceURL = 'https://backend.tallinn-learning.ee/'
const loginPath = 'login/student'
const orderPath = 'orders'

test.describe('Tallinn delivery API tests', () => {
  test('login with correct data and verify auth token', async ({ request }) => {
    const requestBody = LoginDto.createLoginWithCorrectData()
    console.log('requestBody:', requestBody)
    const response = await request.post(`${serviceURL}${loginPath}`, {
      data: requestBody,
    })
    expect(response.status()).toBe(StatusCodes.OK)
    const responseBody = await response.text()
    const jwtRegex = /^eyJhb[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/

    console.log('response code:', response.status())
    console.log('response body:', responseBody)
    expect(jwtRegex.test(responseBody)).toBeTruthy()
  })

  test('login with incorrect data and verify response code 401', async ({ request }) => {
    const requestBody = LoginDto.createLoginWithIncorrectData()
    console.log('requestBody:', requestBody)
    const response = await request.post(`${serviceURL}${loginPath}`, {
      data: requestBody,
    })
    const responseBody = await response.text()

    console.log('response code:', response.status())
    console.log('response body:', responseBody)
    expect(response.status()).toBe(StatusCodes.UNAUTHORIZED)
    expect(responseBody).toBe('')
  })

  test('login and create order', async ({ request }) => {
    const requestBody = LoginDto.createLoginWithCorrectData()
    const response = await request.post(`${serviceURL}${loginPath}`, {
      data: requestBody,
    })
    const jwt = await response.text()
    const orderResponse = await request.post(`${serviceURL}${orderPath}`, {
      data: OrderDto.createOrderWithoutId(),
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })

    const orderResponseBody = await orderResponse.json()
    console.log('orderResponse status:', orderResponse.status())
    console.log('orderResponse:', orderResponseBody)
    expect.soft(orderResponse.status()).toBe(StatusCodes.OK)
    expect.soft(orderResponseBody.status).toBe('OPEN')
    expect.soft(orderResponseBody.id).toBeDefined()
  })
  //TEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEST
  test('login with correct credentials returns valid JWT token', async ({ request }) => {
    const requestBody = LoginDto.createLoginWithCorrectData()

    const response = await request.post(`${serviceURL}${loginPath}`, {
      data: requestBody,
    })

    const jwt = await response.text()

    console.log('Login response code:', response.status())
    console.log('JWT:', jwt)

    expect(response.status()).toBe(StatusCodes.OK)

    const jwtPattern = /^eyJhb[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/
    expect(jwt).toMatch(jwtPattern)
  })

  test('login with incorrect HTTP method (GET instead of POST)', async ({ request }) => {
    const response = await request.get(`${serviceURL}${loginPath}`)
    console.log('Incorrect method response code:', response.status())
    expect(response.status()).toBe(StatusCodes.METHOD_NOT_ALLOWED)
  })

  test('login with malformed body (missing fields)', async ({ request }) => {
    const malformedBody = { username: 'wrongField' }

    const response = await request.post(`${serviceURL}${loginPath}`, {
      data: malformedBody,
    })

    const responseText = await response.text()
    console.log('Malformed body response code:', response.status())
    console.log('Malformed body response:', responseText)

    expect(response.status()).toBeGreaterThanOrEqual(400)
    expect(response.status()).toBeLessThan(500)
  })
})
