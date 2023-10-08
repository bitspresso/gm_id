pragma solidity ^0.8.19;

contract EventRegistry {
    constructor() {

    }

    function register() public {

    }

    function prepare() public {

    }

    function cancel() public {

    }

    function filtersOf(address event_) external returns (address[] memory) {

    }

    function passesOf(address event_, bool active) external returns (address[] memory) {

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

    function isValid(address account) external returns (bool) {
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

    constructor(address[] memory traits) {
        traits_ = traits;
    }

    mapping(address => bool) exists;

    function setup(address account) public {
        uint256 length = traits_.length;

        for(uint i = 0; i < length;) {
            Trait(traits_[i]).linkTo(account);

            unchecked {
                ++i;
            }
        }
    }

    function setupWithAdditionalChecks(address account, Review[] calldata required) external {
        setup(account);

        uint256 length = required.length;

        for(uint i = 0; i < length;) {
                required[i].associateWith(account);

                unchecked {
                    ++i;
                }
            }
    }

    function existsFor(address account) external view returns(bool) {
        return exists[account];
    }

    function burn(uint256 passId) external {

    }
}