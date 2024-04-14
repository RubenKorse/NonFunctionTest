import { createUsers, test } from './utils/getTest.js';

export const options = {
    vus: 10,
    iterations: 100,
};

export const setup = () => {
    const numUsers = 10;
    const authTokens = createUsers(numUsers);
    return authTokens;
}

export default function (authTokens) {
    authTokens.forEach((authToken) => {
        test(authToken); // Run the test with each obtained authentication token
    });
}
