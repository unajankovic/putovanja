const useLoggedInUser = () => {
    const loggedIn = window.sessionStorage.getItem('loggedIn') === 'true';
    const user = loggedIn ? JSON.parse(window.sessionStorage.getItem('user')) : null;
    const admin = user && user.uloga === 'admin';
    const token = window.sessionStorage.getItem('token');

    return { loggedIn, user, admin, token };
}

export default useLoggedInUser;
