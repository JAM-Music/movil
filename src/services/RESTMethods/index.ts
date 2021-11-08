import AsyncStorage from '@react-native-async-storage/async-storage';
import {backendURL} from '_config/backend';

export const sessionStorageKey = '@Escuela/SessionId';
const _cache: {session?: string} = {};

export async function manageResponse<T>(
  // eslint-disable-next-line no-undef
  res: Response,
): Promise<CustomResponse<T>> {
  let data;
  const contentType = res.headers.get('content-type');
  if (contentType && contentType.indexOf('application/json') !== -1) {
    data = await res.json();
  } else {
    data = await res.text();
  }
  const obj = {data, ok: res.ok, status: res.status};
  if (!res.ok) {
    throw obj;
  }
  return obj;
}

export const formatUrl = (resource = '/') =>
  `${backendURL}${resource.charAt(0) !== '/' ? '/' : ''}${resource}`;

export async function genericRequest<T>(
  method = 'POST',
  resource = '/',
  body: any = undefined,
) {
  const headers: {[key: string]: string} = {
    'Content-Type': 'application/json',
  };
  const sessionId = await getSession();
  if (sessionId) {
    headers.Authorization = `Bearer ${sessionId}`;
  }
  const options: {[key: string]: string | typeof headers} = {
    method,
    headers,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }
  return fetch(formatUrl(resource), options).then(res =>
    manageResponse<T>(res),
  );
}

export async function post<T>(resource = '/', body = {}) {
  return genericRequest<T>('POST', resource, body);
}

export async function patch<T>(resource = '/', body = {}) {
  return genericRequest<T>('PATCH', resource, body);
}

export async function put<T>(resource = '/', body = {}) {
  return genericRequest<T>('PUT', resource, body);
}

export async function del<T>(resource = '/', body = {}) {
  return genericRequest<T>('DELETE', resource, body);
}

export async function get<T>(resource = '/') {
  return genericRequest<T>('GET', resource);
}

export async function saveSession(token = '') {
  await AsyncStorage.setItem(sessionStorageKey, token);
}

export async function delSession() {
  return AsyncStorage.removeItem(sessionStorageKey);
}

export async function getSession() {
  if (_cache.session) {
    return Promise.resolve(_cache.session);
  }
  const token = await AsyncStorage.getItem(sessionStorageKey).catch(() => '');
  if (token) {
    _cache.session = token;
  }
  return token;
}

export type CustomResponse<T> = {
  data: T;
  ok: boolean;
  status: number;
};
