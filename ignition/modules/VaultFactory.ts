import { buildModule } from '@nomicfoundation/hardhat-ignition/modules'

export default buildModule('Vault', (m) => {
  const vaultFactory = m.contract('VaultFactory')

  return {
    vaultFactory,
  }
})
