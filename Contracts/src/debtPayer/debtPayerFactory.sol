// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './DebtPayer.sol';

contract DebtPayerFactory {
    address private owner;
    address public latestDeployed;

    event Received(
        address indexed origin,
        address indexed sender,
        uint256 indexed value
    );
    
    event Setup(
        address indexed dev,
        address indexed debtPayer
    );

    constructor() payable {
        owner = msg.sender;
    }

    function createPayer(address dev, address callbackContract, address reactiveContract) payable external {
        DebtPayer newDebtPayer = new DebtPayer{value: 2 ether}(callbackContract, reactiveContract);
        address debtPayerAddress = address(newDebtPayer);
        latestDeployed = debtPayerAddress;

        emit Setup(dev, debtPayerAddress);
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