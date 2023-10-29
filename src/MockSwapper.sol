// SPDX-License-Identifier: Unlicense

pragma solidity 0.8.21;

import {ISwapper} from './Vault.sol';

contract MockSwapper is ISwapper {
    function swap(address, address, uint amountIn, address, bytes memory) external pure returns (uint returnAmount1) {
        return amountIn * 2;
    }
}
