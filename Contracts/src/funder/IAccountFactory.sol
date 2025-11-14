// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IAccountFactory {
    // Mapping getter for: mapping(address => address) public devAccounts;
    function devAccounts(address dev) external view returns (address account);
}