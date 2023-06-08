import { Box } from '@mui/system';
import { useEffect, useState } from 'react';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export default function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    if (!hasLoaded && value == index) {
      setHasLoaded(true);
    }
  }, [value, hasLoaded, index]);

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      style={{ height: '100%' }}
      {...other}
    >
      {hasLoaded && <Box sx={{ height: '100%' }}>{children}</Box>}
    </div>
  );
}
