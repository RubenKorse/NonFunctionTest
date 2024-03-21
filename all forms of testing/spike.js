import { generateRandomNumbers } from './utils/generateRandomNumbers.js';
import defaultFunction from './utils/defaultFunction.js';

export let options = {
  stages: [
    { duration: '10s', target: 50 }, 
    { duration: '1m', target: 50 },  
    { duration: '10s', target: 1000 }, 
    { duration: '3m', target: 1000 },  
    { duration: '10s', target: 50 },  
    { duration: '2m', target: 50 }, 
  ],
};

export function setup() {
  const maxId = 8; // Hier kun je het maximale ID opgeven
  let randomNumbers = generateRandomNumbers(options.vus, maxId); // Hier roep je de functie aan die een lijst met nummers maakt voor elke VU 1 (je geeft het aantal VU's mee en de maxId mee als parameter)
  return randomNumbers;
}

export { defaultFunction as default };
