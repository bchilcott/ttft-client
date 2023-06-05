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
  onSelect: (mode: PlacementMode) => void;
};

export default function MapActions(props: MapActionsProps) {
  const [open, setOpen] = useState(false);

  const speedDialStyles = {
    position: 'absolute',
    left: 16,
    bottom: 16,
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <SpeedDial
      ariaLabel="Select placement mode"
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
          tooltipPlacement="right"
          tooltipOpen
          onClick={() => {
            setOpen(false);
            props.onSelect(action.placementMode);
          }}
        />
      ))}
    </SpeedDial>
  );
}
