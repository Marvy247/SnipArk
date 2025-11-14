// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '../../lib/reactive-lib/src/abstract-base/AbstractCallback.sol';
import './IAbstractPayer.sol';
import './ISystem.sol';

contract DebtPayer is AbstractCallback {

    address public callbackContract;
    address public reactiveContract;
    address public constant SYSTEM_CONTRACT = 0x0000000000000000000000000000000000fffFfF;

    event debtPaid(address indexed fundedContract);
    
    constructor(address _callbackContract, address _reactiveContract) AbstractCallback(SYSTEM_CONTRACT) payable {
        callbackContract = _callbackContract;
        reactiveContract = _reactiveContract;
    }
    
    function callback(address sender) external authorizedSenderOnly rvmIdOnly(sender) {
        uint256 callbackDebt = ISystem(SYSTEM_CONTRACT).debts(callbackContract);
        uint256 reactiveDebt = ISystem(SYSTEM_CONTRACT).debts(reactiveContract);
        if (callbackDebt > 0) {
            IAbsctractPayer(callbackContract).coverDebt();
            emit debtPaid(address(this));
        }

        if (reactiveDebt > 0) {
            IAbsctractPayer(reactiveContract).coverDebt();
            emit debtPaid(address(this));
        }
    }
} 