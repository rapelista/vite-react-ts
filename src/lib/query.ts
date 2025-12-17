import { QueryClient } from '@tanstack/react-query';

import { api } from './api';

let queryClient: QueryClient | null = null;

type AppService = 'api';
type AppQueryKey = [AppService, string, object?];
type QueryKey = [AppQueryKey] | [...Array<Readonly<unknown>>];

declare module '@tanstack/react-query' {
  interface Register {
    queryKey: QueryKey;
  }
}

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
        queryFn: async ({ queryKey }) => {
          if (queryKey.length >= 1) {
            const key = queryKey[0];

            if (Array.isArray(key) && key[0] === 'api') {
              const [service, path, params] = key as AppQueryKey;

              switch (service) {
                case 'api': {
                  const result = await api.get(path, { params });

                  return result.data;
                }
              }
            }
          }

          throw new Error('No query function defined for this query key.');
        },
      },
    },
  });
}

export function getQueryClient() {
  if (!queryClient) {
    queryClient = makeQueryClient();
  }

  return queryClient;
}
