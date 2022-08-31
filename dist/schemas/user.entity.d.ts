export declare class User {
    id: number;
    email: string;
    password: string;
    roles: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    type: string;
    displayName: string;
    pictureUrl: string;
    userId: string;
    idToken: string;
    hashPassword(): Promise<void>;
}
