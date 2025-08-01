import { APIResponse, expect, test } from '@playwright/test'

import { StatusCodes } from 'http-status-codes'

test('get order with correct id should receive code 200', async ({ request }) => {
  // Build and send a GET request to the server
  const response = await request.get('https://backend.tallinn-learning.ee/test-orders/1')
  // Log the response status, body and headers
  console.log('response body:', await response.json())
  console.log('response headers:', response.headers())
  // Check if the response status is 200
  expect(response.status()).toBe(200)
})

test('post order with correct data should receive code 201', async ({ request }) => {
  // prepare request body
  const requestBody = {
    status: 'OPEN',
    courierId: 0,
    customerName: 'string',
    customerPhone: 'string',
    comment: 'string',
    id: 0,
  }
  // Send a POST request to the server
  const response = await request.post('https://backend.tallinn-learning.ee/test-orders', {
    data: requestBody,
  })
  // Log the response status and body
  console.log('response status:', response.status())
  console.log('response body:', await response.json())
  expect(response.status()).toBe(StatusCodes.OK)
})

test('get order with orderId 0 should receive code 400', async ({ request }) => {
  // Build and send a GET request to the server
  const response = await request.get('https://backend.tallinn-learning.ee/test-orders/0')
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('get order with orderId 11 should receive code 400', async ({ request }) => {
  // Build and send a GET request to the server
  const response = await request.get('https://backend.tallinn-learning.ee/test-orders/11')
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('get order with orderId = Null should receive code 400', async ({ request }) => {
  // Build and send a GET request to the server
  const response = await request.get('https://backend.tallinn-learning.ee/test-orders/')
  expect(response.status()).toBe(StatusCodes.INTERNAL_SERVER_ERROR)
})

test('get order with orderId = test should receive code 400', async ({ request }) => {
  // Build and send a GET request to the server
  const response = await request.get('https://backend.tallinn-learning.ee/test-orders/test')
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('post order with correct data should receive code 415', async ({ request }) => {
  // prepare request body

  // Send a POST request to the server
  const response = await request.post('https://backend.tallinn-learning.ee/test-orders', {
    data: 'test',
  })
  // Log the response status and body
  console.log('response status:', response.status())
  console.log('response body:', await response.json())
  expect(response.status()).toBe(StatusCodes.UNSUPPORTED_MEDIA_TYPE)
})

//  PUT endpoint

test.describe('PUT endpoint', () => {
  test('Change order with id 1 should return 200', async ({ request }) => {
    const requestBody = {
      status: 'OPEN',
      courierId: 0,
      customerName: 'string',
      customerPhone: 'string',
      comment: 'string',
      id: 0,
    };

    const requestHeaders = {
      api_key: '1234567890123456',
    };

    const response: APIResponse = await request.put(
      'https://backend.tallinn-learning.ee/test-orders/3',
      {
        data: requestBody,
        headers: requestHeaders,
      }
    );

    expect(response.status()).toBe(StatusCodes.OK);
  });
  test('Change order with id 6 should return 200', async ({ request }) => {
    const requestBody = {
      status: 'OPEN',
      courierId: 0,
      customerName: 'string',
      customerPhone: 'string',
      comment: 'string',
      id: 0,
    };

    const requestHeaders = {
      api_key: '1234567890123456',
    };

    const response: APIResponse = await request.put(
      'https://backend.tallinn-learning.ee/test-orders/6',
      {
        data: requestBody,
        headers: requestHeaders,
      }
    );

    expect(response.status()).toBe(StatusCodes.OK);
  });
  test('Change order with id 10 should return 200', async ({ request }) => {
    const requestBody = {
      status: 'OPEN',
      courierId: 0,
      customerName: 'string',
      customerPhone: 'string',
      comment: 'string',
      id: 0,
    };

    const requestHeaders = {
      api_key: '1234567890123456',
    };

    const response: APIResponse = await request.put(
      'https://backend.tallinn-learning.ee/test-orders/10',
      {
        data: requestBody,
        headers: requestHeaders,
      }
    );

    expect(response.status()).toBe(StatusCodes.OK);
  });
  test('Change order with id 0 should return 400', async ({ request }) => {
    const requestBody = {
      status: 'OPEN',
      courierId: 0,
      customerName: 'string',
      customerPhone: 'string',
      comment: 'string',
      id: 0,
    };

    const requestHeaders = {
      api_key: '1234567890123456',
    };

    const response: APIResponse = await request.put(
      'https://backend.tallinn-learning.ee/test-orders/0',
      {
        data: requestBody,
        headers: requestHeaders,
      }
    );

    expect(response.status()).toBe(StatusCodes.BAD_REQUEST);
  });
  test('Change order with id 15 should return 400', async ({ request }) => {
    const requestBody = {
      status: 'OPEN',
      courierId: 0,
      customerName: 'string',
      customerPhone: 'string',
      comment: 'string',
      id: 0,
    };

    const requestHeaders = {
      api_key: '1234567890123456',
    };

    const response: APIResponse = await request.put(
      'https://backend.tallinn-learning.ee/test-orders/15',
      {
        data: requestBody,
        headers: requestHeaders,
      }
    );

    expect(response.status()).toBe(StatusCodes.BAD_REQUEST);
  });
  test('Change order with id null should return 405', async ({ request }) => {
    const requestBody = {
      status: 'OPEN',
      courierId: 0,
      customerName: 'string',
      customerPhone: 'string',
      comment: 'string',
      id: 0,
    };

    const requestHeaders = {
      api_key: '1234567890123456',
    };

    const response: APIResponse = await request.put(
      'https://backend.tallinn-learning.ee/test-orders/',
      {
        data: requestBody,
        headers: requestHeaders,
      }
    );

    expect(response.status()).toBe(StatusCodes.METHOD_NOT_ALLOWED);
  });
  test('Change order with id TEST should return 400', async ({ request }) => {
    const requestBody = {
      status: 'OPEN',
      courierId: 0,
      customerName: 'string',
      customerPhone: 'string',
      comment: 'string',
      id: 0,
    };

    const requestHeaders = {
      api_key: '1234567890123456',
    };

    const response: APIResponse = await request.put(
      'https://backend.tallinn-learning.ee/test-orders/test',
      {
        data: requestBody,
        headers: requestHeaders,
      }
    );

    expect(response.status()).toBe(StatusCodes.BAD_REQUEST);
  });
  test('Change order with incorrect api-key should return 401', async ({ request }) => {
    const requestBody = {
      status: 'OPEN',
      courierId: 0,
      customerName: 'string',
      customerPhone: 'string',
      comment: 'string',
      id: 0,
    }
    const requestHeaders: { api_key: string } = { api_key: '1442296728' }
    const response: APIResponse = await request.put(
      'https://backend.tallinn-learning.ee/test-orders/1',
      {
        data: requestBody,
        headers: requestHeaders,
      },
    )
    expect(response.status()).toBe(StatusCodes.UNAUTHORIZED)
  })
});
 //// DELETE endpoint
test.describe('Delete endpoint', () => {
  test('Delete order with id 3 should return 204', async ({ request }) => {
    const requestHeaders: { api_key: string } = { api_key: '1234567890123456' }
    const response: APIResponse = await request.delete(
      'https://backend.tallinn-learning.ee/test-orders/3',
      {
        headers: requestHeaders,
      },
    )
    expect(response.status()).toBe(StatusCodes.NO_CONTENT)
  })
  test('Delete order with id 6 should return 204', async ({ request }) => {
    const requestHeaders: { api_key: string } = { api_key: '1234567890123456' }
    const response: APIResponse = await request.delete(
      'https://backend.tallinn-learning.ee/test-orders/6',
      {
        headers: requestHeaders,
      },
    )
    expect(response.status()).toBe(StatusCodes.NO_CONTENT)
  })
  test('Delete order with id 5 should return 204', async ({ request }) => {
    const requestHeaders: { api_key: string } = { api_key: '1234567890123456' }
    const response: APIResponse = await request.delete(
      'https://backend.tallinn-learning.ee/test-orders/5',
      {
        headers: requestHeaders,
      },
    )
    expect(response.status()).toBe(StatusCodes.NO_CONTENT)
  })
  test('Delete order with id 0 should return 400', async ({ request }) => {
    const requestHeaders: { api_key: string } = { api_key: '1234567890123456' }
    const response: APIResponse = await request.delete(
      'https://backend.tallinn-learning.ee/test-orders/0',
      {
        headers: requestHeaders,
      },
    )
    expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
  })
  test('Delete order with id 15 should return 400', async ({ request }) => {
    const requestHeaders: { api_key: string } = { api_key: '1234567890123456' }
    const response: APIResponse = await request.delete(
      'https://backend.tallinn-learning.ee/test-orders/15',
      {
        headers: requestHeaders,
      },
    )
    expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
  })
  test('Delete order with id null should return 405', async ({ request }) => {
    const requestHeaders: { api_key: string } = { api_key: '1234567890123456' }
    const response: APIResponse = await request.delete(
      'https://backend.tallinn-learning.ee/test-orders/',
      {
        headers: requestHeaders,
      },
    )
    expect(response.status()).toBe(StatusCodes.METHOD_NOT_ALLOWED)
  })
  test('Delete order with id TEST should return 400', async ({ request }) => {
    const requestHeaders: { api_key: string } = { api_key: '1234567890123456' }
    const response: APIResponse = await request.delete(
      'https://backend.tallinn-learning.ee/test-orders/test',
      {
        headers: requestHeaders,
      },
    )
    expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
  })
  test('Delete order with invalid API_key should return 401', async ({ request }) => {
    const requestHeaders: { api_key: string } = { api_key: '123456789012345' }
    const response: APIResponse = await request.delete(
      'https://backend.tallinn-learning.ee/test-orders/1',
      {
        headers: requestHeaders,
      },
    )
    expect(response.status()).toBe(StatusCodes.UNAUTHORIZED)
  })
});

//Get endpoint
test.describe('GET endpoint', () => {
  test('Get order with correct query should return 200', async ({ request }) => {
    const response = await request.get(
      'https://backend.tallinn-learning.ee/test-orders?username=test&password=test144',
    )
    expect(response.status()).toBe(StatusCodes.OK)
  })
  test('Get order with incorrect query username should return 500', async ({ request }) => {
    const response = await request.get(
      'https://backend.tallinn-learning.ee/test-orders?username=&password=test144',
    )
    expect(response.status()).toBe(StatusCodes.INTERNAL_SERVER_ERROR)
  })
  test('Get order with incorrect query password return 500', async ({ request }) => {
    const response = await request.get(
      'https://backend.tallinn-learning.ee/test-orders?username=test&password=',
    )
    expect(response.status()).toBe(StatusCodes.INTERNAL_SERVER_ERROR)
  })
});