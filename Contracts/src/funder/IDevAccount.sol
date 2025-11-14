// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IDevAccount {
    function withdraw(address fundedContract, uint256 amount) external;
    function whitelist(address funderContract) external;
}