export function generateRandomNumbers(count, max) {
  let numbers = [];
  for (let i = 0; i < count; i++) {
    // Genereert een willekeurig getal tussen 1 en maxId
    numbers.push(Math.floor(Math.random() * max) + 1);
  }
  return numbers;
}
