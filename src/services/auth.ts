import api from './api';

type SingInRequestProps = {
    email: string;
    password: string;
}

type SignUpRequestProps = {
    name: string;
    email: string;
    password: string;
    phone: string;
}

export const COOKIE_TOKEN = 'cookie_token';
export const COOKIE_ACCESS_TOKEN = 'cookie_access_token';

export const signInRequest = async ({ email, password }: SingInRequestProps) => {
    try {
        const response = await api.post('/auth/login', { email, password });
        return response.data;
    } catch (err) {
        throw err;
    }
}

export const signUpRequest = async ({ name, email, password, phone }:SignUpRequestProps) => {
    try {
        const response = await api.post('/auth/register', { name: name, email: email, password: password, phone: phone });
        return response.data;
    } catch (err) {
        throw err;
    }
}

export const updateUserCommission = async (id:string, commission: number) => {
    try {
        const response = await api.patch(`/auth/updateUserCommission`, {
            params: {id, commission}
        })
        return response.data;
    } catch (error) {
        throw error;
    }
}