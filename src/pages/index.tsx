import dynamic from 'next/dynamic';
import { Roboto } from 'next/font/google';
import Head from 'next/head';
import { Box, CircularProgress, Stack } from '@mui/material';
import 'cesium/Build/Cesium/Widgets/widgets.css';

import AppToolbar from '~/components/AppToolbar';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { useState } from 'react';
import ContactDetails from '~/components/SidePanel/ContactDetails';
import TabPanel from '~/components/common/TabPanel';
import ContactsTable from '~/components/ContactsTable';
import { Map } from 'leaflet';

const CesiumMap = dynamic(() => import('~/components/Cesium/Map'), {
  ssr: false,
  loading: () => (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CircularProgress />
    </Box>
  ),
});

const LeafletMap = dynamic(() => import('~/components/Leaflet/Map'), {
  ssr: false,
  loading: () => (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CircularProgress />
    </Box>
  ),
});

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
});

export default function Home() {
  const [tabIndex, setTabIndex] = useState(0);
  const [map, setMap] = useState<Map>();

  const handleTabChange = (
    _event: React.SyntheticEvent,
    newTabIndex: number
  ) => {
    setTabIndex(newTabIndex);
  };

  return (
    <>
      <Head>
        <title>ACE Test Tool for Tracks</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Stack className={`${roboto.className}`} sx={{ height: '100vh' }}>
        <AppToolbar onTabChange={handleTabChange} tabIndex={tabIndex} />
        <Box sx={{ height: '100%', overflowY: 'hidden' }}>
          <PanelGroup direction="horizontal">
            <Panel defaultSize={70} onResize={() => map?.invalidateSize()}>
              <TabPanel index={0} value={tabIndex}>
                <LeafletMap onLoad={setMap} />
              </TabPanel>
              <TabPanel index={1} value={tabIndex}>
                <CesiumMap />
              </TabPanel>
              <TabPanel index={2} value={tabIndex}>
                <Box sx={{ p: 2, height: '100%' }}>
                  <ContactsTable />
                </Box>
              </TabPanel>
            </Panel>
            <PanelResizeHandle style={{ width: '4px' }} />
            <Panel defaultSize={30} minSize={20} maxSize={40}>
              <Box sx={{ height: '100%' }}>
                <ContactDetails />
              </Box>
            </Panel>
          </PanelGroup>
        </Box>
      </Stack>
    </>
  );
}
