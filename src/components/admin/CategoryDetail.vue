<template>
    <div class="p-grid">
        <div class="p-col-12">
            <h1>Kateqoriya</h1>
            <div class="dash-container">
                <div class="p-col-12" v-if="validation.message">
                    <Message severity="error">{{validation.message}}</Message>
                </div>

                <div class="p-col-12" v-if="!this.category">
                    <div style="height: 220px;"></div>
                    <div style="text-align: center">
                        <ProgressSpinner v-if="!this.category && !validation.message"/>
                    </div>
                    <div style="height: 280px;"></div>
                </div>

                <div class="p-col-12 full-card" v-if="this.category">

                    <div class="card card-w-title edit-data">

                        <div class="p-grid">
                            <div class="p-col-12 p-md-1 p-lg-1">
                                <label>Ad</label>
                            </div>
                            <div class="p-col-12 p-md-4 p-lg-4">
                                <InputText class="full-width"  v-on:input="nameChange()"  v-model="category.name"/>
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
                                <label>Başlıq</label>
                            </div>
                            <div class="p-col-12 p-md-4 p-lg-4">
                                <InputText class="full-width" v-model="category.title" />
                            </div>
                            <div class="p-col-12 p-md-1 p-lg-1">
                                <ValidationMessage v-if="this.validation.title"></ValidationMessage>
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
                                <label>Link</label>
                            </div>
                            <div class="p-col-12 p-md-4 p-lg-4">
                                <InputText class="full-width"  v-on:input="linkChange()" v-model="link" />
                            </div>
                            <div class="p-col-12 p-md-1 p-lg-1">
                                <ValidationMessage v-if="this.validation.link"></ValidationMessage>
                            </div>
                            <div class="p-col-12 p-md-2 p-lg-2">
                                <label>Yayımla</label>
                            </div>
                            <div class="p-col-12 p-md-3 p-lg-3">
                                <InputSwitch v-model="category.visible"/>
                            </div>
                        </div>

                        <div class="p-grid">
                            <div class="p-col-12 p-md-1 p-lg-1">
                                <label>Üst kateqoria</label>
                            </div>
                            <div class="p-col-12 p-md-4 p-lg-4">
                                <Dropdown class="full-width" v-model="parentCategory" :options="parentCategoryOption" optionLabel="name" placeholder="Seç" :showClear="true"/>
                            </div>
                            <div class="p-col-12 p-md-1 p-lg-1">

                            </div>
                            <div class="p-col-12 p-md-1 p-lg-1">

                            </div>
                            <div class="p-col-12 p-md-4 p-lg-4">

                            </div>
                        </div>


                        <div class="p-grid">
                            <div class="p-col-12 p-md-1 p-lg-1">
                                <label>Açar sözlər </label>
                            </div>
                            <div class="p-col-12 p-md-4 p-lg-4">
                                <InputText class="full-width"  v-model="category.keyword"/>
                            </div>

                            <div class="p-col-12 p-md-1 p-lg-1">

                            </div>
                            <div class="p-col-12 p-md-1 p-lg-1">

                            </div>
                            <div class="p-col-12 p-md-4 p-lg-4">

                            </div>
                        </div>




                        <div class="p-grid">
                            <div class="p-col-12 p-md-1 p-lg-1">
                                <label>Açıqlama</label>
                            </div>
                            <div class="p-col-12 p-md-4 p-lg-4">
                                <Textarea  class="full-width" pla v-model="category.description" rows="5" cols="30"/>
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
        name: "CategoryDetail",
        data() {
            return {
                link:'',
                imgUrl:'',
                oldImage:'',
                disableUpdateDate:false,
                selectedFile: null,
                category: null,
                createDate: null,
                updateDate: null,
                tags:null,
                loading:true,
                parentCategory: null,
                validation: {
                    message: '',
                    messageType: 'error',
                    image: '',
                    title: false,
                    name: false,
                    link: false,
                },
                parentCategoryOption: null
            };
        },
        mounted: function () {
            this.loadModel();
        },
        methods: {
            linkChange(){
                this.link = Functions.sef_link(this.link);
                // console.log(this.link);
            },
            nameChange(){
                this.link = Functions.sef_link(this.category.name);
            },
            loadModel() {
                let id = this.$route.params.id;

                axios.get(appOptions.apiSecureUrl + 'categories/get/select').then(response => {
                    this.parentCategoryOption = response.data.body.categories;
                    this.loading = false
                    // delete a.Prop1;
                    // eslint-disable-next-line no-unused-vars
                }).catch((error) => {
                    this.loading = false
                    this.validation.message = 'Servere bağlanmaq mümkün olmadı. Yenidən yoxlamaq üçün səhifəni yeniləyin.';
                });

                if (id === undefined){ // add category
                    axios.get(appOptions.apiSecureUrl + 'category/get/model').then(response => {
                        this.category = response.data;
                        this.createDate = new Date();
                        this.updateDate = new Date();
                        this.loading = false
                        // eslint-disable-next-line no-unused-vars
                    }).catch((error) => {
                        this.loading = false;
                        this.validation.message = 'Servere bağlanmaq mümkün olmadı. Yenidən yoxlamaq üçün səhifəni yeniləyin. Xəta: '+error;
                    });
                }  else { // edit category
                    axios.get(appOptions.apiSecureUrl + 'category/get/id/'+id).then(response => {
                        this.loading = false;
                        if(response.data.problem === undefined){
                            this.category = response.data.body.category;
                            this.parentCategory = this.category.parentCategory;
                                this.createDate = new Date(this.category.createDate);
                            this.updateDate = new Date(this.category.updateDate);
                            this.link = this.category.link;
                        } else {
                            this.validation.message = 'Məzmun tapılmadı.';
                        }
                    }).catch((error) => {
                        this.loading = false
                        this.validation.message = 'Servere bağlanmaq mümkün olmadı. Yenidən yoxlamaq üçün səhifəni yeniləyin. Xəta: '+error;
                    });
                }
            },
            handleSave: function () {
                if (this.category.title === '') {
                    this.validation.title = true;
                    return false;
                }
                if (this.category.name === '') {
                    this.validation.name = true;
                    return false;
                }
                if (this.link === '') {
                    this.validation.link = true;
                    return false;
                }

                if (this.category.title === '') {
                    this.validation.link = true;
                    return false;
                }

                this.saveCategory();

            },
            saveCategory() {
                this.category.parentCategory = this.parentCategory;
                this.category.createDate = moment(this.category.crDate).format('YYYY-MM-DD HH:mm:ss');
                this.category.updateDate = moment(this.category.upDate).format('YYYY-MM-DD HH:mm:ss');
                this.category.link = this.link;
                let options = {
                    url: appOptions.apiSecureUrl + 'category/save',
                    method: 'POST',
                    headers: appOptions.jsonHeaderToken,
                    data: this.category
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
