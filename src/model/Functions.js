export const Functions = {
    sef_link(text) {

        let search = [
            ' - ', '?', '(', ')', '\'', ' ', '/', '*', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '{', '}', '"', '\\', '`', '~',
            'i', 'ğ', 'Ğ', 'ə', 'Ə', 'I', 'İ', 'ı', 'I', 'ö', 'Ö', 'ç', 'Ç', 'ş', 'Ş', 'ü', 'Ü', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
            'а', 'б', 'в', 'г', 'д', 'е', 'ж', 'з', 'и', 'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'ъ', 'ь', 'ю', 'я', 'э', 'ё', 'ы',
            'А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ж', 'З', 'И', 'Й', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ъ', 'Ь', 'Ю', 'Я', 'Э', 'Ё', 'Ы'
        ];

        let replacement = [
            '-', '', '', '', '', '-', '-', '-', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
            'i', 'g', 'g', 'e', 'e', 'i', 'i', 'i', 'i', 'o', 'o', 'c', 'c', 's', 's', 'u', 'u', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
            'a', 'b', 'v', 'g', 'd', 'e', 'zh', 'z', 'i', 'y', 'k', 'l', 'm', 'n', 'o', 'p', 'r', 's', 't', 'u', 'f', 'h', 'ts', 'ch', 'sh', 'sht', 'a', 'y', 'yu', 'ya', 'e', 'yo', 'i',
            'a', 'b', 'v', 'g', 'd', 'e', 'zh', 'z', 'i', 'y', 'k', 'l', 'm', 'n', 'o', 'p', 'r', 's', 't', 'u', 'f', 'h', 'ts', 'ch', 'sh', 'sht', 'a', 'y', 'yu', 'ya', 'e', 'yo', 'i'
        ];

        for (let i = 0; i < search.length; i++) {
            text = text.split(search[i]).join(replacement[i]);
        }

        return text;
    },

    htmlToText(str){
        return str.replace(/<[^>]*>?/gm, '');
    },

    authHeader() {
        // return authorization header with basic auth credentials
        let user = JSON.parse(localStorage.getItem('user'));

        if (user && user.authdata) {
            return { 'Authorization': 'Basic ' + user.authdata };
        } else {
            return {};
        }
    },

    configureFakeBackend() {
        let users = [{id: 1, username: 'test', password: 'test', firstName: 'Test', lastName: 'User'}];
        let realFetch = window.fetch;
        window.fetch = function (url, opts) {
            return new Promise((resolve, reject) => {
                // wrap in timeout to simulate server api call
                setTimeout(() => {

                    // authenticate
                    if (url.endsWith('/users/authenticate') && opts.method === 'POST') {
                        // get parameters from post request
                        let params = JSON.parse(opts.body);

                        // find if any user matches login credentials
                        let filteredUsers = users.filter(user => {
                            return user.username === params.username && user.password === params.password;
                        });

                        if (filteredUsers.length) {
                            // if login details are valid return user details
                            let user = filteredUsers[0];
                            let responseJson = {
                                id: user.id,
                                username: user.username,
                                firstName: user.firstName,
                                lastName: user.lastName
                            };
                            resolve({ok: true, text: () => Promise.resolve(JSON.stringify(responseJson))});
                        } else {
                            // else return error
                            reject('Username or password is incorrect');
                        }

                        return;
                    }

                    // get users
                    if (url.endsWith('/users') && opts.method === 'GET') {
                        // check for fake auth token in header and return users if valid, this security
                        // is implemented server side in a real application
                        if (opts.headers && opts.headers.Authorization === `Basic ${window.btoa('test:test')}`) {
                            resolve({ok: true, text: () => Promise.resolve(JSON.stringify(users))});
                        } else {
                            // return 401 not authorised if token is null or invalid
                            reject('Unauthorised');
                        }

                        return;
                    }

                    // pass through any requests not handled above
                    realFetch(url, opts).then(response => resolve(response));

                }, 500);
            });
        }
    }
};
