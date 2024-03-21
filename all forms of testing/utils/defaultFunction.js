import http from 'k6/http';
import { check, sleep } from 'k6';

export default function (randomNumbers) {
  let myRandomNumber = randomNumbers[__VU - 1]; // Pakt het getal op de positie van de ID van de gebruiker (-1 omdat arrays bij 0 beginnen en de ID met 1 begint)

  let response = http.get(`http://test-api.k6.io/public/crocodiles/${myRandomNumber}/`);

  if (response.status === 200) {
    let responseBody;
    try {
      responseBody = JSON.parse(response.body);
      console.log(__VU, responseBody.id, responseBody.name); // Dit toont in de console dat elke VU altijd hetzelfde nummer heeft
    } catch (error) {
      // Behandel fout bij het parsen van JSON
      console.error('Fout bij het parsen van JSON:', error);
      return;
    }
  } else {
    // Behandel niet-200 reacties
    console.log(`Verzoek mislukt met status: ${response.status}`);
    return;
  }

  check(response, {
    'is status 200': (r) => r.status === 200,
    'reactietijd is minder dan 200 ms': (r) => r.timings.duration < 200,
  });

  sleep(1);
}
