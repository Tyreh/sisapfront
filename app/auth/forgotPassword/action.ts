'use server'

import { getErrorMessage } from "@/lib/utils";

export async function forgotPassword(username: string) {
    try {
        const response = await fetch(`${process.env.API_URL}/auth/forgotPassword`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username }),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        return {
            status: 500,
            message: getErrorMessage(error),
        };
    }
}