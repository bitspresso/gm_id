pragma solidity <=0.8.19;

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