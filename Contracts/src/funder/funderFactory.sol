// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './funder.sol';
import './IAccountFactory.sol';
import './IDevAccount.sol';

contract FunderFactory {
    address private owner;
    address public accountFactory;
    address public latestDeployed;

    event Received(
        address indexed origin,
        address indexed sender,
        uint256 indexed value
    );
    event Setup(
        address indexed dev,
        address indexed funderAddress
    );

    constructor() payable {
        owner = msg.sender;
    }

    function setAccountFactory(address _accountFactory) external {
        accountFactory = _accountFactory;
    }
    
    function createFunder(address dev, address callbackContract, address reactiveContract, uint256 refillValue, uint256 refillthreshold) payable external {
        address devAccount = IAccountFactory(accountFactory).devAccounts(dev);
        uint256 devAccountBalance = devAccount.balance;
        uint256 withdrawAmount = (refillValue * 2);
        uint256 initialFundAmount = withdrawAmount + 2 ether;

        require(devAccountBalance >= withdrawAmount, "Not enough REACT in dev account");

        Funder newReactiveFunder = new Funder{value: initialFundAmount}(callbackContract, reactiveContract, refillValue, refillthreshold, devAccount);
        address funderAddress = address(newReactiveFunder);

        IDevAccount(devAccount).withdraw(address(this), initialFundAmount);
        IDevAccount(devAccount).whitelist(funderAddress);

        latestDeployed = funderAddress;

        emit Setup(dev, funderAddress);
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