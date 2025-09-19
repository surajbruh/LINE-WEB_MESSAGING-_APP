import { createContext, useContext } from "react";

const heightContext = createContext()
export default heightContext

export const useHeightContext = () => {
    return useContext(heightContext)
}