// SPDX-License-Identifier: Unlicense

pragma solidity 0.8.21;

import {ISwapRouter} from '@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol';
import {ISwapper} from './Vault.sol';

contract UniswapV3Swapper is ISwapper {
    struct SwapConfig {
        uint24 fee;
        uint256 deadline;
        uint256 amountOutMinimum;
    }

    ISwapRouter public immutable swapRouter;

    constructor(ISwapRouter _swapRouter) {
        swapRouter = _swapRouter;
    }

    function swap(
        address tokenIn,
        address tokenOut,
        uint amountIn,
        address recipient,
        bytes memory swapData
    ) external returns (uint256 amountOut) {
        SwapConfig memory config = abi.decode(swapData, (SwapConfig));

        return
            swapRouter.exactInputSingle(
                ISwapRouter.ExactInputSingleParams({
                    tokenIn: tokenIn,
                    tokenOut: tokenOut,
                    fee: config.fee,
                    recipient: recipient,
                    deadline: config.deadline,
                    amountIn: amountIn,
                    amountOutMinimum: config.amountOutMinimum,
                    sqrtPriceLimitX96: 0
                })
            );
    }
}
