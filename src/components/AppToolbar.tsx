import { AppBar, Toolbar, Typography } from "@mui/material";
import { useAtomValue } from "jotai";
import placementModeAtom from "~/state/jotai/placementModeAtom";

export default function AppToolbar() {
  const placementMode = useAtomValue(placementModeAtom);

  return (
    <AppBar sx={{ justifyContent: "center" }}>
      <Toolbar>
        <Typography variant="h5">
          ACE <b>TTFT</b>
          {placementMode !== "NONE" && ` - ${placementMode}`}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
