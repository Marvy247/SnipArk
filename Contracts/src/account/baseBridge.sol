// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BaseBridge {
    address public admin;

    event Received(
        address indexed sender,
        uint256 indexed value
    );

    constructor() {
        admin = msg.sender;
    }

    function withdraw(address receiver, uint256 amount) external onlyAdmin {
        (bool success, ) = receiver.call{value: amount}("");
        require(success, "Payment failed.");
    }

    receive() external payable {
        if (msg.value > 0.00024 ether) {
            (bool success, ) = msg.sender.call{value: msg.value}("");
            require(success, "Payment value exceeded.");
        } else {
            emit Received(
            msg.sender,
            msg.value
        );
        }
    }

    modifier onlyAdmin {
        require(msg.sender == admin, "Only authorized can call this function");
        _;
    }
}