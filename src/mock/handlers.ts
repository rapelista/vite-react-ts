import { http, HttpResponse } from 'msw';

import { MOCK_PERSON } from './PERSON';

export const handlers = [
  http.get('/api/users', async ({ request }) => {
    const randomDelay = Math.floor(Math.random() * 500) + 200;

    const url = new URL(request.url);
    const page = url.searchParams.get('page') || '1';
    const limit = url.searchParams.get('limit') || '10';

    await new Promise((resolve) => setTimeout(resolve, randomDelay));

    return HttpResponse.json({
      data: MOCK_PERSON.slice(
        (Number(page) - 1) * Number(limit),
        Number(page) * Number(limit),
      ),
    });
  }),

  http.get('/api/users/:id', async ({ params }) => {
    const userId = Number(params['id']);

    if (isNaN(userId)) {
      return HttpResponse.json(
        {
          data: null,
        },
        {
          status: 400,
        },
      );
    }

    const user = MOCK_PERSON.find((person) => person.id === userId);

    if (user === undefined) {
      return HttpResponse.json(
        {
          data: null,
        },
        {
          status: 404,
        },
      );
    }

    return HttpResponse.json({
      data: user,
    });
  }),
];
