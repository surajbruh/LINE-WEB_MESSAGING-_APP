const BACKEND_URL = "http://localhost:4000" 

export const postData = async (endpoint, payload) => {
    try {
        const response = await fetch(`${BACKEND_URL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
            body: JSON.stringify(payload)
        })

        const data = await response.json()
        return { success: response.ok, data }
    } catch (error) {
        console.error("POST ERROR:", error.message)
        return { success: false, error: error.message }
    }
}

export const authenticate = async () => {
    try {
        const response = await fetch(`${BACKEND_URL}/api/auth/verify`, {
            credentials: "include"
        })
        const data = await response.json()
        if (response.ok) {
            return { success: true, data }
        }
    } catch (error) {
        console.error("AUTH ERROR:", error.message)
        return false
    }
}

export const updateProfilePic = async (payload) => {
    try {
        const response = await fetch(`${BACKEND_URL}/api/user/setProfilePic`, {
            method: "POST",
            credentials: "include",
            body: payload
        })
        return await response.json()
    } catch (error) {
        console.error("UPDATE PROFILE API ERROR:", error.message)
        return false
    }
}

export const getProfilePic = async () => {
    try {
        const response = await fetch(`${BACKEND_URL}/api/user/getProfilePic`, {
            credentials: 'include'
        })
        if (response.ok) return await response.json()
    } catch (error) {
        console.error("GET PROFILE PIC API ERROR:", error.message)
        return false
    }

}