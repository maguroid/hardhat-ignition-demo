// SPDX-License-Identifier: Unlicense

pragma solidity 0.8.21;

import {SafeERC20, IERC20} from '@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol';
import {Math} from '@openzeppelin/contracts/utils/math/Math.sol';
import {AccessControlEnumerable} from '@openzeppelin/contracts/access/extensions/AccessControlEnumerable.sol';

interface ISwapper {
    function swap(
        address tokenIn,
        address tokenOut,
        uint amountIn,
        address recipient,
        bytes memory swapData
    ) external returns (uint returnAmount1);
}

/**
 * @dev this is just for a demo
 */
contract Vault is AccessControlEnumerable {
    using SafeERC20 for IERC20;
    using Math for uint;

    IERC20 public immutable token;
    ISwapper public swapper;

    uint public fee = 3000; // hundredths of a bip (1 fee unit = 0.0001%)

    mapping(address owner => uint) public balanceOf;

    constructor(IERC20 token_, ISwapper swapper_) {
        token = token_;
        swapper = swapper_;
    }

    function deposit(address original, uint amount, bytes calldata swapData) external {
        uint _amount = amount;
        if (original != address(token)) {
            _amount = ISwapper(swapper).swap(original, address(token), amount, address(this), swapData);
        }

        balanceOf[msg.sender] += _amount.mulDiv(1e6 - fee, 1e6);

        token.safeTransferFrom(msg.sender, address(this), _amount);
    }

    function withdraw(uint amount) external {
        require(balanceOf[msg.sender] >= amount, 'Vault: insufficient balance');

        token.safeTransfer(msg.sender, amount);
    }

    function setFee(uint fee_) external onlyRole(DEFAULT_ADMIN_ROLE) {
        fee = fee_;
    }
}
