import http from 'k6/http';
import { check, group, sleep } from 'k6';

// Create a random string of given length
export function randomString(length, charset = '') {
    if (!charset) charset = 'abcdefghijklmnopqrstuvwxyz';
    let res = '';
    while (length--) res += charset[(Math.random() * charset.length) | 0];
    return res;
}

const baseURL = 'http://localhost:8000';

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

    group('Create crocs', () => {
        const payload = {
            name: `Name ${randomString(10)}`,
            sex: 'F',
            date_of_birth: '2023-05-11',
        };
        // Fetch crocodiles
        const res = http.post(URL, payload, requestConfigWithTag({ name: 'Create' }));

        // console.log(URL, payload, requestConfigWithTag({ name: 'create'}))

        if (check(res, { 'Croc created correctly': (r) => r.status === 201 })) {
            URL = `${URL}${res.json('id')}/`;
        } else {
            console.log(`Unable to create a Croc ${res.status} ${res.body}`);
            return;
        }
    });

    group('Update crocs', () => {
        const payload = {
            name: `Name ${randomString(10)}`,
            sex: 'F',
            date_of_birth: '2023-05-11',
        };
        // Fetch crocodiles
        const resp = http.put(URL, payload, requestConfigWithTag({ name: 'Update' }));

        // console.log(URL, payload, requestConfigWithTag({ name: 'create'}))
        
        check(resp, {
            'reactietijd is minder dan 200 ms': (r) => r.timings.duration < 200,
        });

        if (check(resp, { 'Croc update correctly': (r) => r.status === 200 })) {
            URL = `${URL}${resp.json('id')}/`;
            console.log(`updated crocs succsesfully status:${resp.status}`)
        } else {
            console.log(`Unable to update a Croc ${resp.status} ${resp.body}`);
            return;
        }
    });

    sleep(1);
}