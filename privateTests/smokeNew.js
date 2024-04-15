import { createUsers, test } from './utils/newTest.js';

export const options = {
    vus: 5,
    duration: '10s',
};

export const setup = () => {
    const numUsers = 10;
    const authTokens = createUsers(numUsers);
    return { authTokens };
}

export default function ({ authTokens }) {
    authTokens.forEach((authToken) => {
        test(authToken); // Run the test with each obtained authentication token
    });
}
