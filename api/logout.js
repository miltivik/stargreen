const logout = () => {
    sessionStorage.removeItem('token')
    window.location ='/HTML/index.html'
}

const logoutbtn = document.querySelector
