// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import '../../lib/reactive-lib/src/interfaces/ISystemContract.sol';
import '../../lib/reactive-lib/src/abstract-base/AbstractPausableReactive.sol';
import '../../lib/reactive-lib/src/interfaces/IReactive.sol';

contract DebtReactive is IReactive, AbstractPausableReactive {

    uint64 private constant GAS_LIMIT = 1000000;
    uint256 private CHAIN_ID;
    uint256 private constant EVENT_TOPIC_0 = 0xae9b008540831f838abd0c11ccc58c6373c34ab68e881d96aefe64688f45ec6d;
    address public constant SERVICE = 0x0000000000000000000000000000000000fffFfF;
    
    address public debtPayer;
    address public funderContract;

    event Received(
        address indexed origin,
        address indexed sender,
        uint256 indexed value
    );

    constructor(address _debtPayer, address _funderContract) payable {
        CHAIN_ID = block.chainid;
        debtPayer = _debtPayer;
        _funderContract = funderContract;
        service = ISystemContract(payable(SERVICE));
        if (!vm) {
            service.subscribe(CHAIN_ID, _funderContract, EVENT_TOPIC_0, REACTIVE_IGNORE, REACTIVE_IGNORE, REACTIVE_IGNORE);
        }
    }

    function getPausableSubscriptions() internal view override returns (Subscription[] memory) {
        Subscription[] memory result = new Subscription[](1);
        result[0] = Subscription(
            CHAIN_ID,
            address(service),
            EVENT_TOPIC_0,
            REACTIVE_IGNORE,
            REACTIVE_IGNORE,
            REACTIVE_IGNORE
        );
        return result;
    }

    function react(LogRecord calldata log) external vmOnly {

        bytes memory payload = abi.encodeWithSignature(
            "callback(address)",
            address(0)
        );

        emit Callback(
        CHAIN_ID,
        debtPayer,
        GAS_LIMIT,
        payload
    );
    }

    receive() external payable override(AbstractPayer, IPayer) {
        emit Received(
            tx.origin,
            msg.sender,
            msg.value
        );
    }
}