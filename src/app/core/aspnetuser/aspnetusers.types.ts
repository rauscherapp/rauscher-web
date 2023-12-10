export interface AspNetUser {
    id: string;
    userName: string;
    normalizedUserName: string;
    email: string;
    normalizedEmail: string;
    emailConfirmed: boolean;
    passwordHash: string | null;
    password: string;
    confirmPassword: string;
    securityStamp: string | null;
    concurrencyStamp: string;
    phoneNumber: string | null;
    phoneNumberConfirmed: boolean;
    twoFactorEnabled: boolean;
    lockoutEnd: Date | null;
    lockoutEnabled: boolean;
    accessFailedCount: number;  
}
export interface AspNetUserPagination
{
    length: number;
    size: number;
    page: number;
    lastPage: number;
    startIndex: number;
    endIndex: number;
}