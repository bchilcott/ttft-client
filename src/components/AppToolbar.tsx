import { useState } from 'react';
import { AppBar, Button, Toolbar, Typography } from '@mui/material';

import ConfirmResetDialog from '~/components/ConfirmResetDialog';

export default function AppToolbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <ConfirmResetDialog isOpen={isOpen} setIsOpen={setIsOpen} />
      <AppBar sx={{ justifyContent: 'center', position: 'static' }}>
        <Toolbar>
          <Typography variant="h5">
            ACE <b>TTFT</b>
          </Typography>
          <Button
            color="error"
            variant="contained"
            sx={{ marginLeft: 'auto' }}
            onClick={() => setIsOpen(true)}
          >
            Reset
          </Button>
        </Toolbar>
      </AppBar>
    </>
  );
}
