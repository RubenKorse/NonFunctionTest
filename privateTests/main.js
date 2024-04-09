import { setup, test } from './utils/testUtils.js';

export const options = {
    vus: 10,
    iterations: 100,
};

export default function () {
    const authToken = setup(); // Perform setup operations
    test(authToken); // Run the test with the obtained authentication token
}
