// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./devAccount.sol";

contract AccountFactory {
    address public admin;
    address public funderFactory;

    uint256 public userCount;
    mapping (address => address) public devAccounts;

    event Received(
        address indexed origin,
        address indexed sender,
        uint256 indexed value
    );

    constructor() payable {
        admin = msg.sender;
    }

    function setFunderFactory(address _funderFactory) external {
        funderFactory = _funderFactory;
    }

    function createAccount(address dev) external payable {
        if (userCount < 11) {
            DevAccount newAccount = new DevAccount{value: 2 ether}(msg.sender, admin, address(this), funderFactory);
            devAccounts[dev] = address(newAccount);
            newAccount.whitelist(funderFactory);
            userCount = userCount + 1;
        } else {
            DevAccount newAccount = new DevAccount{value: 0 ether}(msg.sender, admin, address(this), funderFactory);
            devAccounts[dev] = address(newAccount);
            newAccount.whitelist(funderFactory);
            userCount = userCount + 1;
        }
    }

    receive() external payable {
        emit Received(
            tx.origin,
            msg.sender,
            msg.value
        );
    }
}