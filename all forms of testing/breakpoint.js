import { generateRandomNumbers } from './utils/generateRandomNumbers.js';
import defaultFunction from './utils/defaultFunction.js';

export let options = {
  stages: [
    { duration: '5m', target: 100 }, 
    { duration: '5m', target: 200 },  
    { duration: '5m', target: 300 },  
    { duration: '5m', target: 400 }, 
    { duration: '5m', target: 500 },  
  ],
};

export function setup() {
  let useramount = 500;
  const maxId = 8; // Hier kun je het maximale ID opgeven
  let randomNumbers = generateRandomNumbers(useramount, maxId); // Hier roep je de functie aan die een lijst met nummers maakt voor elke VU 1 (je geeft het aantal VU's mee en de maxId mee als parameter)
  return randomNumbers;
}

export { defaultFunction as default };