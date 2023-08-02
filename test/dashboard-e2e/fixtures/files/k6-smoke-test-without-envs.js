import http from 'k6/http';

// eslint-disable-next-line func-names
export default function () {
  http.get('https://testkube.io/');
}
