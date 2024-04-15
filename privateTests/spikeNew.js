import { createUsers, test } from './utils/newTest.js';

export const options = {
    stages: [
        { duration: '10s', target: 10 }, 
        { duration: '1m', target: 10 },  
        { duration: '10s', target: 100 }, 
        { duration: '3m', target: 100 },  
        { duration: '10s', target: 10 },  
        { duration: '2m', target: 10 }, 
    ],
    setupTimeout: '100s'
};

export const setup = () => {
    const numUsers = 100;
    const authTokens = createUsers(numUsers);
    return authTokens;
}

export default function (authTokens) {
    authTokens.forEach((authToken) => {
        test(authToken); // Run the test with each obtained authentication token
    });
}
