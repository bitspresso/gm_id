pragma solidity <=0.8.19;

import "./Event.sol";

contract EventRegistry {
    struct Filter {
        address location;
    }

    struct Pass {
        address location;
    }
    
    mapping(address => Event[]) eventsByOrganizer;
    mapping(address => Filter[]) filters;
    mapping(address => Pass[]) passes;

    constructor() {

    }

    function setFilters(address event_, address[] memory newFilters) public {
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