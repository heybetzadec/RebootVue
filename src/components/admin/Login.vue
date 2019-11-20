<template>
    <div class="login">
        <div class="p-grid p-fluid container-box">
            <div class="p-col-12 p-md-4">

            </div>

            <div class="p-col-12 p-md-4">

                <Panel>
                    <template #header>
                        <div class="panel-header">Daxil ol</div>
                    </template>

                    <Message v-if="error" severity="error">{{error}}</Message>

                    <div class="p-inputgroup">
                        <span class="p-inputgroup-addon">
                            <i class="pi pi-user"></i>
                        </span>
                        <InputText placeholder="İstifadəçi adı" v-model="username"/>
                    </div>
                    <div class="p-inputgroup">
                        <span class="p-inputgroup-addon">
                            <i class="pi pi-key"></i>
                        </span>
                        <InputText type="password" placeholder="Şifrə" v-model="password"/>
                    </div>
                    <div class="p-grid p-fluid">
                        <div class="p-col-12 p-md-8">
                            <div class="remmember-me">
                                <Checkbox id="binary" v-model="checked" :binary="true"/>
                                <label for="binary" class="p-checkbox-label">Məni xatırla</label>
                            </div>
                        </div>
                        <div class="p-col-12 p-md-4">
                            <div class="login-button-container">
                                <Button label="Daxil ol" @click="login()"/>
                            </div>
                        </div>
                    </div>
                </Panel>
            </div>

            <div class="p-col-12 p-md-4">

            </div>

        </div>
    </div>
</template>

<script>

    import {appOptions} from "../../model/Variables";
    // import {Functions} from "../../model/Functions";
    let axios = require('axios');

    export default {
        data() {
            return {
                username : "",
                password : "",
                error : "",
                checked: false,
            };
        },
        methods: {
            login: function () {
                if (this.username.length < 4) {
                    this.error = "İstifadəçi adı 3 hərfdən uzun olmalıdır!"
                }

                if (this.password.length < 6) {
                    if (this.error !== 0) {
                        this.error = this.error + "  Şifrə 5 hərfdən uzun olmalıdır!"
                    } else {
                        this.error = "Şifrə 5 hərfdən uzun olmalıdır!"
                    }
                }

                if (this.error !==0) {
                    let basic = 'Basic ' + window.btoa(this.username + ':' + this.password);
                    let options = {
                        url: appOptions.apiUrl + 'user/login',
                        method: 'GET',
                        headers: {
                            'Authorization': basic
                        }
                    };
                    // eslint-disable-next-line no-unused-vars
                    axios(options).then((res) => {
                        if (res.data.status==='OK'){
                            this.error = '';
                            this.username = '';
                            this.password = '';
                            let token = res.data.body.token;
                            let loginUser = res.data.body.loginUser;
                            localStorage.token = token;
                            localStorage.loginUser  = JSON.stringify(loginUser);

                            // console.log(localStorage.token);
                            // console.log(JSON.parse(localStorage.loginUser));
                        } else {
                            this.error = "İstifadəçi adı vəya şifrə yanlışdır!"
                        }
                        // this.$router.replace('/login');
                    }).catch((error) => {
                        this.error = "İstifadəçi adı vəya şifrə yanlışdır!"
                        console.log(error);
                    });
                }


            },
            logout: function () {
                localStorage.removeItem('user');
            }
        }
    };

</script>

<style scoped lang="css">
    .login {
        position: absolute;
        top: 0;
        bottom: 0;
        height: 100%;
        width: 100%;
        background: #444444;
        overflow: hidden;
    }
    .panel-header {
        font-size: 20px;
    }
    .login-button-container {
        margin-right: 15px;
    }
    .login-button-container button {
        font-size: 16px;
    }
    .remmember-me {
        margin-left: 15px;
        margin-top: 8px;
    }
    .container-box {
        margin-top: 15%;
    }
    .p-inputgroup {
        margin: 16px 15px 19px 15px;
        font-size: 16px;
    }
    body .p-panel .p-panel-titlebar {
        font-size: 20px;
    }
    body .p-inputtext {
        font-size: 16px;
    }
</style>
