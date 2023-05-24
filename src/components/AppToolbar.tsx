import { useState } from 'react';
import { AppBar, Button, Stack, Toolbar, Typography } from '@mui/material';

import ConfirmResetDialog from '~/components/ConfirmResetDialog';
import useContactsStore from '~/hooks/useContactsStore';

export default function AppToolbar() {
  const [isOpen, setIsOpen] = useState(false);
  const contacts = useContactsStore((state) => state.contacts);

  function saveFile() {
    const a = document.createElement('a');
    const file = new Blob([JSON.stringify(contacts)], { type: 'text/plain' });

    a.href = URL.createObjectURL(file);
    a.download = 'contacts.json';
    a.click();
    a.remove();
  }

  return (
    <>
      <ConfirmResetDialog isOpen={isOpen} setIsOpen={setIsOpen} />
      <AppBar sx={{ justifyContent: 'center', position: 'static' }}>
        <Toolbar>
          <Typography variant="h5">
            ACE <b>TTFT</b>
          </Typography>
          <Stack ml="auto" spacing={2} direction="row">
            <Button variant="contained" onClick={saveFile}>
              Save
            </Button>
            <Button
              color="error"
              variant="contained"
              onClick={() => setIsOpen(true)}
            >
              Reset
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>
    </>
  );
}
