pragma solidity ^0.8.9;

import "hardhat/console.sol";

contract Waver {
    uint256 totalWaves;

    function wave() public {
        totalWaves++;
        console.log("% waved", msg.sender);
    }

    function getTotalWaves() public view returns (uint256) {
        return totalWaves;
    }
}
