import React, { useContext, useEffect, useState } from 'react';
import './App.css';
import Web3 from 'web3';


function App() {

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
    <div>
      <button variant="success" size="lg" className="connectWallet green-btn" onClick={connect}>
        {walletData.isConnected ?
          walletData.walletAddress.substr(0, 4) + "..." + walletData.walletAddress.substr(-4)
          : "Connect Wallet"}
      </button><br/>
      
    </div>
  );
}

export default App;
