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
        const crocs = http.get(URL, requestConfigWithTag({ name: 'get' }));

        check(crocs, {
            'reactietijd is minder dan 200 ms': (r) => r.timings.duration < 200,
        })

        if (check(crocs, { 'Crocodiles retrieved correctly': (r) => r.status === 200 })) {
            // Output crocodile ID and name
            console.log(`Croc id: ${crocs.json('id')} and name: ${crocs.json('name')}`);
        } else {
            console.log(`Unable to retrieve crocodiles: ${crocs.status} ${crocs.body}`);
            return;
        }
    });
    sleep(1);
}
