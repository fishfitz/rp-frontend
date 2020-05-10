import clientCookie from 'js-cookie';
import serverCookie from 'cookie';

export function get(req) {
  if (req) return serverCookie.parse(req.headers.cookie).token;
  return clientCookie.get('token');
}

export async function refresh(axios, res, cookies) {
  const { refreshToken } = JSON.parse(cookies.token);
  const { token } = await axios.$post('/auth/refresh', { refresh_token: refreshToken });
  res.setHeader('Set-Cookie', [
    `token=${JSON.stringify({ token, refreshToken })}; Path=/; Expires=${new Date().getTime() + 315360000}`
  ]);
  axios.setToken(token, 'Bearer');
}

export function set(axios, { token, type, refreshToken }, res) {
  axios.setToken(token, 'Bearer');
  if (res && !res.headersSent) {
    res.setHeader('Set-Cookie', [
      `token=${JSON.stringify({ token, refreshToken })}; Path=/; Expires=${new Date().getTime() + 315360000}`
    ]);
  }
  else if (!res) clientCookie.set('token', { type, token, refreshToken }, { expires: 365, path: '/' });
}

export function touch(axios) {
  const cookie = clientCookie.getJSON('token');
  if (cookie) axios.setToken(cookie.token, 'Bearer');
}

export function remove(res) {
  if (res && !res.headersSent) res.setHeader('Set-Cookie', ['token=; Path=/;']);
  else if (!res) clientCookie.remove('token');
}
