import {
  MenuItem,
  Paper,
  Select,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import TabPanel from '~/components/common/TabPanel';
import { useContacts } from '~/hooks/contacts';
import useContactsStore from '~/hooks/useContactsStore';
import { Contact } from '~/types/Contact';

export default function ContactDetails() {
  const { selectedId } = useContactsStore((state) => state);
  const { data: contacts } = useContacts();

  const selected = contacts?.find((contact) => contact.trackId === selectedId);

  if (!selected) return <NoContactSelected />;
  return <ContactDetailsContent contact={selected} />;
}

function ContactDetailsContent({ contact }: { contact: Contact }) {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Paper sx={{ height: '100%' }}>
      <Stack sx={{ p: 2, height: '100%' }} spacing={2}>
        <Paper elevation={2} sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            General
          </Typography>
          <Stack spacing={4}>
            <TextField
              label="Track ID"
              value={contact.trackId}
              fullWidth
              disabled
            />
            <Stack spacing={2} direction={'row'}>
              <TextField label="Name" value={contact.name} fullWidth />
              <TextField
                label="Data Source"
                value={contact.dataSource}
                fullWidth
                disabled
              />
            </Stack>
          </Stack>
        </Paper>
        <Paper elevation={2} sx={{ p: 2, flex: 1 }}>
          <Tabs
            sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}
            value={value}
            onChange={handleChange}
          >
            <Tab label="Position" />
            <Tab label="Stuff?" />
            <Tab label="Symbol" />
          </Tabs>
          <TabPanel index={0} value={value}>
            <Stack spacing={2}>
              <Typography variant="h6">Position</Typography>
              <Stack spacing={4}>
                <Stack spacing={2} direction={'row'}>
                  <TextField
                    label="Latitude"
                    value={contact.position.latitude.toFixed(6)}
                    fullWidth
                  />
                  <TextField
                    label="Longitude"
                    value={contact.position.longitude.toFixed(6)}
                    fullWidth
                  />
                  <TextField
                    label="Course"
                    type="number"
                    value={contact.course.toFixed(0)}
                    fullWidth
                  />
                </Stack>
                <Stack spacing={2} direction={'row'}>
                  <TextField
                    type="number"
                    label="Altitude"
                    value={contact.position.altitude}
                    sx={{ width: '65%' }}
                  />
                  <Select
                    sx={{ flex: 1 }}
                    defaultValue={contact.position.altitudeUnit}
                  >
                    <MenuItem value="FT_AMSL">FT AMSL</MenuItem>
                    <MenuItem value="FT_AGL">FT AGL</MenuItem>
                    <MenuItem value="FL">FL</MenuItem>
                    <MenuItem value="M_AMSL">M AMSL</MenuItem>
                  </Select>
                </Stack>
                <Stack spacing={2} direction={'row'}>
                  <TextField
                    type="number"
                    label="Speed"
                    value={contact.speed}
                    sx={{ width: '65%' }}
                  />
                  <Select sx={{ flex: 1 }} defaultValue={contact.speedUnit}>
                    <MenuItem value="KT">KT</MenuItem>
                    <MenuItem value="MPH">MPH</MenuItem>
                    <MenuItem value="MPS">MPS</MenuItem>
                    <MenuItem value="DMH">DMH</MenuItem>
                  </Select>
                </Stack>
              </Stack>
              <Typography variant="h6">Attitude</Typography>
              <Stack spacing={2} direction={'row'}>
                <TextField
                  type="number"
                  label="Pitch"
                  value={contact.attitude.pitch}
                  fullWidth
                />
                <TextField
                  type="number"
                  label="Roll"
                  value={contact.attitude.roll}
                  fullWidth
                />
                <TextField
                  type="number"
                  label="Yaw"
                  value={contact.attitude.yaw}
                  fullWidth
                />
              </Stack>
            </Stack>
          </TabPanel>
        </Paper>
      </Stack>
    </Paper>
  );
}

function NoContactSelected() {
  return (
    <Stack
      sx={{ justifyContent: 'center', alignItems: 'center', height: '100%' }}
    >
      <Typography variant="h5">No contact selected</Typography>
      <Typography color="lightgrey">
        Select a contact from the table or create a new one
      </Typography>
    </Stack>
  );
}
