import { registerUser } from './utils/register.js';
import { loginUser } from './utils/login.js';

export let options = {
  vus: 5,
  duration: '10s',
};

export const setup = () => {
  const registeredUsers = [];

  for (let i = 1; i <= options.vus; i++) {
    const uniqueId = i; // Generate a unique ID dynamically for each VU

    const userData = registerUser(uniqueId);
    registeredUsers.push(userData);
  }

  return registeredUsers;
};

export default function (data) {
  // Use the registered user data from the setup
  const userToLogin = data[Math.floor(Math.random() * data.length)];
  loginUser(userToLogin);
}
