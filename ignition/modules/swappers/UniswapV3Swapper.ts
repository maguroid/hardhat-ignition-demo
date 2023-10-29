import { buildModule } from '@nomicfoundation/hardhat-ignition/modules'
import hre from 'hardhat'

const hex3 = hre.ethers.toBeHex(3, 20)

export default buildModule('UniswapV3Swapper', (m) => {
  const uniswapV3Swapper = m.contract('UniswapV3Swapper', [m.getParameter('router', hex3)])

  return {
    uniswapV3Swapper,
  }
})
