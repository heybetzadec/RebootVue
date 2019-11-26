export const appOptions = {
    apiUrl     : 'http://localhost:8081/',
    apiSecureUrl     : 'http://localhost:8081/secure/',
    adminPath     : '/dashboard',
    loginPath     : '/dashboard/login',
    jsonHeader : {
        'Content-Type':'application/json',
    },
    jsonHeaderToken : {
        'Authorisation':'Token '+ localStorage.token
    },
    multipartHeader: {
        // 'Accept': 'application/json',
        'Content-Type':'multipart/form-data',
    }
};
