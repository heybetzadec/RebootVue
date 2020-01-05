<template>
    <div class="p-grid">
        <div class="p-col-12">
            <h1>Məzmun</h1>
            <div class="dash-container">
                <div class="p-col-12" v-if="validation.message">
                    <Message severity="error">{{validation.message}}</Message>
                </div>

                <div class="p-col-12" v-if="!this.content">
                    <div style="height: 220px;"></div>
                    <div style="text-align: center">
                        <ProgressSpinner v-if="!this.content && !validation.message"/>
                    </div>
                    <div style="height: 280px;"></div>
                </div>

                <div class="p-col-12" v-if="this.content">

                    <div class="card card-w-title edit-data">

                        <div class="p-grid">
                            <div class="p-col-12 p-md-1 p-lg-1">
                                <label>Başlıq</label>
                            </div>
                            <div class="p-col-12 p-md-4 p-lg-4">
                                <InputText class="full-width"  v-on:input="titleChange()"  v-model="content.title"/>
                            </div>

                            <div class="p-col-12 p-md-1 p-lg-1">
                                <ValidationMessage v-if="this.validation.title"></ValidationMessage>
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
                                <label>Link</label>
                            </div>
                            <div class="p-col-12 p-md-4 p-lg-4">
                                <InputText class="full-width"  v-on:input="linkChange()" v-model="link" />
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
                                <label>Kateqoria</label>
                            </div>
                            <div class="p-col-12 p-md-4 p-lg-4">
                                <MultiSelect style="width: 100%" v-model="multiselectedCategories" :options="multiselectCategries"
                                             optionLabel="name" placeholder="---"/>
                            </div>
                            <div class="p-col-12 p-md-1 p-lg-1">
                                <ValidationMessage v-if="this.validation.category"></ValidationMessage>
                            </div>
                            <div class="p-col-12 p-md-2 p-lg-2">
                                <label>Yayımla</label>
                            </div>
                            <div class="p-col-12 p-md-3 p-lg-3">
                                <InputSwitch v-model="content.visible"/>
                            </div>
                        </div>

                        <div class="p-grid">
                            <div class="p-col-12 p-md-1 p-lg-1">
                                <label>Etiketlər</label>
                            </div>
                            <div class="p-col-12 p-md-4 p-lg-4">
                                <Chips  class="full-width" v-model="tags" />
                            </div>
                            <div class="p-col-12 p-md-1 p-lg-1">
                                <Button icon="pi pi-arrow-left" class="p-button-secondary empty_left5" @click="keywordsToTag()" />
                                <Button icon="pi pi-arrow-right" class="p-button-secondary empty_left5" @click="tagsToKeyword()"/>
                            </div>
                            <div class="p-col-12 p-md-1 p-lg-1">
                                <label>Açar sözlər </label>
                            </div>
                            <div class="p-col-12 p-md-4 p-lg-4">
                                <InputText class="full-width"  v-model="content.keyword"/>
                            </div>
                        </div>

                        <div class="p-grid">
                            <div class="p-col-12 p-md-1 p-lg-1">
                                <label>Embed</label>
                            </div>
                            <div class="p-col-12 p-md-4 p-lg-4">
                                <Textarea class="full-width" pla v-model="content.embed" rows="5" cols="30"/>
                            </div>

                            <div class="p-col-12 p-md-1 p-lg-1">

                            </div>
                            <div class="p-col-12 p-md-1 p-lg-1">
                                <label>Açıqlama</label>
                            </div>
                            <div class="p-col-12 p-md-4 p-lg-4">
                                <Textarea  class="full-width" pla v-model="content.description" rows="5" cols="30"/>
                            </div>
                        </div>

                        <div class="p-grid">
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
                            <div class="p-col-12 p-md-1 p-lg-1">
                            </div>
                            <div class="p-col-12 p-md-4 p-lg-4">
                                <img id="preview_image" v-bind:src="imgUrl" style="width: 100%">
                            </div>
                        </div>

                        <h1>Məzmun</h1>

                        <ValidationMessage style="width: 100%" v-if="validation.html">{{validation.html}}</ValidationMessage>
                        <Editor v-model="content.html" editorStyle="height: 320px"/>

                        <div class="empty20"></div>

                        <div class="p-grid">
                            <div class="p-col-8">
                                <ProgressBar v-if="indeterminate" mode="indeterminate"/>
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
        data() {
            return {
                link:null,
                imgUrl:'',
                oldImage:'',
                disableUpdateDate:false,
                selectedFile: null,
                content: null,
                createDate: null,
                updateDate: null,
                tags:null,
                loading:true,
                indeterminate: false,
                multiselectedCategories: null,
                validation: {
                    message: '',
                    messageType: 'error',
                    image: '',
                    html: '',
                    title: false,
                    link: false,
                    category: false
                },
                multiselectCategries: null
            };
        },
        mounted: function () {
            this.loadModel();
        },
        methods: {
            tagsToKeyword()   {
                var keywords = '';
                for (let i in this.tags) {
                    if (keywords === ''){
                        keywords = this.tags[i];
                    } else {
                        keywords = keywords+','+this.tags[i];
                    }
                }
                this.content.keyword = keywords;
            },
            keywordsToTag(){
                this.tags = this.content.keyword.split(',');
            },
            linkChange(){
                this.link = Functions.sef_link(this.link);
            },
            titleChange(){
                this.link = Functions.sef_link(this.content.title);
            },
            loadModel() {
                let id = this.$route.params.id;

                axios.get(appOptions.apiUrl + 'categories/get/select/id/0').then(response => {
                    this.multiselectCategries = response.data.body.categories;
                    this.loading = false
                    // eslint-disable-next-line no-unused-vars
                }).catch((error) => {
                    this.loading = false;
                    this.validation.message = 'Servere bağlanmaq mümkün olmadı. Yenidən yoxlamaq üçün səhifəni yeniləyin.';
                });

                if (id === undefined){ // add content
                    axios.get(appOptions.apiUrl + 'content/get/model').then(response => {
                        this.content = response.data;
                        this.createDate = new Date();
                        this.updateDate = new Date();
                        this.loading = false
                        // eslint-disable-next-line no-unused-vars
                    }).catch((error) => {
                        console.log(error);
                        this.loading = false;
                        this.validation.message = 'Servere bağlanmaq mümkün olmadı. Yenidən yoxlamaq üçün səhifəni yeniləyin. Xəta: '+error;
                    });
                }  else { // edit content
                    axios.get(appOptions.apiUrl + 'content/get/id/'+id).then(response => {
                        this.loading = false;
                        if(response.data.status === 'OK'){
                            this.content = response.data.body.content;
                            console.log(this.content);
                            // let preview = document.querySelector('#preview_image');
                            this.imgUrl = appOptions.apiUrl + 'media/' + this.content.imageName;
                            this.oldImage = this.content.imageName;
                            this.link = this.content.link;
                            this.createDate = new Date(this.content.createDate);
                            this.updateDate = new Date(this.content.updateDate);
                            this.multiselectedCategories = this.content.categories;
                            this.tags = [];
                            for (let i in this.content.tags) {
                                this.tags.push(this.content.tags[i].name)
                            }
                        } else {
                            this.validation.message = 'Məzmun tapılmadı.';
                        }
                    }).catch((error) => {
                        console.log(error);
                        this.loading = false;
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
                this.indeterminate = true;
                // this.validation.title = false;
                // this.validation.link = false;
                // this.validation.content = '';
                // this.validation.category = false;

                var r = false;
                if (this.content.title === '') {
                    this.validation.title = true;
                    this.indeterminate = false;
                    console.log('title empty');
                    r =  true;
                } else {
                    this.validation.title = false;
                }
                if (this.link === '') {
                    this.validation.link = true;
                    this.indeterminate = false;
                    console.log('link empty');
                    r =  true;
                } else {
                    this.validation.link = false;
                }

                if (this.content.html === undefined) {
                    this.validation.html = 'Məzmun daxil edin!';
                    this.indeterminate = false;
                    console.log('content empty');
                    r =  true;
                } else {
                    this.validation.html = '';
                }
                if (this.multiselectedCategories === null) {
                    this.validation.category = true;
                    this.indeterminate = false;
                    console.log('multiselectedCategories empty');
                    r =  true;
                } else {
                    this.validation.category = false;
                }

                if (r){
                    return null;
                }

                if (this.selectedFile !== null) {
                    let d = new Date();
                    let n = d.getTime();
                    let pref = n.toString().substr(8, n.length);
                    const fd = new FormData();
                    this.content.imageName = pref + '_' + this.selectedFile.name;
                    fd.append('file', this.selectedFile, this.content.imageName);
                    fd.append('oldImage', this.oldImage);
                    let options = {
                        url: appOptions.apiSecureUrl + 'content/upload/img',
                        method: 'POST',
                        headers: appOptions.multipartHeader,
                        data: fd
                    };
                    // eslint-disable-next-line no-unused-vars
                    axios(options).then((res) => {
                        this.saveContent();
                        // eslint-disable-next-line no-unused-vars
                    }).catch((error) => {
                        this.indeterminate = false;
                        console.log(error);
                        this.content.imageName = null;
                    });
                } else {
                    this.saveContent();
                }
            },
            saveContent() {

                if (this.content.imageName === '') {
                    this.validation.image = 'Şəkil seçin.';
                    this.indeterminate = false;
                    return null;
                }

                this.content.categories = this.multiselectedCategories;
                this.content.createDate = moment(this.content.crDate).format('YYYY-MM-DD HH:mm:ss');
                this.content.updateDate = moment(this.content.upDate).format('YYYY-MM-DD HH:mm:ss');
                this.content.link = this.link;

                var tagObject = [];
                for (let i in this.tags) {
                    tagObject.push({name: this.tags[i], link: Functions.sef_link(this.tags[i])})
                }
                this.content.tags = tagObject;
                let options = {
                    url: appOptions.apiSecureUrl + 'content/save',
                    method: 'POST',
                    headers: appOptions.jsonHeaderToken,
                    data: this.content
                };
                console.log(this.content);
                // eslint-disable-next-line no-unused-vars
                axios(options).then((res) => {
                    this.indeterminate = false;
                    this.$router.replace(appOptions.adminPath+'/contents');
                }).catch((error) => {
                    this.indeterminate = false;
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
    /*.p-component {*/
    /*    width: 100%;*/
    /*}*/
    .p-inputwrapper-filled {
        width: 100%;
    }
    /*.full-width .p-component {*/
    /*    width: 100%!important;*/
    /*}*/
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
