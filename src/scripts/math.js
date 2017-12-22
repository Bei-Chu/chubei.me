function npv(flows, interest) {
  let result = 0;
  for (let i = 0; i < flows.length; i += 1) {
    result += flows[i] / ((1 + interest) ** i);
  }
  return result;
}

function irrBound(flows) {
  const zeroNPV = npv(flows, 0);
  if (zeroNPV === 0) {
    return 0;
  }

  let positiveBound = false;
  const positiveNPV = npv(flows, 1);
  if (positiveNPV * zeroNPV < 0 || Math.abs(positiveNPV) < Math.abs(zeroNPV)) {
    positiveBound = true;
  }

  let bound = 1;
  while (true) {
    const signedBound = positiveBound ? bound : -bound;
    const boundNPV = npv(flows, signedBound);
    if (boundNPV * zeroNPV < 0) {
      return signedBound;
    }
    bound += 1;
  }
}

function irr(flows) {
  const zeroNPV = npv(flows, 0);
  let bound0 = 0.0;
  let bound1 = irrBound(flows);
  let currentNPV = 0;
  let guess = 0;
  do {
    guess = (bound0 + bound1) / 2;
    currentNPV = npv(flows, guess);
    if (currentNPV * zeroNPV < 0) {
      bound1 = guess;
    } else {
      bound0 = guess;
    }
  } while (Math.abs(currentNPV) > 0.01 && Math.abs(bound0 - bound1) > 0.00001);
  return guess;
}

export default { irr };
