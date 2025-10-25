import { QueryClient } from '@tanstack/react-query';

let queryClient: QueryClient | null = null;

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5 minutes
        refetchOnWindowFocus: false,
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
