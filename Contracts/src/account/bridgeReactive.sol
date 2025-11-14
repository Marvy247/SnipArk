// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import '../../lib/reactive-lib/src/interfaces/ISystemContract.sol';
import '../../lib/reactive-lib/src/abstract-base/AbstractPausableReactive.sol';
import '../../lib/reactive-lib/src/interfaces/IReactive.sol';

contract BridgeReactive is IReactive, AbstractPausableReactive {

    uint64 private constant GAS_LIMIT = 1000000;
    address public constant SERVICE = 0x0000000000000000000000000000000000fffFfF;
    uint256 public constant REACT_ID = 1597;
    uint256 public originChainId;
    uint256 private EVENT_TOPIC_0;
    
    address public callbackHandler;

    event Received(
        address indexed origin,
        address indexed sender,
        uint256 indexed value
    );

    constructor(address _callbackHandler, address _baseBridge, uint256 _EVENT_TOPIC_0, uint256 _originChainId) payable {
        callbackHandler = _callbackHandler;
        EVENT_TOPIC_0 = _EVENT_TOPIC_0;
        originChainId = _originChainId;
        service = ISystemContract(payable(SERVICE));
        if (!vm) {
            service.subscribe(originChainId, _baseBridge, EVENT_TOPIC_0, REACTIVE_IGNORE, REACTIVE_IGNORE, REACTIVE_IGNORE);
        }
    }

    function getPausableSubscriptions() internal view override returns (Subscription[] memory) {
        Subscription[] memory result = new Subscription[](1);
        result[0] = Subscription(
            originChainId,
            address(service),
            EVENT_TOPIC_0,
            REACTIVE_IGNORE,
            REACTIVE_IGNORE,
            REACTIVE_IGNORE
        );
        return result;
    }

    function react(LogRecord calldata log) external vmOnly {
        address recipient = address(uint160(log.topic_1));
        uint256 sentValue = uint256(log.topic_2);

        bytes memory payload = abi.encodeWithSignature(
            "callback(address, address, uint256)",
            address(0),
            recipient,
            sentValue
        );

        emit Callback(
        REACT_ID,
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