import http from 'k6/http';
import { check } from 'k6';

export function registerUser(uniqueId) {
  const url = 'http://localhost:8000/user/register/';

  const payload = JSON.stringify({
    username: `Tester${uniqueId}`,
    first_name: 'Test',
    last_name: 'User',
    email: `Tester${uniqueId}@gmail.com`,
    password: 'pass',
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  let res = http.post(url, payload, params);

  console.log(`Registration status for user ${uniqueId}: ${res.status}`);
  console.log(`Registration URL for user ${uniqueId}: ${url}`);
  console.log(`Registration response body for user ${uniqueId}: ${res.body}`);

  check(res, {
    'User account created': (res) => res.status === 201,
    'response time 200ms': (res) => res.timings.duration > 200,
  });

  return {
    userId: uniqueId,
    registrationUrl: url,
    registrationStatus: res.status,
    registrationResponseBody: res.body,
  };
}
