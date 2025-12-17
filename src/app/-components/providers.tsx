import { QueryClientProvider } from '@tanstack/react-query';

import { getQueryClient } from '~/lib/query';

const queryClient = getQueryClient();

export function Providers({ children }: React.PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
