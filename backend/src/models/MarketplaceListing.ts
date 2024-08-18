export interface MarketplaceListing {
    id: string;
    userId: string;
    amount: number;
    price: number;
    status: 'active' | 'completed' | 'cancelled';
    createdAt: Date;
    updatedAt: Date;
}

export type CreateMarketplaceListingDTO = Omit<MarketplaceListing, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateMarketplaceListingDTO = Partial<CreateMarketplaceListingDTO>;