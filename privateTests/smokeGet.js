import { createUsers, test } from './utils/getTest.js';

export const options = {
    vus: 5,
    duration: '30s',
};

export const setup = () => {
    const numUsers = 5;
    const authTokens = createUsers(numUsers);
    return authTokens;
}

export default function (authTokens) {
    authTokens.forEach((authToken) => {
        test(authToken); // Run the test with each obtained authentication token
    });
}
