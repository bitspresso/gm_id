pragma solidity <=0.8.19;

contract EventRegistry {
    mapping(address => address[]) filters;
    mapping(address => address[]) passes;

    struct Filter {
        address location;
    }

    struct Pass {
        address location;
    }

    constructor() {

    }

    modifier organizer(address account) {
        _;
    }

    function register(string memory name, string memory description) public returns (address) {
        return address(new Event(name, description));
    }

    function prepare() public {

    }

    function cancel(address event_) public organizer(event_) {

    }

    function setFilters(address event_, address[] memory newFilters) public organizer(event_) {
        uint256 length = newFilters.length;

        for(uint256 i = 0; i < length;) {
            filters[event_].push(newFilters[i]);

            unchecked {
                ++i;
            }
        }
    }

    function setPasses(address event_, address[] memory newPasses) public {
        uint256 length = newPasses.length;

        for(uint256 i = 0; i < length;) {
            passes[event_].push(newPasses[i]);

            unchecked {
                ++i;
            }
        }
    }

    function filtersOf(address event_) external view returns (address[] memory) {
        return filters[event_];
    }

    function passesOf(address event_, bool active) external view returns (address[] memory) {
        return passes[event_];
    }
}