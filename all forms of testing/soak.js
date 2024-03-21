import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 50, // Number of VUs
  duration: '12h',
};

function generateRandomNumbers(count, max) {
  let numbers = [];
  for (let i = 0; i < count; i++) {
    // genereerd een random getaal tussen 1 en maxId
    numbers.push(Math.floor(Math.random() * max) + 1);
  }
  return numbers;
}

export function setup() {
  const maxId = 8; // Hier kan je het hoofte ID opgeven
  let randomNumbers = generateRandomNumbers(options.vus, maxId); // hier roepje de functie aan die een lijst met nummers aan maakt voor elke vus 1 (je geeft het aantal vus mee en de maxId mee als parameter)
  return randomNumbers;
}

export default function (randomNumbers) {
  
  let myRandomNumber = randomNumbers[__VU - 1]; // hij pakt hier het getal wat op de plaats van de id van de user staat (-1 is omdat arrias bij 0 beginen en de ID met 1 begint)

  let response = http.get(`http://test-api.k6.io/public/crocodiles/${myRandomNumber}/`);

  if (response.status === 200) {
    let responseBody;
    try {
      responseBody = JSON.parse(response.body);
      console.log(__VU, responseBody.id, responseBody.name); // This shows in the console that each VU always has the same number
    } catch (error) {
      // Handle JSON parsing error
      console.error('Error parsing JSON:', error);
      return;
    }
  } else {
    // Handle non-200 responses
    console.log(`Request failed with status: ${response.status}`);
    return;
  }

  check(response, {
    'is status 200': (r) => r.status === 200,
    'response time is under 200ms': (r) => r.timings.duration < 200,
  });

  sleep(1);
}

export function teardown() {
}
