import { AltitudeUnit, SpeedUnit } from '~/types/Units';

export type Operation =
  | 'NEW'
  | 'UPDATED'
  | 'DEAD_RECKONING'
  | 'TERMINATED'
  | 'TYPE CHANGE';

export type Environment =
  | 'AIR'
  | 'LAND'
  | 'SURFACE'
  | 'SUBSURFACE'
  | 'EMERGENCY_POINT'
  | 'EW POINT'
  | 'SPACE'
  | 'OTHER';

export type Attitude = {
  pitch: number;
  roll: number;
  yaw: number;
};

export type Position = {
  latitude: number;
  longitude: number;
  altitude: number;
  altitudeUnit: AltitudeUnit;
};

export type Contact = {
  name: string;
  dataSource: string;
  trackId: string;
  type: string;
  systemId: string;
  environment: Environment;
  course: number;
  speed: number;
  speedUnit: SpeedUnit;
  stale: boolean;
  operation: Operation;
  attitude: Attitude;
  position: Position;
};

export type CreateContactDto = {
  name: string;
  type: string;
  systemId: string;
  environment: Environment;
  course: number;
  speed: number;
  speedUnit: SpeedUnit;
  operation: Operation;
  attitude: Attitude;
  position: Position;
};
