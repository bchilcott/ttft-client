import { Box } from '@mui/system';
import { Viewer } from 'resium';

export default function Map() {
  return (
    <Box sx={{ height: '100%' }}>
      <Viewer
        style={{ height: '100%' }}
        timeline={false}
        infoBox={false}
        animation={false}
        baseLayerPicker={false}
        fullscreenButton={false}
        geocoder={false}
        homeButton={false}
        sceneModePicker={false}
        selectionIndicator={false}
        navigationHelpButton={false}
        navigationInstructionsInitiallyVisible={false}
        vrButton={false}
      />
    </Box>
  );
}
