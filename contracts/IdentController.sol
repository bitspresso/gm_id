pragma solidity <=0.8.19;

contract IdentController {
    function process(address account, address pass) external {
        EventPass(pass).setup(account);
    }
}