import { get, set, remove } from '../assets/js/token';

const logout = async ({ store, redirect, route, res }) => {
  if (store.state.user) await store.dispatch('LOGOUT');
  remove(res);
  // todo: remember route
  if (route.name !== 'login') return redirect('/auth/');
  return null;
};

export default function ({ $axios, store, redirect, route, req, res }) {
  $axios.interceptors.response.use(null, async (error) => {
    if (error.error) error = error.error;
    if (error.response.data && error.response.data.error) error.response.data = error.response.data.error.message;
    if (error.response
        && (error.response.data.indexOf('NOT_AUTHORIZED:') !== -1
        || error.response.data.indexOf('E_INVALID_JWT_REFRESH_TOKEN') !== -1)) {
      return logout({ store, redirect, route, res });
    }

    if (error.config && error.response && error.response.status === 401) {
      try {
        const tokenCookie = JSON.parse(get(req));
        const { token } = await $axios.$post('/auth/refresh', { refresh_token: tokenCookie.refreshToken });
        set($axios, { ...tokenCookie, token });
        error.config.headers.Authorization = `Bearer ${token}`;
        return $axios.request(error.config);
      }
      catch (e) {
        return logout({ store, redirect, route, res });
      }
    }

    if (error.config && error.response && error.response.status === 403 && store.state.user) {
      return logout({ store, redirect, route, res });
    }

    throw error;
  });
}
