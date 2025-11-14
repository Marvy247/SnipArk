// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './reactive.sol';

contract ReactiveFactory {
    address private owner;
    address public latestDeployed;

    event Received(
        address indexed origin,
        address indexed sender,
        uint256 indexed value
    );
    event Setup(
        address indexed dev,
        address indexed reactiveAddress
    );

    constructor() payable {
        owner = msg.sender;
    }
    
    function createReactive(address callbackHandler, address callbackContract, uint256 eventTopic) payable external {
        Reactive newReactive = new Reactive{value: 2 ether}(callbackHandler, callbackContract, eventTopic);
        latestDeployed = address(newReactive);
        
        emit Setup(msg.sender, address(newReactive));
    }

    function withdraw(address _owner, uint256 amount) external onlyOwner {
        (bool success, ) = _owner.call{value: amount}("");
        require(success, "Payment failed.");
    }

    receive() external payable {
        emit Received(
            tx.origin,
            msg.sender,
            msg.value
        );
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not Authorized to call this function");
        _;
    }
}