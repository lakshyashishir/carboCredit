pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract EmissionVerification is AccessControl {
    uint256 private _verificationIdCounter;

    bytes32 public constant VERIFIER_ROLE = keccak256("VERIFIER_ROLE");

    struct Verification {
        address company;
        uint256 emissionAmountTons;
        uint256 verificationDate;
        address verifier;
        bool verified;
    }

    mapping(uint256 => Verification) public verifications;

    event EmissionReported(uint256 indexed verificationId, address indexed company, uint256 emissionAmountTons);
    event EmissionVerified(uint256 indexed verificationId, address indexed verifier, bool verified);

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender); // Use _grantRole for initialization
    }

    function reportEmission(uint256 emissionAmountTons) external returns (uint256) {
        uint256 newVerificationId = _verificationIdCounter++;
        
        verifications[newVerificationId] = Verification({
            company: msg.sender,
            emissionAmountTons: emissionAmountTons,
            verificationDate: 0,
            verifier: address(0),
            verified: false
        });

        emit EmissionReported(newVerificationId, msg.sender, emissionAmountTons);
        return newVerificationId;
    }

    function verifyEmission(uint256 verificationId, bool verified) external onlyRole(VERIFIER_ROLE) {
        Verification storage v = verifications[verificationId];
        require(v.verificationDate == 0, "Already verified");

        v.verificationDate = block.timestamp;
        v.verifier = msg.sender;
        v.verified = verified;

        emit EmissionVerified(verificationId, msg.sender, verified);
    }

    function addVerifier(address verifier) external onlyRole(DEFAULT_ADMIN_ROLE) {
        grantRole(VERIFIER_ROLE, verifier);
    }

    function removeVerifier(address verifier) external onlyRole(DEFAULT_ADMIN_ROLE) {
        revokeRole(VERIFIER_ROLE, verifier);
    }
}
