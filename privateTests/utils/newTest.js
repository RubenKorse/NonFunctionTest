import http from 'k6/http';
import { check, group } from 'k6';

// Create a random string of given length
export function randomString(length, charset = '') {
    if (!charset) charset = 'abcdefghijklmnopqrstuvwxyz';
    let res = '';
    while (length--) res += charset[(Math.random() * charset.length) | 0];
    return res;
}

const baseURL = 'http://localhost:8000';

export function createUsersWithCrocs(numUsers) {
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

    let URL = `${baseURL}/my/crocodiles/`;

    group('Fetch Crocodiles', () => {
        // Fetch crocodiles
        const crocs = http.get(URL, requestConfigWithTag({ name: 'get' }));

        if (check(crocs, { 'Crocodiles retrieved correctly': (r) => r.status === 200 })) {
            // Output crocodile ID and name
            console.log(`Croc id: ${crocs.json('id')} and name: ${crocs.json('name')}`);
        } else {
            console.log(`Unable to retrieve crocodiles: ${crocs.status} ${crocs.body}`);
            return;
        }
    });
}
