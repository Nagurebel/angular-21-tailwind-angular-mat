export interface LoginRequest {
    u_mob_num: number;
    u_pswd: string;
}

export interface LoginResponse {
    id: number,
    u_name: string,
    u_email_id: string,
    role_id: number,
    u_mob_num: number,
    role_name: string,
    token: string
}