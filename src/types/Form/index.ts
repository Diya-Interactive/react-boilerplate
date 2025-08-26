export interface LoginFormData {
    fullName?: string;
    email?: string;
    password?: string;
}

export interface LoginFormErrors {
    fullName?: boolean;
    email?: boolean;
    password?: boolean;
}

export interface LoginFormMessages {
    fullName?:string;
    email?: string;
    password?: string;
}
