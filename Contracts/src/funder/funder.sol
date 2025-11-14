// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '../../lib/reactive-lib/src/abstract-base/AbstractCallback.sol';
import "./IDevAccount.sol";

contract Funder is AbstractCallback {
    address public constant SERVICE = 0x0000000000000000000000000000000000fffFfF;

    address public callbackReceiver;
    address public reactiveReceiver;
    uint256 public refillValue;
    uint256 public refillThreshold;
    address public devAccount;

    event refillHandled(address indexed refillerAddress, address callbackContract);
    event callbackHandled(address indexed funderContract);
    
    constructor(address _callbackReceiver, address _reactiveReceiver, uint256 _refillValue, uint256 _refillThreshold, address _devAccount) AbstractCallback(SERVICE) payable {
        callbackReceiver = _callbackReceiver;
        reactiveReceiver = _reactiveReceiver;
        refillValue = _refillValue;
        refillThreshold = _refillThreshold;
        devAccount = _devAccount;
    }
    
    function callback(address sender) external authorizedSenderOnly rvmIdOnly(sender) {
        uint256 callbackBal = callbackReceiver.balance;
        if (callbackBal <= refillThreshold) {
            (bool success, ) = callbackReceiver.call{value: refillValue}("");
            require(success, "Payment failed.");

            IDevAccount(devAccount).withdraw(address(this), refillValue);

            emit refillHandled(address(this), callbackReceiver);
        } else {
            emit callbackHandled(address(this));
        }

        uint256 reactiveBal = reactiveReceiver.balance;
        if (reactiveBal <= refillThreshold) {
            (bool success, ) = reactiveReceiver.call{value: refillValue}("");
            require(success, "Payment failed.");

            IDevAccount(devAccount).withdraw(address(this), refillValue);

            emit refillHandled(address(this), reactiveReceiver);
        } else {
            emit callbackHandled(address(this));
        }

    }
} 