import { Box } from '@mui/system';
import { Viewer } from 'resium';

export default function Map() {
  return (
    <Box sx={{ height: '100%' }}>
      <Viewer style={{ height: '100%' }} />
    </Box>
  );
}
