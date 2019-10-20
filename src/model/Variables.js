export const appOptions = {
    apiUrl     : 'http://localhost:8081/',
    jsonHeader : {
        'Content-Type':'application/json',
        // 'Access-Control-Allow-Origin': '*',
        // 'Access-Control-Allow-Methods':'GET, POST, PATCH, PUT, DELETE, OPTIONS',
        // 'Access-Control-Allow-Headers':'Origin, Content-Type, X-Auth-Token'
    },
    multipartHeader: {
        // 'Accept': 'application/json',
        'Content-Type':'multipart/form-data',
    }
};
