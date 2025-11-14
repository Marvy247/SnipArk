// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '../../lib/reactive-lib/src/abstract-base/AbstractCallback.sol';
import "./IAccountFactory.sol";

contract BridgeCallback is AbstractCallback {
    address public constant SERVICE = 0x0000000000000000000000000000000000fffFfF;
    address public accountFactoryContract;
    uint256 public rateNum; 
    uint256 public rateDen;

    event bridgeHandled(address indexed sender, uint256 indexed sentValue, uint256 indexed receivedValue);
    
    constructor(address _accountFactoryContract, uint256 _rateNum, uint256 _rateDen) AbstractCallback(SERVICE) payable { 
        accountFactoryContract = _accountFactoryContract;
        rateNum = _rateNum;
        rateDen = _rateDen;
    }
    
    function callback(address sender, address recipient, uint256 sentValue) external authorizedSenderOnly rvmIdOnly(sender) {
        address devAccount = IAccountFactory(accountFactoryContract).devAccounts(recipient);
        if (devAccount == address(0)) {
            uint256 receiveValue = (sentValue * rateNum) / rateDen;
            (bool success, ) = recipient.call{value: receiveValue}("");
            require(success, "brdging failed.");

            emit bridgeHandled(recipient, sentValue, receiveValue);
        } else {
            uint256 receiveValue = (sentValue * rateNum) / rateDen;
            (bool success, ) = devAccount.call{value: receiveValue}("");
            require(success, "brdging failed.");

            emit bridgeHandled(recipient, sentValue, receiveValue);
        }
    }
}