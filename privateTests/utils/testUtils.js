import http from 'k6/http';
import { check, group } from 'k6';

// Create a random string of given length
export function randomString(length, charset = '') {
    if (!charset) charset = 'abcdefghijklmnopqrstuvwxyz';
    let res = '';
    while (length--) res += charset[(Math.random() * charset.length) | 0];
    return res;
}

// Register a new user and retrieve authentication token for subsequent API requests
export function setup() {
    const USERNAME = `${randomString(10)}@example.com`;
    const PASSWORD = 'superCroc2019';

    const registerRes = http.post('http://localhost:8000/user/register/', {
        first_name: 'Crocodile',
        last_name: 'Owner',
        username: USERNAME,
        password: PASSWORD,
    });

    check(registerRes, { 'created user': (r) => r.status === 201 });

    const loginRes = http.post('http://localhost:8000/auth/token/login/', {
        username: USERNAME,
        password: PASSWORD,
    });

    console.log(`register status:${registerRes.status}`)

    console.log(`login status:${loginRes.status}`)

    const authToken = loginRes.json('access');
    check(authToken, { 'logged in successfully': () => authToken !== '' });

    return authToken;
}

export function test(authToken) {
    // Set the authorization header on the session for the subsequent requests
    const requestConfigWithTag = (tag) => ({
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
        tags: Object.assign(
            {},
            {
                name: 'PrivateCrocs',
            },
            tag
        ),
    });

    let URL = 'http://localhost:8000/my/crocodiles/';

    group('01. Create a new crocodile', () => {
        const payload = {
            name: `Name ${randomString(10)}`,
            sex: 'F',
            date_of_birth: '2023-05-11',
        };

        const res = http.post(URL, payload, requestConfigWithTag({ name: 'Create' }));

        if (check(res, { 'Croc created correctly': (r) => r.status === 201 })) {
            URL = `${URL}${res.json('id')}/`;
        } else {
            console.log(`Unable to create a Croc ${res.status} ${res.body}`);
            return;
        }

        console.log(`Croc id:${res.id} and name:${res.name}`)
    });

    // Add more test groups/functions as needed
}
