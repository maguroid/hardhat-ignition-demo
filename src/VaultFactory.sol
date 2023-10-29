// SPDX-License-Identifier: Unlicense

pragma solidity 0.8.21;

import {Vault, ISwapper} from './Vault.sol';
import {IERC20} from '@openzeppelin/contracts/token/ERC20/IERC20.sol';

contract VaultFactory {
    event VaultCreated(address indexed vault, address indexed token, address indexed swapper);

    function createVault(IERC20 token, ISwapper swapper) external returns (address vault) {
        vault = address(new Vault(token, swapper));
        emit VaultCreated(vault, address(token), address(swapper));
    }
}
