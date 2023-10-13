pragma solidity <=0.8.19;

enum EventComponent {
    Name,
    Description,
    Tags
}

contract Event {
    string name_;
    string description_;
    string tags_;

    constructor(string memory name, string memory description, string memory tags) {
        name_ = name;
        description_ = description;
        tags_ = tags;
    }

    modifier organizer {
        _;
    }

    function update(EventComponent part, bytes calldata data) public {

    }

    function publish() public {

    }

    function draft() public {

    }

    function cancel() public {

    }

    function enhanceBy() public {

    }
}