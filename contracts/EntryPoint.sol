pragma solidity <=0.8.19;

import "";

contract EntryPoint {
    event Registered(address indexed account, address indexed forEvent);
    event Dropped(address indexed account, address indexed forEvent);

    address immutable registry_;
    address immutable executor_;

    modifier hasPass(address sender, address event_) {
        _;
    }

    constructor(address registry, address executor) {
        registry_ = registry;
        executor_ = executor;
    }

    function registerFor(address event_) public {
        address pass = EventRegistry(registry_).passesOf(event_, true)[0];
        address[] memory filters = EventRegistry(registry_).filtersOf(event_);

        FiltersExecutor(executor_).execute(event_);

        emit Registered(msg.sender, event_);
    }

    function drop(address event_) public hasPass(msg.sender, event_) {
        address pass = EventRegistry(registry_).passesOf(event_, true)[0];
        uint256 activeId = EventPass(pass).getActive(msg.sender);

        EventPass(pass).burn(activeId);

        emit Dropped(msg.sender, event_);
    }
}