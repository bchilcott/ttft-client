import { Box, Paper, Stack } from '@mui/material';
import ContactDetails from '~/components/SidePanel/ContactDetails';
import ContactsTable from '~/components/SidePanel/ContactsTable';

export default function SidePanel() {
  return (
    <Box sx={{ height: '100%' }}>
      <Stack sx={{ p: 2, height: '100%' }} spacing={2}>
        <Paper sx={{ flexGrow: 1 }}>
          <ContactDetails />
        </Paper>
        <Paper sx={{ height: 400 }}>
          <ContactsTable />
        </Paper>
      </Stack>
    </Box>
  );
}
