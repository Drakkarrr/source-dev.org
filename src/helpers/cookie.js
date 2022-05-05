import Cookies from "js-cookie";


const setCookie = () => Cookies.set("userCookie", "true", {
    expires: 1/2,
    secure: true,
    sameSite: 'strict',
    path: '/'
})

const getCookie = () => Cookies.get("userCookie");


const clearCookies = () => {
    const allCookies = Cookies.get();
    Object.keys(allCookies).forEach(cookie => {
    Cookies.remove(cookie)
    });
}


export { setCookie, getCookie, clearCookies };