import { AppBar, Toolbar, Typography } from "@mui/material";

export default function AppToolbar() {
  return (
    <AppBar sx={{ justifyContent: "center" }}>
      <Toolbar>
        <Typography variant="h5">
          ACE <b>TTFT</b>
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
