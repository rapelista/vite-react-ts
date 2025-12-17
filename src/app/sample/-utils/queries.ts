import { queryOptions, type QueryKey } from '@tanstack/react-query';

type User = {
  id: number;
  name: string;
};

type Response<T> = {
  data: T;
};

type ListResponse<T> = Response<Array<T>>;

type AdditionalOptions<T> = Omit<
  ReturnType<typeof queryOptions<T, Error, T, QueryKey>>,
  'queryKey'
>;

export const sampleQueries = {
  users: {
    list: {
      queryKey: (params?: object) => [['api', 'users', params]] as QueryKey,

      queryOptions: (
        params?: object,
        additional?: AdditionalOptions<ListResponse<User>>,
      ) =>
        queryOptions({
          queryKey: sampleQueries.users.list.queryKey(params),
          ...additional,
        }),
    },

    get: {
      queryKey: (input: string | number) =>
        [['api', `users/${input}`]] as QueryKey,

      queryOptions: (
        input: string | number,
        additional?: AdditionalOptions<Response<User>>,
      ) =>
        queryOptions({
          queryKey: sampleQueries.users.get.queryKey(input),
          ...additional,
        }),
    },
  },
};
