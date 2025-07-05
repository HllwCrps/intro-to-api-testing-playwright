import { expect, test } from '@playwright/test';

import { StatusCodes } from 'http-status-codes';
import { OrderDto10 } from './dto/order-dto-10h';


[1, 100, 1000, 100000].forEach((incomeValue) => {
  test(`Successful calculation with income = ${incomeValue} returns 200`, async ({ request }) => {
    const order = OrderDto10.calculateRiskScoreWithRandomData();
    order.income = incomeValue;

    const response = await request.post(
      'https://backend.tallinn-learning.ee/api/loan-calc/decision',
      {
        data: order,
      },
    );

    console.log(`Income: ${incomeValue}`);
    const body = await response.json();
    console.log('response body:', await response.json());
    console.log('response headers:', response.headers());
    expect(response.status()).toBe(StatusCodes.OK);
    expect.soft(body.riskScore).toBeGreaterThanOrEqual(0);
    expect
      .soft(['Low Risk', 'Medium Risk', 'High Risk', 'Very High Risk'])
      .toContain(body.riskLevel);
    expect.soft(['positive', 'negative', 'neutral']).toContain(body.riskDecision);
  });
});

test('Unsuccessful calculation of risk with income equal to 0 returns 400', async ({ request }) => {
  const order = OrderDto10.calculateRiskScoreWithRandomData();
  order.income = 0;

  const response = await request.post(
    'https://backend.tallinn-learning.ee/api/loan-calc/decision',
    {
      data: order,
    },
  );

  const status = response.status();
  console.log('response status:', status);
  console.log('response headers:', response.headers());
  const body = await response.text();
  console.log('response body:', body);
  expect.soft(status).toBe(StatusCodes.BAD_REQUEST);
});

test('Unsuccessful calculation of risk with empty income returns 400', async ({ request }) => {
  const order = OrderDto10.calculateRiskScoreWithRandomData();
  order.income = null;

  const response = await request.post(
    'https://backend.tallinn-learning.ee/api/loan-calc/decision',
    {
      data: order,
    },
  );
  const status = response.status();
  console.log('response status:', status);
  console.log('response headers:', response.headers());
  const body = await response.text();
  console.log('response body:', body);
  expect.soft(status).toBe(StatusCodes.BAD_REQUEST);
});

[1, 100, 1000, 100000].forEach((debtValue) => {
  test(`Successful calculation with debt = ${debtValue} returns 200`, async ({ request }) => {
    const order = OrderDto10.calculateRiskScoreWithRandomData();
    order.debt = debtValue;

    const response = await request.post(
      'https://backend.tallinn-learning.ee/api/loan-calc/decision',
      {
        data: order,
      },
    );

    console.log(`Debt: ${debtValue}`);
    const body = await response.json();
    console.log('response body:', await response.json());
    console.log('response headers:', response.headers());
    expect.soft(response.status()).toBe(StatusCodes.OK);
    expect.soft(body.riskScore).toBeGreaterThanOrEqual(0);
    expect
      .soft(['Low Risk', 'Medium Risk', 'High Risk', 'Very High Risk'])
      .toContain(body.riskLevel);
    expect.soft(['positive', 'negative', 'neutral']).toContain(body.riskDecision);
  });
});

test('Unsuccessful calculation of risk with negative debt returns 400', async ({ request }) => {
  const order = OrderDto10.calculateRiskScoreWithRandomData();
  order.debt = -1;

  const response = await request.post(
    'https://backend.tallinn-learning.ee/api/loan-calc/decision',
    {
      data: order,
    },
  );

  console.log(`Debt: ${order.debt}`);
  const status = response.status();
  console.log('response status:', status);
  console.log('response headers:', response.headers());
  const body = await response.text();
  console.log('response body:', body);
  expect.soft(status).toBe(StatusCodes.BAD_REQUEST);
});

[1, 4, 10].forEach((ageValue) => {
  test(`Unsuccessful calculation with age = ${ageValue} returns 200, but negative risk decision`, async ({
                                                                                                           request,
                                                                                                         }) => {
    const order = OrderDto10.calculateRiskScoreWithRandomData();
    order.age = ageValue;

    const response = await request.post(
      'https://backend.tallinn-learning.ee/api/loan-calc/decision',
      {
        data: order,
      },
    );

    console.log(`Age: ${ageValue}`);
    const body = await response.json();
    console.log('response body:', await response.text());
    console.log('response headers:', response.headers());
    expect.soft(response.status()).toBe(StatusCodes.OK);
    expect.soft(typeof body.riskScore).toBe('number');
    expect
      .soft(['Low Risk', 'Medium Risk', 'High Risk', 'Very High Risk'])
      .toContain(body.riskLevel);
    expect.soft(['positive', 'negative', 'neutral']).toContain(body.riskDecision);
  });
});

test(`Unsuccessful calculation with negative age returns 400`, async ({ request }) => {
  const order = OrderDto10.calculateRiskScoreWithRandomData();
  order.age = -1;

  const response = await request.post(
    'https://backend.tallinn-learning.ee/api/loan-calc/decision',
    {
      data: order,
    },
  );

  console.log(`Age: ${order.age}`);
  const status = response.status();
  console.log('response status:', status);
  console.log('response headers:', response.headers());
  const body = await response.text();
  console.log('response body:', body);
  expect.soft(status).toBe(StatusCodes.BAD_REQUEST);
});

test(`Successful calculation of risk with employment status true returns 200 `, async ({
                                                                                         request,
                                                                                       }) => {
  const order = OrderDto10.calculateRiskScoreWithRandomData();
  order.employed = true;

  const response = await request.post(
    'https://backend.tallinn-learning.ee/api/loan-calc/decision',
    {
      data: order,
    },
  );

  console.log(`Employed: ${order.employed}`);
  const body = await response.json();
  console.log('response body:', await response.text());
  console.log('response headers:', response.headers());
  expect.soft(response.status()).toBe(StatusCodes.OK);
  expect.soft(typeof body.riskScore).toBe('number');
  expect.soft(['Low Risk', 'Medium Risk', 'High Risk', 'Very High Risk']).toContain(body.riskLevel);
  expect.soft(['positive', 'negative', 'neutral']).toContain(body.riskDecision);
});