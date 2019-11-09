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
                                <MultiSelect class="full-width" v-model="multiselectedCategories" :options="multiselectCategries"
                                             optionLabel="name" placeholder="Kateqoria"/>
                            </div>
                            <div class="p-col-12 p-md-1 p-lg-1">

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
                        <Editor v-model="content.html" editorStyle="height: 320px"/>

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
                multiselectedCategories: null,
                validation: {
                    message: '',
                    messageType: 'error',
                    image: '',
                    title: false,
                    link: false,
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
                // console.log(this.link);
            },
            titleChange(){
                this.link = Functions.sef_link(this.content.title);
            },
            loadModel() {
                let id = this.$route.params.id;

                axios.get(appOptions.apiUrl + 'categories/get/select').then(response => {
                    this.multiselectCategries = response.data.body.categories;
                    console.log( this.multiselectCategries);
                    this.loading = false
                    // delete a.Prop1;
                    // eslint-disable-next-line no-unused-vars
                }).catch((error) => {
                    this.loading = false
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
                        this.loading = false;
                        this.validation.message = 'Servere bağlanmaq mümkün olmadı. Yenidən yoxlamaq üçün səhifəni yeniləyin. Xəta: '+error;
                    });
                }  else { // edit content
                    axios.get(appOptions.apiUrl + 'content/get/id/'+id).then(response => {
                        this.loading = false;
                        if(response.data.problem === undefined){
                            this.content = response.data.body.content;
                            // let preview = document.querySelector('#preview_image');
                            this.imgUrl = appOptions.apiUrl + 'media/' + this.content.imageName;
                            this.oldImage = this.content.imageName;
                            this.link = this.content.link;
                        } else {
                            this.validation.message = 'Məzmun tapılmadı.';
                        }
                    }).catch((error) => {
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
                if (this.content.title === '') {
                    this.validation.title = true;
                    return false;
                }
                if (this.link === '') {
                    this.validation.link = true;
                    return false;
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
                        url: appOptions.apiUrl + 'content/upload/img',
                        method: 'POST',
                        headers: appOptions.multipartHeader,
                        data: fd
                    };
                    // eslint-disable-next-line no-unused-vars
                    axios(options).then((res) => {
                        this.saveContent();
                        // eslint-disable-next-line no-unused-vars
                    }).catch((error) => {
                        console.log(error);
                        this.content.imageName = null;
                    });
                } else {
                    this.saveContent();
                }
            },
            saveContent() {
                this.content.categories = this.multiselectedCategories;
                this.content.createDate = moment(this.content.crDate).format('YYYY-MM-DD HH:mm:ss');
                this.content.updateDate = moment(this.content.upDate).format('YYYY-MM-DD HH:mm:ss');
                this.content.link = this.link;
                let options = {
                    url: appOptions.apiUrl + 'content/add',
                    method: 'POST',
                    headers: appOptions.jsonHeader,
                    data: this.content
                };
                // eslint-disable-next-line no-unused-vars
                axios(options).then((res) => {
                    this.$router.replace('/dashboard/contents');
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
