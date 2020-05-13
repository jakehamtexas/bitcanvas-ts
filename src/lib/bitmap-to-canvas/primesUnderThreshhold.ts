export const primesUnderThreshhold = (threshhold: number): number[] => {
  const record = new Array(threshhold).fill(null).map(_ => true);
  const primes = [2];
  const max = Math.sqrt(threshhold);

  for (let prime = 3; prime <= max; prime += 2) {
    if (record[prime]) {
      for (
        let multiple = prime * prime;
        multiple < threshhold;
        multiple += prime * 2
      ) {
        record[multiple] = false;
      }
    }
  }

  for (let sievedNumber = 3; sievedNumber < threshhold; sievedNumber += 2) {
    if (record[sievedNumber]) {
      primes.push(sievedNumber);
    }
  }
  return primes;
};
