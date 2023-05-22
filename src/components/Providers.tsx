import { ReactNode, useEffect } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';

import theme from '~/theme';
import useContactsStore from '~/state/useContactsStore';
import { updateContact } from '~/utils/contactUtils';

const PERIOD_IN_SECONDS = 1;

export default function Providers({ children }: { children: ReactNode }) {
  const { contacts, setAll } = useContactsStore();

  useEffect(() => {
    const int = setInterval(() => {
      const updated = contacts.map((contact) => updateContact(contact, 1));
      setAll(updated);
    }, 1000 * PERIOD_IN_SECONDS);

    return () => clearInterval(int);
  }, [contacts, setAll]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
