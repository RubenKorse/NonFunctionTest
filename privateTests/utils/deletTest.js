import http from 'k6/http';
import { check, group, sleep } from 'k6';

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

    group('fetching crocs', () => {
        const payload = {
            name: `Name ${randomString(10)}`,
            sex: 'F',
            date_of_birth: '2023-05-11',
        };

        // Create a new crocodile
        const res = http.post(URL, payload, requestConfigWithTag({ name: 'Create' }));

        if (check(res, { 'Croc created correctly': (r) => r.status === 201 })) {
            URL = `${URL}${res.json('id')}/`;
        } else {
            console.log(`Unable to create a Croc ${res.status} ${res.body}`);
            return;
        }

        // Fetch crocodiles
        const crocs = http.del(URL,res.id, requestConfigWithTag({ name: 'get' }));

        check(crocs, {
            'reactietijd is minder dan 200 ms': (r) => r.timings.duration < 200,
        })

        if (check(crocs, { 'Crocodiles retrieved correctly': (r) => r.status === 204 })) {
            // Output crocodile ID and name
            console.log(`succsesfully deleted a croc`);
        } else {
            console.log(`Unable to deleted a croc: ${crocs.status} ${crocs.body}`);
            return;
        }
    });
    sleep(1);
}