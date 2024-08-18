export interface Credit {
    id: string;
    userId: string;
    amount: number;
    transactionType: 'minted' | 'bought' | 'sold';
    transactionId?: string;
    createdAt: Date;
}

export type CreateCreditDTO = Omit<Credit, 'id' | 'createdAt'>;