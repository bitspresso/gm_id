pragma solidity <=0.8.19;

contract FiltersExecutor {
    address immutable controller_;
    address immutable registry_;

    constructor(address controller, address registry) {
        controller_ = controller;
        registry_ = registry;
    }

    function execute(address event_) external {
        address[] memory filters = EventRegistry(registry_).filtersOf(event_);
        uint256 length = filters.length;
        bool shouldIssue = true;

        for(uint i = 0; i < length;) {
            if(CriteriaFilter(filters[i]).isValid(msg.sender)) {
                shouldIssue = false;
            }

            unchecked {
                ++i;
            }
        }

        shouldIssue ? _issue(event_) : revert();
    }

    function _issue(address event_) internal {
        address[] memory pass = EventRegistry(registry_).passesOf(event_, true);

        IdentController(controller_).process(msg.sender, pass[0]);
    }
}