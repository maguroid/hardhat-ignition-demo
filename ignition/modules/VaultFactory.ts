import { buildModule } from '@nomicfoundation/hardhat-ignition/modules'

export default buildModule('VaultFactory', (m) => {
  const vaultFactory = m.contract('VaultFactory')

  return {
    vaultFactory,
  }
})
