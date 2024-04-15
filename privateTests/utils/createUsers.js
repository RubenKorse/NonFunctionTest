import http from 'k6/http';
import { check} from 'k6';

// Create a random string of given length
export function randomString(length, charset = '') {
    if (!charset) charset = 'abcdefghijklmnopqrstuvwxyz';
    let res = '';
    while (length--) res += charset[(Math.random() * charset.length) | 0];
    return res;
}
let baseURL = 'http://localhost:8000'

// Register a new user and retrieve authentication token for subsequent API requests
export function createUsers(numUsers) {

    const authTokens = [];
    for (let i = 1; i <= numUsers; i++) {
        const USERNAME = `${randomString(10)}@example.com`;
        const PASSWORD = 'superCroc2019';

        const registerRes = http.post(`${baseURL}/user/register/`, {
            first_name: 'Crocodile',
            last_name: 'Owner',
            username: USERNAME,
            password: PASSWORD,
        });

        check(registerRes, { 'created user': (r) => r.status === 201 });

        const loginRes = http.post(`${baseURL}/auth/token/login/`, {
            username: USERNAME,
            password: PASSWORD,
        });

        const authToken = loginRes.json('access');
        check(authToken, { 'logged in successfully': () => authToken !== '' });

        authTokens.push(authToken);

        console.log(`register status:${registerRes.status}`);
        console.log(`login status:${loginRes.status}`);
    }

    return authTokens;
}