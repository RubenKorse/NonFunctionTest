import { generateRandomNumbers } from './utils/generateRandomNumbers.js';
import defaultFunction from './utils/defaultFunction.js';

export let options = {
  vus: 50, // Number of VUs
  duration: '12h',
};

export function setup() {
  const maxId = 8; // Hier kun je het maximale ID opgeven
  let randomNumbers = generateRandomNumbers(options.vus, maxId); // Hier roep je de functie aan die een lijst met nummers maakt voor elke VU 1 (je geeft het aantal VU's mee en de maxId mee als parameter)
  return randomNumbers;
}

export { defaultFunction as default };