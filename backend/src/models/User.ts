import { Emission } from "./Emission";
import { Credit } from "./Credit";
import { MarketplaceListing } from "./MarketplaceListing";

export interface User {
    id: string;  // This will be the Hedera account ID
    walletAddress: string;  // The public key of the user's wallet
    username: string; 
    profilePicture?: string;
    carbonCredits: number;
    emissions: Emission[];
    credits: Credit[];
    listings: MarketplaceListing[];
    createdAt: Date;
    updatedAt: Date;
}

export type CreateUserDTO = Pick<User, 'walletAddress' | 'username'>;
export type UpdateUserDTO = Partial<Pick<User, 'username' | 'profilePicture'>>;