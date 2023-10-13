pragma solidity <=0.8.19;

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