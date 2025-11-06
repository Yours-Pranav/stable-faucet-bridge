# Sepolia USDT → Stable Testnet Bridge

Bridge USDT from Ethereum Sepolia testnet to Stable testnet using LayerZero's cross-chain messaging protocol.

## Overview

This script bridges Test USDT from Ethereum Sepolia to Stable testnet as USDT0 using LayerZero's OFT (Omnichain Fungible Token) standard.

## Prerequisites

- Node.js and npm installed
- Sepolia testnet ETH for gas fees
- Sepolia testnet USDT (mint from [Sepolia USDT contract](https://sepolia.etherscan.io/address/0xc4DCC311c028e341fd8602D8eB89c5de94625927#writeContract))

## Installation

```bash
npm install --save-dev hardhat @nomiclabs/hardhat-ethers ethers dotenv @layerzerolabs/lz-v2-utilities
