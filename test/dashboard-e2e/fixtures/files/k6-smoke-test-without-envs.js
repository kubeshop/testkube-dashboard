import http from 'k6/http';

export default function () {
  http.get('https://testkube.io/');
}
