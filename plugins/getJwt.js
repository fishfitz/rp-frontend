import { refresh, touch, remove } from '../assets/js/token';

export default async ({ app, redirect, req, res }) => {
  if (req && req.cookies && req.cookies.token) {
    try {
      await refresh(app.$axios, res, req.cookies);
    }
    catch (e) {
      remove(res);
      redirect('/login');
    }
  }
  else touch(app.$axios);
};
