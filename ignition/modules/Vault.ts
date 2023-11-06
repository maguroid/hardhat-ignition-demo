import { buildModule } from '@nomicfoundation/hardhat-ignition/modules'
import UniswapV3Swapper from './swappers/UniswapV3Swapper'
import MockSwapper from './swappers/MockSwapper'
import VaultFactory from './VaultFactory'

// * NOTES: deployment with factory currently not working as expected.
// *        deployed address not stored in json file.
// *
// *        issue: https://github.com/NomicFoundation/hardhat-ignition/issues/607
export default buildModule('Vault', (m) => {
  const { vaultFactory } = m.useModule(VaultFactory)
  const { uniswapV3Swapper } = m.useModule(UniswapV3Swapper)
  const { mockSwapper } = m.useModule(MockSwapper)

  const create1 = m.call(vaultFactory, 'createVault', [m.getParameter('USDC'), uniswapV3Swapper], {
    id: 'create1',
  })
  const create2 = m.call(vaultFactory, 'createVault', [m.getParameter('USDC'), mockSwapper], {
    id: 'create2',
  })

  const univ3Usdc = m.contractAt('Vault', m.readEventArgument(create1, 'VaultCreated', 'vault', { id: 'read1' }), {
    id: 'univ3_usdc',
  })
  const mockUsdc = m.contractAt('Vault', m.readEventArgument(create2, 'VaultCreated', 'vault', { id: 'read2' }), {
    id: 'mock_usdc',
  })

  return {
    vaultFactory,
    univ3Usdc,
    mockUsdc,
  }
})
