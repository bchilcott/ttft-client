import Contact from '~/types/Contact';
import { SpeedUnit } from '~/types/Units';
import { computeDestinationPoint } from 'geolib';

export function updateContactPosition(
  contact: Contact,
  refreshPeriod: number
): Contact {
  const { position, speed, speedUnit, course } = contact;

  const speedInMps = convertToMps(speed, speedUnit);
  const distance = speedInMps * refreshPeriod;

  const destPoint = computeDestinationPoint(position, distance, course);

  return {
    ...contact,
    position: {
      ...contact.position,
      latitude: destPoint.latitude,
      longitude: destPoint.longitude,
    },
  };
}

function convertToMps(speed: number, speedUnit: SpeedUnit): number {
  if (speedUnit === 'KT') {
    return speed * 0.514444; // Knots to meters per second conversion
  } else if (speedUnit === 'MPH') {
    return speed * 0.44704; // Miles per hour to meters per second conversion
  } else if (speedUnit === 'MPS') {
    return speed; // No conversion needed
  } else if (speedUnit === 'DMH') {
    return speed * 0.277778; // Decimeters per hour to meters per second conversion
  } else {
    throw new Error('Invalid speed unit');
  }
}
