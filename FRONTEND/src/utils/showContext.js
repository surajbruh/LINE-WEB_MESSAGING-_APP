import { createContext, useContext } from "react";

const showContext = createContext()
const useShowContext = () => useContext(showContext)

export { showContext, useShowContext }