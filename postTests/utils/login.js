import http from 'k6/http';
import { check } from 'k6';

export function loginUser(userData) {
  const loginData = {
    username: `Tester${userData.userId}`,
    password: 'pass',
  };
  const loginUrl = 'http://localhost:8000/auth/token/login/';
  const loginResponse = http.post(loginUrl, loginData);
  check(loginResponse, {
    'User logged in successfully': (res) => res.status === 200,
  });

  console.log(`Login status for user ${userData.userId}: ${loginResponse.status}`);
  console.log(`Login URL for user ${userData.userId}: ${loginUrl}`);
  console.log(`Login response body for user ${userData.userId}: ${loginResponse.body}`);

  // You can perform additional actions here, such as making authenticated requests
}
