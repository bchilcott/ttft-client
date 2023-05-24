import { Stack, Typography } from '@mui/material';
import useContactsStore from '~/hooks/useContactsStore';
import Contact from '~/types/Contact';

export default function ContactDetails() {
  const { contacts, selectedId } = useContactsStore((state) => state);
  const selected = contacts.find((contact) => contact.trackID === selectedId);

  if (!selected) return <NoContactSelected />;
  return <ContactDetailsContent contact={selected} />;
}

function ContactDetailsContent({ contact }: { contact: Contact }) {
  return (
    <Stack sx={{ p: 2, spacing: 2, height: '100%' }}>
      <Typography variant="h5">
        {contact.name} - {contact.trackID}
      </Typography>
      <Typography variant="body1">{contact.dataSource}</Typography>
      <Typography variant="body2">
        {contact.position.latitude}, {contact.position.longitude}
      </Typography>
    </Stack>
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
