import axios from 'axios';

const base = axios.create({
  baseURL: import.meta.env.API_URL,
});

export const api = base.create({
  headers: {
    'Content-Type': 'application/json',
  },
});
