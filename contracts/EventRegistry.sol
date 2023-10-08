pragma solidity ^0.8.19;

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

contract Event {
    string name_;
    string description_;

    constructor(string memory name, string memory description) {
        name_ = name;
        description_ = description;
    }
}

contract Filter {} /// @dev base interface

contract CriteriaFilter {
    address immutable event_;
    address immutable pass_;

    constructor(address _event, address pass) {
        event_ = _event;
        pass_ = pass;
    }

    function isValid(address account) external view returns (bool) {
        return EventPass(pass_).existsFor(account);
    }
}

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

contract Opinion {} /// @dev base interface for traits and reviews

contract Trait {
    function linkTo(address account) external {

    }
}

contract Review {
    function associateWith(address account) public {

    }
}

contract IdentController {
    function process(address account, address pass) external {
        EventPass(pass).setup(account);
    }
}

contract Storage { /// @dev base storage ops on passes
    function extract(address forAddress, string calldata datatype) external returns (bytes memory) {} 
}

contract SqueezedPass {
    struct UniquePass {
        address location;
        uint256 passId;
    }

    modifier owner(address account) {
        _;
    }

    function squeezFrom(UniquePass[] calldata passes) public owner(msg.sender) returns (uint256) {
        uint256 length = passes.length;

        for(uint i = 0; i < length;) {
            UniquePass memory pass = passes[i];
            address passAddress = pass.location;
            bytes memory data = Storage(passAddress).extract(msg.sender, "traits"); /// @dev wip

            _deserialize(data);

            EventPass(passAddress).burn(pass.passId);
            _mint(msg.sender);

            unchecked {
                ++i;
            }
        }
    }

    function _deserialize(bytes memory data) internal returns (Opinion[] memory) {

    }

    function _mint(address to) internal returns (uint256) {

    }
}

contract Pass {} /// @dev base pass

contract EventPass {
    address[] private traits_;
    uint256 private lastId = 0;

    constructor(address[] memory traits) {
        traits_ = traits;
    }

    mapping(address => bool) exists;
    mapping(address => uint256) activeId;

    function setup(address account) public {
        uint256 length = traits_.length;

        for(uint i = 0; i < length;) {
            Trait(traits_[i]).linkTo(account);

            unchecked {
                ++i;
            }
        }
    }

    /** function setupWithAdditionalChecks(address account, Review[] calldata required) external { @dev not for deployment
        setup(account);

        uint256 length = required.length;

        for(uint i = 0; i < length;) {
                required[i].associateWith(account);

                unchecked {
                    ++i;
                }
            }
    } */

    function existsFor(address account) external view returns(bool) {
        return exists[account];
    }

    function getActive(address account) external view returns(uint256) {
        return activeId[account];
    }

    function mint(address to) public {
        activeId[to] = lastId + 1;
    }

    function burn(uint256 passId) external {
        activeId[address(0)] = passId;
    }
}