import http from 'k6/http';
import { check } from 'k6';
import { Rate } from 'k6/metrics';


export const errorRate = new Rate('errors');

export const options = {
  stages: [
    { duration: '15s', target: 100 },
    { duration: '30s', target: 100 },
    { duration: '15s', target: 250 },
    { duration: '30s', target: 250 },
    { duration: '15s', target: 500 },
    { duration: '30s', target: 500 },
    { duration: '15s', target: 1000 },
    { duration: '30s', target: 1000 },
    { duration: '60s', target: 0 },
  ],
};




export default function () {
  let id = Math.floor(Math.random() * 99999)
  const url1 = `http://localhost:3001/products/${id}/styles`;
  const url2 =  `http://localhost:3001/products/${id}`
  const url3 =  `http://localhost:3001/products`
  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  check(http.get(url1, params), {
    'status is 200': (r) => r.status == 200,
  }) || errorRate.add(1);
  check(http.get(url2, params), {
    'status is 200': (r) => r.status == 200,
  }) || errorRate.add(1);
  check(http.get(url3, params), {
    'status is 200': (r) => r.status == 200,
  }) || errorRate.add(1);
}

