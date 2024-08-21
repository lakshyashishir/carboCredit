pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract UserRewards is ERC20, Ownable, ReentrancyGuard {
    uint256 public rewardRate = 100 * 10**18; // 100 tokens per ton of CO2 reduced
    uint256 public constant MIN_CLAIM_INTERVAL = 1 days;

    mapping(address => uint256) public lastClaimTime;
    mapping(address => uint256) public accumulatedCO2ReductionTons;

    event CO2ReductionReported(address indexed user, uint256 amountTons);
    event RewardClaimed(address indexed user, uint256 amount);
    event RewardRateUpdated(uint256 newRate);

    constructor(address initialOwner) ERC20("CarboCredit Reward", "CCR") Ownable(initialOwner) {}

    function reportCO2Reduction(address user, uint256 amountTons) external onlyOwner {
        accumulatedCO2ReductionTons[user] += amountTons;
        emit CO2ReductionReported(user, amountTons);
    }

    function claimReward() external nonReentrant {
        require(block.timestamp >= lastClaimTime[msg.sender] + MIN_CLAIM_INTERVAL, "Too soon to claim");
        require(accumulatedCO2ReductionTons[msg.sender] > 0, "No CO2 reduction to claim");

        uint256 rewardAmount = accumulatedCO2ReductionTons[msg.sender] * rewardRate;
        accumulatedCO2ReductionTons[msg.sender] = 0;
        lastClaimTime[msg.sender] = block.timestamp;

        _mint(msg.sender, rewardAmount);
        emit RewardClaimed(msg.sender, rewardAmount);
    }

    function burn(uint256 amount) external {
        _burn(msg.sender, amount);
    }

    function getAccumulatedCO2ReductionTons(address user) external view returns (uint256) {
        return accumulatedCO2ReductionTons[user];
    }

    function setRewardRate(uint256 newRate) external onlyOwner {
        rewardRate = newRate;
        emit RewardRateUpdated(newRate);
    }
}