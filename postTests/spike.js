import { registerUser } from './utils/register.js';
import { loginUser } from './utils/login.js';

export let options = {
  stages: [
    { duration: '10s', target: 50 }, 
    { duration: '1m', target: 50 },  
    { duration: '10s', target: 1000 }, 
    { duration: '3m', target: 1000 },  
    { duration: '10s', target: 50 },  
    { duration: '2m', target: 50 }, 
  ],
  setupTimeout: '1000s'
};

export const setup = () => {
  const registeredUsers = [];

  const userAmount = 1000;

  for (let i = 1; i <= userAmount; i++) {
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
