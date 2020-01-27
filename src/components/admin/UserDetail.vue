<template>
    <div class="p-grid">
        <div class="p-col-12">
            <h1>İstifadəçi</h1>
            <div class="dash-container">
                <div class="p-col-12" v-if="validation.message">
                    <Message severity="error">{{validation.message}}</Message>
                </div>
                <div class="p-col-12 full-card" v-if="this.user">
                    <div class="card card-w-title edit-data">

                        <div class="p-grid">
                            <div class="p-col-12 p-md-1 p-lg-1">
                                <label>Ad</label>
                            </div>
                            <div class="p-col-12 p-md-4 p-lg-4">
                                <InputText class="full-width"  v-on:input="nameChange()"  v-model="user.name"/>
                            </div>

                            <div class="p-col-12 p-md-1 p-lg-1">
                                <ValidationMessage v-if="this.validation.name"></ValidationMessage>
                            </div>
                            <div class="p-col-12 p-md-2 p-lg-2">
                                <label>Əlavə edilmə zamanı</label>
                            </div>
                            <div class="p-col-12 p-md-3 p-lg-3">
                                <Calendar class="full-width" v-model="createDate" :showTime="true" :showSeconds="true" dateFormat="yy-mm-dd"/>
                            </div>
                        </div>

                        <div class="p-grid">
                            <div class="p-col-12 p-md-1 p-lg-1">
                                <label>Soyad</label>
                            </div>
                            <div class="p-col-12 p-md-4 p-lg-4">
                                <InputText class="full-width" v-model="user.surname" />
                            </div>
                            <div class="p-col-12 p-md-1 p-lg-1">
                                <ValidationMessage v-if="this.validation.surname"></ValidationMessage>
                            </div>
                            <div class="p-col-12 p-md-2 p-lg-2">
                                <label>Redaktə edilmə zamanı</label>
                            </div>
                            <div class="p-col-12 p-md-3 p-lg-3">
                                <Calendar class="full-width" :disabled="disableUpdateDate" v-model="updateDate" :showTime="true" :showSeconds="true"
                                          dateFormat="yy-mm-dd"/>
                            </div>
                        </div>

                        <div class="p-grid">
                            <div class="p-col-12 p-md-1 p-lg-1">
                                <label>İstifadəçi adı</label>
                            </div>
                            <div class="p-col-12 p-md-4 p-lg-4">
                                <InputText class="full-width"  v-on:input="usernameChange()" v-model="username" />
                            </div>
                            <div class="p-col-12 p-md-1 p-lg-1">
                                <ValidationMessage v-if="this.validation.username"></ValidationMessage>
                            </div>
                            <div class="p-col-12 p-md-2 p-lg-2">
                                <label>Rol</label>
                            </div>
                            <div class="p-col-12 p-md-3 p-lg-3">
                                <Dropdown style="width: 100%" v-model="selectedRole" :options="roles" optionLabel="name" placeholder="---"/>
                            </div>
                            <div class="p-col-12 p-md-1 p-lg-1">
                                <ValidationMessage v-if="this.validation.role"></ValidationMessage>
                            </div>
                        </div>


                        <div class="p-grid">
                            <div class="p-col-12 p-md-1 p-lg-1">
                                <label>Mail</label>
                            </div>
                            <div class="p-col-12 p-md-4 p-lg-4">
                                <InputText class="full-width" v-model="user.mail"/>
                            </div>
                            <div class="p-col-12 p-md-1 p-lg-1">
                                <ValidationMessage v-if="this.validation.mail"></ValidationMessage>
                            </div>
                            <div class="p-col-12 p-md-2 p-lg-2">
                                <label>Aktiv</label>
                            </div>
                            <div class="p-col-12 p-md-3 p-lg-3">
                                <InputSwitch v-model="user.active"/>
                            </div>
                        </div>


                        <div class="p-grid">
                            <div class="p-col-12 p-md-1 p-lg-1">
                                <label>Parol</label>
                            </div>
                            <div class="p-col-12 p-md-4 p-lg-4">
                                <Password  class="full-width"  v-model="password"/>
                            </div>

                            <div class="p-col-12 p-md-1 p-lg-1">
                                <ValidationMessage v-if="this.validation.password"></ValidationMessage>
                            </div>
                            <div class="p-col-12 p-md-1 p-lg-1">

                            </div>
                            <div class="p-col-12 p-md-4 p-lg-4">

                            </div>
                        </div>


                        <div class="p-grid">
                            <div class="p-col-12 p-md-1 p-lg-1">
                                <label>Parolu təkrarlayın</label>
                            </div>
                            <div class="p-col-12 p-md-4 p-lg-4">
                                <Password  class="full-width"  v-model="repassword"/>
                            </div>

                            <div class="p-col-12 p-md-1 p-lg-1">
                                <ValidationMessage v-if="this.validation.password"></ValidationMessage>
                            </div>
                            <div class="p-col-12 p-md-1 p-lg-1">

                            </div>
                            <div class="p-col-12 p-md-4 p-lg-4">

                            </div>
                        </div>


                        <div class="p-grid upload-container">
                            <div class="p-col-12 p-md-1 p-lg-1">

                            </div>
                            <div class="p-col-12 p-md-2 p-lg-2" id="upload_container">
                                <div class="upload-btn-wrapper">
                                    <Button label="Şəkil seç" icon="pi pi-image"/>
                                    <input type="file" @change="previewFile($event)"
                                           accept="image/x-png,image/gif,image/jpeg">
                                </div>
                            </div>
                            <div class="p-col-12 p-md-3 p-lg-3 file-message">
                                <ValidationMessage v-if="validation.image">{{validation.image}}</ValidationMessage>
                            </div>
                            <div class="p-col-12 p-md-2 p-lg-2">
                            </div>
                            <div class="p-col-12 p-md-3 p-lg-3">
                                <img id="preview_image" v-bind:src="imgUrl" style="width: 100%">
                            </div>
                        </div>

                        <div class="empty40"></div>

                        <div class="p-grid">
                            <div class="p-col-8">

                            </div>
                            <div class="p-col-2">
                                <Button label="Geri" class="p-button-danger full-width" @click="$router.go(-1)"/>
                            </div>
                            <div class="p-col-2">
                                <Button label="Saxla" class="p-button-success full-width" @click="handleSave()"/>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {appOptions} from "../../model/Variables";
    import {Functions} from "../../model/Functions";
    // import { axios } from "axios";

    let moment = require('moment');
    let axios = require('axios');
    export default {
        name: "userDetail",
        data() {
            return {
                username:'',
                imgUrl:'',
                oldImage:'',
                disableUpdateDate:false,
                selectedFile: null,
                user: null,
                createDate: null,
                updateDate: null,
                tags:null,
                loading:true,
                password:'',
                repassword:'',
                validation: {
                    message: '',
                    messageType: 'error',
                    image: '',
                    surname: false,
                    name: false,
                    mail:false,
                    password:false,
                    username: false,
                    role: false
                },
                selectedRole:null,
                roles:null
            };
        },
        mounted: function () {
            this.loadModel();
        },
        methods: {
            usernameChange(){
                this.username = Functions.sef_link(this.username);
                // console.log(this.link);
            },
            nameChange(){
                this.username = Functions.sef_link(this.user.name);
            },
            loadModel() {
                this.user = 1;
                let id = this.$route.params.id;

                axios.get(appOptions.apiUrl + 'roles/get/select/id/0').then(response => {
                    this.roles = response.data.body.roles;
                    // eslint-disable-next-line no-unused-vars
                }).catch((error) => {
                    this.validation.message = 'Servere bağlanmaq mümkün olmadı. Yenidən yoxlamaq üçün səhifəni yeniləyin.';
                });

                if (id === undefined){ // add user
                    axios.get(appOptions.apiUrl + 'user/get/model').then(response => {
                        this.user = response.data;
                        this.createDate = new Date();
                        this.updateDate = new Date();
                        this.loading = false;
                        // this.user.active = true;
                        // eslint-disable-next-line no-unused-vars
                    }).catch((error) => {
                        this.loading = true;
                        this.validation.message = 'Servere bağlanmaq mümkün olmadı. Yenidən yoxlamaq üçün səhifəni yeniləyin. Xəta: '+error;
                    });
                }  else { // edit user
                    axios.get(appOptions.apiUrl + 'user/get/id/'+id).then(response => {
                        this.loading = false;
                        if(response.data.status === 'OK'){
                            this.user = response.data.body.user;
                            this.username = this.user.username;
                            this.selectedRole = this.user.userRole;
                            this.createDate = new Date(this.user.createDate);
                            this.updateDate = new Date(this.user.updateDate);
                        } else {
                            this.validation.message = 'Məzmun tapılmadı.';
                        }
                    }).catch((error) => {
                        this.loading = false
                        this.validation.message = 'Servere bağlanmaq mümkün olmadı. Yenidən yoxlamaq üçün səhifəni yeniləyin. Xəta: '+error;
                    });
                }
            },
            previewFile(event) {
                this.selectedFile = event.target.files[0];
                let types = ['image/x-png', 'image/gif', 'image/jpeg', 'image/png'];
                if (!types.includes(this.selectedFile.type)) {
                    event.target.value = '';
                    this.validation.image = 'Şəkil formatlı fayl seçin';
                } else {
                    let preview = document.querySelector('#preview_image');
                    let file = document.querySelector('input[type=file]').files[0];
                    let reader = new FileReader();
                    reader.addEventListener("load", function () {
                        preview.src = reader.result;
                    }, false);
                    if (file) {
                        reader.readAsDataURL(file);
                    }
                }
            },
            handleSave: function () {
                this.validation.name = false;
                this.validation.username = false;
                this.validation.surname = false;
                this.validation.password = false;
                this.validation.role = false;
                this.validation.mail = false;
                var r = false;
                if (this.user.name == ''){
                    this.validation.name = true;
                    r =  true;
                }
                if (this.username.length < 4  && this.user.mail.length < 4) {
                    this.validation.mail = true;
                    this.validation.username = true;
                    r =  true;
                } else if (this.user.mail.length > 4 && !this.user.mail.includes('@')) {
                    this.validation.mail = true;
                    r =  true;
                }
                if (this.user.id === null){
                    if (this.password !== this.repassword || this.password.length < 4){
                        this.validation.password = true;
                        r =  true;
                    }
                }

                if (this.selectedRole === null) {
                    this.validation.role = true;
                    r =  true;
                }
                if (r){
                    return null;
                }

                if (this.selectedFile !== null){
                    this.uploadLogo();
                } else {
                    this.saveUser();
                }
            },
            uploadLogo(){
                const fd = new FormData();
                var pref = '';
                if (this.user.mail === ''){
                    pref = this.user.username;
                } else {
                    pref = this.user.mail.substring(0, this.user.mail.indexOf('@'));
                }
                this.user.imageName = pref + '_' + this.selectedFile.name;
                fd.append('file', this.selectedFile, this.user.imageName);
                fd.append('oldImage', this.oldImage);
                let options = {
                    url: appOptions.apiSecureUrl + 'user/upload/img',
                    method: 'POST',
                    headers: appOptions.multipartHeader,
                    data: fd
                };
                // eslint-disable-next-line no-unused-vars
                axios(options).then((res) => {
                    this.saveUser();
                    // eslint-disable-next-line no-unused-vars
                }).catch((error) => {
                    this.indeterminate = false;
                    this.user.imageName = null;
                    this.validation.image = 'Şəkil yüklənmədi!';
                });
            },
            saveUser() {
                this.user.username = this.username;
                this.user.userRole = this.selectedRole;
                this.user.createDate = moment(this.user.crDate).format('YYYY-MM-DD HH:mm:ss');
                this.user.updateDate = moment(this.user.upDate).format('YYYY-MM-DD HH:mm:ss');
                this.user.link = this.link;
                let options = {
                    url: appOptions.apiSecureUrl + 'user/save',
                    method: 'POST',
                    headers: appOptions.jsonHeaderToken,
                    data: this.user
                };
                // eslint-disable-next-line no-unused-vars
                axios(options).then((res) => {
                    if (res.data.status === 'OK'){
                        this.$router.replace('/dashboard/users');
                    }
                    if (res.data.status === 'NOT_ACCEPTABLE'){
                        this.validation.message = res.data.problem.message;
                    } else {
                        console.log(res);
                        this.validation.message = 'Saxlanılma zamanı problem yarandı.';
                    }
                }).catch((error) => {
                    console.log(error);
                    this.validation.message = 'Saxlanılma zamanı problem yarandı.';
                });
            }
        }
    };
