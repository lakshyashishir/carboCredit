// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CarbonCreditToken is ERC721, Ownable {
    uint256 private _tokenIds;
    mapping(uint256 => bool) private _tokenExists;

    struct CreditMetadata {
        uint256 amountTons;
        string projectId;
        uint256 verificationDate;
    }

    mapping(uint256 => CreditMetadata) public creditMetadata;

    event CreditMinted(uint256 indexed tokenId, address indexed recipient, uint256 amountTons, string projectId);

    constructor(address initialOwner) ERC721("CarbonCreditToken", "CCT") Ownable(initialOwner) {
    }
    function mintCredit(address recipient, uint256 amountTons, string memory projectId) public onlyOwner returns (uint256) {
        uint256 newTokenId = _tokenIds;
        _mint(recipient, newTokenId);
        
        creditMetadata[newTokenId] = CreditMetadata(amountTons, projectId, block.timestamp);
        _tokenExists[newTokenId] = true;  // Mark the token as existing

        _tokenIds += 1;  // Increment the token ID for the next minting

        emit CreditMinted(newTokenId, recipient, amountTons, projectId);
        return newTokenId;
    }

    function getCreditMetadata(uint256 tokenId) public view returns (CreditMetadata memory) {
        require(_tokenExists[tokenId], "Token does not exist");
        return creditMetadata[tokenId];
    }
}
