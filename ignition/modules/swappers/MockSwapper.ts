import { buildModule } from '@nomicfoundation/hardhat-ignition/modules'

export default buildModule('MockSwapper', (m) => {
  const mockSwapper = m.contract('MockSwapper', [])

  return {
    mockSwapper,
  }
})
