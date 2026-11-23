import { api } from '../../config/axios';

export async function login(email, password) {
    const response = await api.get("/usuarios");
    let localStorageUser = null;

    response.data.map((user) => {
        if(user.email === email) {
            localStorageUser = user;
        }
    });

    if(localStorageUser === null) {
        throw new Error;
    }

    localStorage.setItem("user", JSON.stringify(localStorageUser));
}

export async function me() {
    const user = localStorage.getItem("user");

    if(user) {
        return JSON.parse(user);
    }

    return null;
}

export async function logout() {
    localStorage.removeItem("user");
}