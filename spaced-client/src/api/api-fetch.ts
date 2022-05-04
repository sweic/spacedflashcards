import axios from "axios"

const endpointURL = 'http://localhost:5000'

export const fetchCardByID = async (user: string, signal: AbortSignal, id: string) => {
    const res = await axios.post(`${endpointURL}/fetchCardByID`, {user: user, id: id}, {signal: signal}).catch((err) => {throw err} )
    return res
}

