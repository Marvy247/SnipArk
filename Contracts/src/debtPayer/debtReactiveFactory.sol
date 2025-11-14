// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './DebtReactive.sol';

contract DebtReactiveFactory {
    address private owner;
    address public latestDeployed;

    event Received(
        address indexed origin,
        address indexed sender,
        uint256 indexed value
    );
    
    event Setup(
        address indexed dev,
        address indexed debtReactive
    );

    constructor() payable {
        owner = msg.sender;
    }

    function createPayerReactive(address dev, address debtPayer, address funderContract) payable external {
        DebtReactive newDebtReactive = new DebtReactive{value: 2 ether}(debtPayer, funderContract);
        address newDebtReactiveAddress = address(newDebtReactive);
        latestDeployed = newDebtReactiveAddress;

        emit Setup(dev, newDebtReactiveAddress);
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