let _apiUrl = process.env.API_URL || 'localhost:8088';

_apiUrl = _apiUrl.replace(/\/+$/, '');

if (!_apiUrl.endsWith('/v1')) {
  _apiUrl += '/v1';
}

if (!/^https?:\/\//.test(_apiUrl)) {
  _apiUrl = 'http://' + _apiUrl;
}

export const apiUrl = _apiUrl;
