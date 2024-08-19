export interface Emission {
    id: string;
    userId: string;
    amount: number;
    category: string;
    description: string;
    date: Date;
    consensusTimestamp: string;
    createdAt: Date;
    updatedAt: Date;
}

export type CreateEmissionDTO = Omit<Emission, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateEmissionDTO = Partial<CreateEmissionDTO>;