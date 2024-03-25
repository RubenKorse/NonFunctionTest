import { generateRandomNumbers } from './utils/generateRandomNumbers.js';
import defaultFunction from './utils/defaultFunction.js';

export let options = {
  vus: 1,
  duration: '1m',
  ext: {
    loadimpact: {
      projectID: 3688133,
      // Test runs with the same name groups test runs together
      name: 'smoke test'
    }
  }
};

export function setup() {
  const maxId = 8; // Hier kun je het maximale ID opgeven
  let randomNumbers = generateRandomNumbers(options.vus, maxId); // Hier roep je de functie aan die een lijst met nummers maakt voor elke VU 1 (je geeft het aantal VU's mee en de maxId mee als parameter)
  return randomNumbers;
}

export { defaultFunction as default };
