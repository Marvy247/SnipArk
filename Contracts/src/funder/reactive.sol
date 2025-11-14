// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import '../../lib/reactive-lib/src/interfaces/ISystemContract.sol';
import '../../lib/reactive-lib/src/abstract-base/AbstractPausableReactive.sol';
import '../../lib/reactive-lib/src/interfaces/IReactive.sol';

contract Reactive is IReactive, AbstractPausableReactive {

    uint64 private constant GAS_LIMIT = 1000000;
    address public constant SERVICE = 0x0000000000000000000000000000000000fffFfF;
    uint256 private CHAIN_ID;
    uint256 private EVENT_TOPIC_0;
    
    address public callbackHandler;
    address public callbackContract;

    event Received(
        address indexed origin,
        address indexed sender,
        uint256 indexed value
    );

    constructor(address _callbackHandler, address _callbackContract, uint256 _EVENT_TOPIC_0) payable {
        callbackHandler = _callbackHandler;
        callbackContract = _callbackContract;
        EVENT_TOPIC_0 = _EVENT_TOPIC_0;
        CHAIN_ID = block.chainid;
        service = ISystemContract(payable(SERVICE));
        if (!vm) {
            service.subscribe(CHAIN_ID, _callbackContract, EVENT_TOPIC_0, REACTIVE_IGNORE, REACTIVE_IGNORE, REACTIVE_IGNORE);
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
        // address recipient = address(uint160(log.topic_1));

        bytes memory payload = abi.encodeWithSignature(
            "callback(address)",
            address(0)
        );

        emit Callback(
        CHAIN_ID,
        callbackHandler,
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