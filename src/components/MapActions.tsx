import {
  AirplanemodeActive,
  DirectionsBoat,
  DirectionsCar,
} from "@mui/icons-material";
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import { useSetAtom } from "jotai";
import { ReactNode, useState } from "react";
import placementModeAtom, {
  PlacementMode,
} from "~/state/jotai/placementModeAtom";

type PlacementModeDetails = {
  icon: ReactNode;
  tooltipTitle: string;
  placementMode: PlacementMode;
};

const speedDialActions: PlacementModeDetails[] = [
  {
    icon: <AirplanemodeActive />,
    tooltipTitle: "Airborne",
    placementMode: "AIR",
  },
  {
    icon: <DirectionsCar />,
    tooltipTitle: "Ground",
    placementMode: "LAND",
  },
  {
    icon: <DirectionsBoat />,
    tooltipTitle: "Naval",
    placementMode: "SURFACE",
  },
];

export default function MapActions({ offset = 16 }) {
  const [open, setOpen] = useState(false);
  const setPlacementMode = useSetAtom(placementModeAtom);

  const speedDialStyles = {
    position: "absolute",
    bottom: offset,
    right: offset,
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
            setPlacementMode(action.placementMode);
          }}
        />
      ))}
    </SpeedDial>
  );
}
