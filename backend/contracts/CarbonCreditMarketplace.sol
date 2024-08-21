pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CarbonCreditMarketplace is ReentrancyGuard, Ownable {
    IERC721 public carbonCreditToken;
    address private _carbonCreditTokenAddress;

    struct Listing {
        address seller;
        uint256 price;
        bool active;
    }

    mapping(uint256 => Listing) public listings;

    event CreditListed(uint256 indexed tokenId, address indexed seller, uint256 price);
    event CreditSold(uint256 indexed tokenId, address indexed seller, address indexed buyer, uint256 price);
    event ListingCancelled(uint256 indexed tokenId, address indexed seller);

    constructor(address initialOwner, address carbonCreditTokenAddress) ReentrancyGuard() Ownable(initialOwner) {
        _carbonCreditTokenAddress = carbonCreditTokenAddress;
        carbonCreditToken = IERC721(_carbonCreditTokenAddress);
    }

    function listCredit(uint256 tokenId, uint256 price) external {
        require(carbonCreditToken.ownerOf(tokenId) == msg.sender, "Not the owner");
        require(carbonCreditToken.getApproved(tokenId) == address(this), "Marketplace not approved");

        listings[tokenId] = Listing(msg.sender, price, true);
        emit CreditListed(tokenId, msg.sender, price);
    }

    function buyCredit(uint256 tokenId) external payable nonReentrant {
        Listing storage listing = listings[tokenId];
        require(listing.active, "Listing not active");
        require(msg.value >= listing.price, "Insufficient payment");

        address seller = listing.seller;
        uint256 price = listing.price;

        listing.active = false;
        carbonCreditToken.safeTransferFrom(seller, msg.sender, tokenId);
        payable(seller).transfer(price);

        emit CreditSold(tokenId, seller, msg.sender, price);

        if (msg.value > price) {
            payable(msg.sender).transfer(msg.value - price);
        }
    }

    function cancelListing(uint256 tokenId) external {
        require(listings[tokenId].seller == msg.sender, "Not the seller");
        delete listings[tokenId];
        emit ListingCancelled(tokenId, msg.sender);
    }
}