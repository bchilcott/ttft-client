import { useState } from 'react';
import {
  AppBar,
  Button,
  Stack,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from '@mui/material';

import ConfirmResetDialog from '~/components/ConfirmResetDialog';
import { useContacts } from '~/hooks/contacts';

type AppToolbarProps = {
  onTabChange: (event: React.SyntheticEvent, newTabIndex: number) => void;
  tabIndex: number;
};

function getFileName() {
  const currentDate = new Date();

  // Get day, month, year, hours, and minutes
  const year = String(currentDate.getFullYear());
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(currentDate.getDate()).padStart(2, '0');

  // Concatenate the date and time components
  const fileName = `contacts_${year}-${month}-${day}.json`;

  return fileName;
}

export default function AppToolbar(props: AppToolbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { data: contacts } = useContacts();

  function saveFile() {
    const a = document.createElement('a');
    const file = new Blob([JSON.stringify(contacts)], { type: 'text/plain' });

    a.href = URL.createObjectURL(file);
    a.download = `${getFileName()}`;
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
          <Tabs
            sx={{ borderBottom: 1, borderColor: 'divider', ml: 4 }}
            value={props.tabIndex}
            onChange={props.onTabChange}
          >
            <Tab label="Leaflet" />
            <Tab label="Cesium" />
            <Tab label="Data" />
          </Tabs>
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
