(function() {
    const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('token='));

    const onAuthPage = window.location.pathname.endsWith('login.html') || window.location.pathname.endsWith('register.html');

    if (!token && !onAuthPage) {
        window.location.href = '/html/login.html';
    } else if (token && onAuthPage) {
        window.location.href = '/html/index.html';
    }
})();