</script>
<style scoped lang="css">
    .full-width{
        width: 100%;
    }
</style>
<style lang="css">
    .full-card{
        min-height: 615px;
    }
    .p-inputwrapper-filled {
        width: 100%;
    }
    /*.full-width .p-component {*/
    /*    width: 100%!important;*/
    /*}*/
    .full-width .p-component {
        width: 100%;
    }
    .full-width .p-inputtext {
        width: 100%!important;
    }
    body .p-chips > ul.p-inputtext .p-chips-token{
        margin-bottom: 1px;
    }
    .p-calendar .p-component {
        width: unset;
    }
    .p-fileupload-buttonbar .p-component {
        width: unset;
    }
    .edit-data .p-grid {
        margin-bottom: 15px;
    }
    .p-fileupload-files img {
        width: 250px;
    }
    .upload-btn-wrapper {
        position: relative;
        overflow: hidden;
        display: inline-block;
    }
    .upload-btn-wrapper input[type=file] {
        font-size: 100px;
        position: absolute;
        left: 0;
        top: 0;
        opacity: 0;
    }
    .file-message .p-messages {
        height: 60px;
    }
    .file-message .p-messages-error {
        margin-top: 30px;
    }
    img#preview_image {
        max-width: 200px;
    }

    .upload-container{
        min-height: 230px;
    }
</style>
