const BASE_URL = process.env.VITE_API_URL || "http://localhost:4000";

export const signUp = async (payload) => {
    try {
        const response = await fetch(`${BASE_URL}/api/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
            body: JSON.stringify(payload)
        })

        return await response.json()
    } catch (error) {
        console.error("AUTH API SIGNUP ERROR:", error.message)
        return { error: error.message }
    }
}

export const login = async (payload) => {
    try {
        const response = await fetch(`${BASE_URL}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
            body: JSON.stringify(payload)
        })

        return await response.json()
    } catch (error) {
        console.error("AUTH API LOGIN ERROR:", error.message)
        return { error: error.message }
    }
}

export const logout = async () => {
    try {
        const response = await fetch(`${BASE_URL}/api/auth/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
        })

        return await response.json()
    } catch (error) {
        console.error("AUTH API LOGOUT ERROR:", error.message)
        return { error: error.message }
    }
}

export const checkAuth = async () => {
    try {
        const response = await fetch(`${BASE_URL}/api/auth/verify`, {
            credentials: 'include'
        })
        return await response.json()
    } catch (error) {
        console.error("AUTH API CHECK_AUTH ERROR:", error.message)
        return { error: error.message }
    }
}

export const updateAvatar = async (payload) => {
    try {
        const response = await fetch(`${BASE_URL}/api/user/setProfilePic`, {
            method: "POST",
            credentials: "include",
            body: payload
        })
        return await response.json()
    } catch (error) {
        console.error("AUTH API UPDATE PROFILE ERROR:", error.message)
        return { error: error.message }
    }
}

export const fetchAvatar = async () => {
    try {
        const response = await fetch(`${BASE_URL}/api/user/getAvatar`, {
            credentials: "include"
        })
        return await response.json()
    } catch (error) {
        console.error("AUTH API FETCH AVATAR ERROR:", error.message)
        return { error: error.message }
    }
}