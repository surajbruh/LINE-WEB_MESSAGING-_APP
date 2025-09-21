const BASE_URL = "http://localhost:4000";

export const fetchUsers = async () => {
    try {
        const response = await fetch(`${BASE_URL}/api/chats`, {
            credentials: "include"
        })
        return await response.json()
    } catch (error) {
        console.error("CHAT API FETCH_USERS ERROR:", error.message)
        return { error: error.message }
    }
}

export const fetchMessages = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/api/${id}`, {
            method: 'GET',
            credentials: "include"
        })
        return await response.json()
    } catch (error) {
        console.error("CHAT API FETCH_MESSAGES ERROR:", error.message)
        return { error: error.message }

    }
}

export const sendMessage = async ({ receiver_id, payload }) => {
    try {
        const response = await fetch(`${BASE_URL}/api/send/${receiver_id}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
            body: JSON.stringify({ text: payload })
        })

        return await response.json()
    } catch (error) {
        console.error("CHAT API SEND_MESSAGE ERROR:", error.message)
        return { error: error.message }
    }
}

export const getConversation = async (userId) => {
    try {
        const response = await fetch(`${BASE_URL}/api/conversations/${userId}`, {
            method: 'GET',
            credentials: "include"
        })
        return await response.json()
    } catch (error) {
        console.error("CHAT API FETCH_CONVERSTAION ERROR:", error.message)
        return { error: error.message }
    }
}