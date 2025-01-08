export const setToLocalStorage = (n: string) => {
    localStorage.setItem("which", n)
}

export const getFromLocalStorage = () => {
    return localStorage.getItem("which")
}