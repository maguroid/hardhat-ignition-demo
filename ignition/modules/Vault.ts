import { buildModule } from '@nomicfoundation/hardhat-ignition/modules'
import UniswapV3Swapper from './swappers/UniswapV3Swapper'
import MockSwapper from './swappers/MockSwapper'

export default buildModule('Vault', (m) => {
  const { uniswapV3Swapper } = m.useModule(UniswapV3Swapper)
  const { mockSwapper } = m.useModule(MockSwapper)

  const uniV3Usdc = m.contract('Vault', [m.getParameter('USDC'), uniswapV3Swapper], {
    id: 'uniswapV3_usdc',
  })

  const mockUsdc = m.contract('Vault', [m.getParameter('USDC'), mockSwapper], {
    id: 'mock_usdc',
  })

  const uniV3Weth = m.contract('Vault', [m.getParameter('WETH'), uniswapV3Swapper], {
    id: 'uniswapV3_weth',
  })

  return {
    uniV3Usdc,
    mockUsdc,
    uniV3Weth,
  }
})

// * NOTES: deployment with factory currently not working as expected.
// *        deployed address not stored in json file, and visualization throws error
// export default buildModule('Vault', (m) => {
//   const { vaultFactory } = m.useModule(VaultFactory)
//   const { uniswapV3Swapper } = m.useModule(UniswapV3Swapper)
//   const { mockSwapper } = m.useModule(MockSwapper)

//   const create1 = m.call(vaultFactory, 'createVault', [m.getParameter('USDC.e'), uniswapV3Swapper], {
//     id: 'uniswapV3_usdc',
//   })
//   const create2 = m.call(vaultFactory, 'createVault', [m.getParameter('USDC.e'), mockSwapper], {
//     id: 'mock_usdc',
//   })

//   const univ3Usdc = m.contractAt('Vault', m.readEventArgument(create1, 'VaultCreated', 'vault', { id: 'create1' }))
//   const mockUsdc = m.contractAt('Vault', m.readEventArgument(create2, 'VaultCreated', 'vault'), { id: 'create2' })

//   return {
//     vaultFactory,
//     univ3Usdc,
//     mockUsdc,
//   }
// })
