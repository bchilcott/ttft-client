import { useState, ReactNode } from 'react';
import {
  AirplanemodeActive,
  DirectionsBoat,
  DirectionsCar,
} from '@mui/icons-material';
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';

import { Environment } from '~/types/Contact';

export type PlacementMode = Environment | 'NONE';

type PlacementModeDetails = {
  icon: ReactNode;
  tooltipTitle: string;
  placementMode: PlacementMode;
};

const speedDialActions: PlacementModeDetails[] = [
  {
    icon: <AirplanemodeActive />,
    tooltipTitle: 'Airborne',
    placementMode: 'AIR',
  },
  {
    icon: <DirectionsCar />,
    tooltipTitle: 'Ground',
    placementMode: 'LAND',
  },
  {
    icon: <DirectionsBoat />,
    tooltipTitle: 'Naval',
    placementMode: 'SURFACE',
  },
];

export type MapActionsProps = {
  offset?: number;
  onSelect: (mode: PlacementMode) => void;
};

export default function MapActions(props: MapActionsProps) {
  const [open, setOpen] = useState(false);

  const speedDialStyles = {
    position: 'absolute',
    bottom: props.offset ?? 16,
    right: props.offset ?? 16,
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <SpeedDial
      ariaLabel="SpeedDial basic example"
      sx={speedDialStyles}
      icon={<SpeedDialIcon />}
      onClick={handleOpen}
      open={open}
    >
      {speedDialActions.map((action) => (
        <SpeedDialAction
          key={action.tooltipTitle}
          icon={action.icon}
          tooltipTitle={action.tooltipTitle}
          onClick={() => {
            setOpen(false);
            props.onSelect(action.placementMode);
          }}
        />
      ))}
    </SpeedDial>
  );
}
