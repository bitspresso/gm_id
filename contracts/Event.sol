pragma solidity <=0.8.19;

contract Event {
    string name_;
    string description_;

    constructor(string memory name, string memory description) {
        name_ = name;
        description_ = description;
    }
}