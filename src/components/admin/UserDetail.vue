<template>
    <div class="p-grid">
        <div class="p-col-12">
            <h1>Kateqoriya</h1>
            <div class="dash-container">
                <div class="p-col-12" v-if="validation.message">
                    <Message severity="error">{{validation.message}}</Message>
                </div>

<!--                <div class="p-col-12" v-if="!this.user">-->
<!--                    <div style="height: 220px;"></div>-->
<!--                    <div style="text-align: center">-->
<!--                        <ProgressSpinner v-if="!this.user && !validation.message"/>-->
<!--                    </div>-->
<!--                    <div style="height: 280px;"></div>-->
<!--                </div>-->

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
                                <label>Aktiv</label>
                            </div>
                            <div class="p-col-12 p-md-3 p-lg-3">
                                <InputSwitch v-model="user.isActive"/>
                            </div>
                        </div>

                        <div class="p-grid">
                            <div class="p-col-12 p-md-1 p-lg-1">
                                <label>Mail</label>
                            </div>
                            <div class="p-col-12 p-md-4 p-lg-4">
                                <InputText class="full-width" v-model="user.mail"/>
                            </div>
                            <div class="p-col-12 p-md-2 p-lg-2">

                            </div>
                            <div class="p-col-12 p-md-3 p-lg-3">

                            </div>
                        </div>


                        <div class="p-grid">
                            <div class="p-col-12 p-md-1 p-lg-1">
                                <label>Parol</label>
                            </div>
                            <div class="p-col-12 p-md-4 p-lg-4">
                                <Password  class="full-width"  v-model="user.password"/>
                            </div>

                            <div class="p-col-12 p-md-1 p-lg-1">

                            </div>
                            <div class="p-col-12 p-md-1 p-lg-1">

                            </div>
                            <div class="p-col-12 p-md-4 p-lg-4">

                            </div>
                        </div>





                        <div class="empty20"></div>

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
                parentuser: null,
                validation: {
                    message: '',
                    messageType: 'error',
                    image: '',
                    surname: false,
                    name: false,
                    username: false,
                },
                parentuserOption: null
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
                this.user = 1
                // let id = this.$route.params.id;
                //
                // axios.get(appOptions.apiUrl + 'categories/get/select').then(response => {
                //     this.parentuserOption = response.data.body.categories;
                //     this.loading = false
                //     // delete a.Prop1;
                //     // eslint-disable-next-line no-unused-vars
                // }).catch((error) => {
                //     this.loading = false
                //     this.validation.message = 'Servere bağlanmaq mümkün olmadı. Yenidən yoxlamaq üçün səhifəni yeniləyin.';
                // });
                //
                // if (id === undefined){ // add user
                //     axios.get(appOptions.apiUrl + 'user/get/model').then(response => {
                //         this.user = response.data;
                //         this.createDate = new Date();
                //         this.updateDate = new Date();
                //         this.loading = false
                //         // eslint-disable-next-line no-unused-vars
                //     }).catch((error) => {
                //         this.loading = false;
                //         this.validation.message = 'Servere bağlanmaq mümkün olmadı. Yenidən yoxlamaq üçün səhifəni yeniləyin. Xəta: '+error;
                //     });
                // }  else { // edit user
                //     axios.get(appOptions.apiUrl + 'user/get/id/'+id).then(response => {
                //         this.loading = false;
                //         if(response.data.problem === undefined){
                //             this.user = response.data.body.user;
                //             this.parentuser = this.user.parentuser;
                //             this.createDate = new Date(this.user.createDate);
                //             this.updateDate = new Date(this.user.updateDate);
                //             this.link = this.user.link;
                //         } else {
                //             this.validation.message = 'Məzmun tapılmadı.';
                //         }
                //     }).catch((error) => {
                //         this.loading = false
                //         this.validation.message = 'Servere bağlanmaq mümkün olmadı. Yenidən yoxlamaq üçün səhifəni yeniləyin. Xəta: '+error;
                //     });
                // }
            },
            handleSave: function () {
                if (this.user.title === '') {
                    this.validation.title = true;
                    return false;
                }
                if (this.user.name === '') {
                    this.validation.name = true;
                    return false;
                }
                if (this.link === '') {
                    this.validation.link = true;
                    return false;
                }

                if (this.user.title === '') {
                    this.validation.link = true;
                    return false;
                }

                this.saveuser();

            },
            saveuser() {
                this.user.parentuser = this.parentuser;
                this.user.createDate = moment(this.user.crDate).format('YYYY-MM-DD HH:mm:ss');
                this.user.updateDate = moment(this.user.upDate).format('YYYY-MM-DD HH:mm:ss');
                this.user.link = this.link;
                let options = {
                    url: appOptions.apiUrl + 'user/save',
                    method: 'POST',
                    headers: appOptions.jsonHeader,
                    data: this.user
                };
                // eslint-disable-next-line no-unused-vars
                axios(options).then((res) => {
                    this.$router.replace('/dashboard/categories');
                }).catch((error) => {
                    console.log(error);
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
</style>
