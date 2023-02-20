import React, { useContext, useEffect, useState } from 'react';
import './App.css';
import Web3 from 'web3';

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// CONTRACT IMPORTS

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

  async function connect() {
    let web3;
    //connect to web3
    if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
      //we are in the browser and metamask is running
      //ETH mainnet 1
      web3 = new Web3(window.web3.currentProvider);
      let netId = parseInt(window.ethereum.chainId);
      // console.log(netId);
      // if (netId !== 1) {
      //   alert('Please select ethereum mainnet network');
      //   console.error('Please select ethereum mainnet network');
      //   return;
      // }

      //set details
      let accounts;
      try {
        accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      } catch (error) {
        if (error.code === 4001) {
          console.error("Please allow metamask to connect");
        }
        return;
        // console.log(error)
      }
      // console.log(accounts)
      if (accounts.length < 1) {
        console.error('Please unlock metamask wallet first!');
        return;
      }
      // console.log(accounts[0]);
      setWalletData({
        walletAddress: accounts[0],
        isConnected: true,
        web3: web3
      });
    } else {
      //on the browser or user is not running metamask
      console.error("Metamask wallet not found! Please make sure wallet is installed and running!");
    }
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div style={{marginTop: "40px"}}>
        <Container maxWidth="lg">

          <div style={{textAlign: "right"}}>
            <Button variant="outlined" size="lg" onClick={connect}>
              {walletData.isConnected ?
                walletData.walletAddress
                : "Connect Wallet"}
            </Button>
          </div>

          <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Overview" {...a11yProps(0)} />
                <Tab label="Read Contract" {...a11yProps(1)} />
                <Tab label="Write Contract" {...a11yProps(2)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              CONTRACT_OVERVIEW
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
    </ThemeProvider>
  );
}

export default App;
