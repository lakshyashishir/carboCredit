import { User, CreateUserDTO } from '../models/User';
import { supabase } from '../config/database';
import { AccountId, PublicKey, TransactionId } from "@hashgraph/sdk";

export async function authenticateUser(signedMessage: string, messageToSign: string, walletAddress: string): Promise<User> {
    const isValid = verifySignedMessage(signedMessage, messageToSign, walletAddress);
    if (!isValid) {
        throw new Error('Invalid signature');
    }

    let user = await getUserByWalletAddress(walletAddress);
    if (!user) {
        const newUser: CreateUserDTO = {
            walletAddress,
            username: `User-${walletAddress.slice(0, 6)}`,  
        };
        user = await createUser(newUser);
    }

    return user;
}

function verifySignedMessage(signedMessage: string, messageToSign: string, walletAddress: string): boolean {
    //TODO: Implement signature verification logic here
    return true;
}

async function getUserByWalletAddress(walletAddress: string): Promise<User | null> {
    const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('walletAddress', walletAddress)
        .single();

    if (error) throw error;
    return data;
}

async function createUser(user: CreateUserDTO): Promise<User> {
    const { data, error } = await supabase
        .from('users')
        .insert(user)
        .single();

    if (error) throw error;
    return data;
}