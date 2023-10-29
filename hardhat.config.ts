import { HardhatUserConfig } from 'hardhat/config'
import '@nomicfoundation/hardhat-toolbox'
import '@nomicfoundation/hardhat-ignition'
import '@nomicfoundation/hardhat-foundry'

import dotenv from 'dotenv'

dotenv.config()

const config: HardhatUserConfig = {
  solidity: '0.8.21',
  networks: {
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL,
      accounts: [process.env.PRIVATE_KEY ?? ''],
    },
  },
}

export default config
