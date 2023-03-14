import React, { useState } from 'react';
import './App.css';

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import PushNotifications from './components/Contract/PushNotifications';
import ContractInfo from './components/Contract/ContractInfo';
import LatestTransactions from './components/Contract/LatestTransactions';

import { WagmiConfig, createClient, configureChains } from 'wagmi'
 
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'
 
import { mainnet, polygon, optimism, arbitrum } from 'wagmi/chains';

import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { ConnectButton } from '@rainbow-me/rainbowkit';

// CONTRACT IMPORTS

const { chains, provider } = configureChains(
  [mainnet, polygon, optimism, arbitrum],
  [
    alchemyProvider({ apiKey: process.env.ALCHEMY_ID }),
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function App() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [walletData, setWalletData] = useState({
    walletAddress: "",
    isConnected: false,
    web3: null
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          <div style={{marginTop: "40px"}}>
            <Container maxWidth="lg">

              <div style={{"clear":"all"}}>
                <div style={{float: "right"}}>
                    <ConnectButton />
                </div>
              </div>
              <br />

              <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Overview" {...a11yProps(0)} />
                    <Tab label="Read Contract" {...a11yProps(1)} />
                    <Tab label="Write Contract" {...a11yProps(2)} />
                  </Tabs>
                </Box>
                <TabPanel value={value} index={0}>

                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <ContractInfo contract_address="CONTRACT_ADDRESS" />
                    </Grid>
                    <Grid item xs={6}>
                      <PushNotifications contract_address="CONTRACT_ADDRESS" />
                    </Grid>
                  </Grid>
                  <Box m={2} pt={3} />
                  <LatestTransactions contract_address="CONTRACT_ADDRESS" />
                  
                </TabPanel>
                <TabPanel value={value} index={1}>
                  CONTRACT_READ_FUNCTIONS
                </TabPanel>
                <TabPanel value={value} index={2}>
                  CONTRACT_WRITE_FUNCTIONS
                </TabPanel>
              </Box>
            </Container>
            
          </div>
        </RainbowKitProvider>
      </WagmiConfig>
    </ThemeProvider>
  );
}

export default App;
