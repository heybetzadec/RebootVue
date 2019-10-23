<template>
    <div class="p-grid">
        <div class="p-col-12">
            <h1>Yeni slayder</h1>
            <div class="dash-container">
                <div class="p-col-12" v-if="validation.error_message">
                    <Message severity="error">{{validation.error_message}}</Message>
                </div>
                <div class="p-col-12" v-if="this.slider">
                    <div class="card card-w-title edit-data">

                        <div class="p-grid">
                            <div class="p-col-1">
                                <label>Başlıq</label>
                            </div>
                            <div class="p-col-4">
                                <InputText @change="titleChange()" v-model="slider.title"/>
                            </div>

                            <div class="p-col-1">

                            </div>
                            <div class="p-col-2">
                                <label>Əlavə edilmə zamanı</label>
                            </div>
                            <div class="p-col-3">
                                <Calendar v-model="slider.crDate" :showTime="true" :showSeconds="true"
                                          dateFormat="yy-mm-dd"/>
                            </div>
                        </div>

                        <div class="p-grid">
                            <div class="p-col-1">
                                <label>Tam link</label>
                            </div>
                            <div class="p-col-4">
                                <InputText placeholder="https://" v-model="slider.link"/>
                            </div>
                            <div class="p-col-1">

                            </div>
                            <div class="p-col-2">
                                <label>Redaktə edilmə zamanı</label>
                            </div>
                            <div class="p-col-3">
                                <Calendar :disabled="disableUpdateDate" v-model="slider.upDate" :showTime="true"
                                          :showSeconds="true"
                                          dateFormat="yy-mm-dd"/>
                            </div>
                        </div>

                        <div class="p-grid">
                            <div class="p-col-1">
                                <label>Açıqlama</label>
                            </div>
                            <div class="p-col-4">
                                <Textarea pla v-model="slider.description" rows="5" cols="30"/>
                            </div>
                            <div class="p-col-1">

                            </div>
                            <div class="p-col-1">

                            </div>
                            <div class="p-col-4">

                            </div>
                        </div>

                        <div class="p-grid">
                            <div class="p-col-1">

                            </div>
                            <div class="p-col-2" id="upload_container">
                                <div class="upload-btn-wrapper">
                                    <Button label="Şəkil seç" icon="pi pi-image"/>
                                    <input type="file" @change="previewFile($event)"
                                           accept="image/x-png,image/gif,image/jpeg">
                                </div>
                            </div>
                            <div class="p-col-3 file-message">
                                <ValidationMessage v-if="validation.image">{{validation.image}}</ValidationMessage>
                            </div>
                            <div class="p-col-1">
                            </div>
                            <div class="p-col-5">
                                <img id="preview_image" v-bind:src="imgUrl" style="width: 100%">
                            </div>
                        </div>

                        <div class="empty20"></div>

                        <div class="p-grid">
                            <div class="p-col-8">

                            </div>
                            <div class="p-col-2">
                                <Button label="Geri" class="p-button-danger" @click="$router.go(-1)"/>
                            </div>
                            <div class="p-col-2">
                                <Button label="Saxla" class="p-button-success" @click="handleSave()"/>
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

    let moment = require('moment');
    let axios = require('axios');
    export default {
        name: "SliderDetail",
        data() {
            return {
                link: null,
                imgUrl: '',
                oldImage: '',
                disableUpdateDate: false,
                selectedFile: null,
                slider: null,
                multiselectedCategories: null,
                validation: {
                    error_message: '',
                    image: '',
                },
                multiselectCategries: null,
            };
        },
        mounted: function () {
            this.loadModel();
        },
        methods: {
            titleChange() {
                this.link = Functions.sef_link(this.slider.title);
            },
            loadModel() {
                let slider_id = this.$route.params.slider_id;
                if (slider_id === undefined) {
                    let id = this.$route.params.id;
                    let type = this.$route.params.type;
                    axios.get(appOptions.apiUrl + 'slider/get/model/type/'+type+'/id/'+id).then(response => {
                        if (response.data.status === 'OK') {
                            this.slider = response.data.body.slider;
                            this.slider.crDate = new Date(this.slider.createDate);
                            this.slider.upDate = new Date(this.slider.updateDate);
                            this.imgUrl = appOptions.apiUrl + 'media/' + this.slider.imageName;
                        } else {
                            this.validation.error_message = 'Məlumat yüklənmədi.';
                        }
                        // eslint-disable-next-line no-unused-vars
                    }).catch((error) => {
                        console.log(error);
                        this.validation.error_message = 'Servere bağlanmaq mümkün olmadı. Yenidən yoxlamaq üçün səhifəni yeniləyin.';
                    });
                } else {
                    axios.get(appOptions.apiUrl + 'slider/get/id/'+slider_id).then(response => {
                        if (response.data.status === 'OK') {
                            console.log(response.data);
                            this.slider = response.data.body.slider;
                            this.slider.crDate = new Date(this.slider.createDate);
                            this.slider.upDate = new Date(this.slider.updateDate);
                            this.imgUrl = appOptions.apiUrl + 'media/' + this.slider.imageName;
                        } else {
                            this.validation.error_message = 'Məlumat yüklənmədi.';
                        }
                        // eslint-disable-next-line no-unused-vars
                    }).catch((error) => {
                        console.log(error);
                        this.validation.error_message = 'Servere bağlanmaq mümkün olmadı. Yenidən yoxlamaq üçün səhifəni yeniləyin.';
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
                if (this.selectedFile !== null) {
                    let d = new Date();
                    let n = d.getTime();
                    let pref = n.toString().substr(8, n.length);
                    const fd = new FormData();
                    this.slider.imageName = pref + '_' + this.selectedFile.name;

                    fd.append('file', this.selectedFile, this.slider.imageName);
                    fd.append('oldImage', this.oldImage);
                    fd.append('id', this.$route.params.id);
                    fd.append('type', this.$route.params.type);

                    let options = {
                        url: appOptions.apiUrl + 'slider/upload/img',
                        method: 'POST',
                        headers: appOptions.jsonHeader,
                        data: fd
                    };
                    // eslint-disable-next-line no-unused-vars
                    axios(options).then((res) => {
                        this.saveSlider();
                        // eslint-disable-next-line no-unused-vars
                    }).catch((error) => {
                        this.slider.imageName = null;
                    });
                } else {
                    this.saveSlider();
                }
            },
            saveSlider() {
                this.slider.categories = this.multiselectedCategories;
                this.slider.createDate = moment(this.slider.crDate).format('YYYY-MM-DD HH:mm:ss');
                this.slider.updateDate = moment(this.slider.upDate).format('YYYY-MM-DD HH:mm:ss');
                this.slider.typeId = this.$route.params.type;
                let options = {
                    url: appOptions.apiUrl + 'slider/set',
                    method: 'POST',
                    headers: appOptions.jsonHeader,
                    data: this.slider
                };
                // eslint-disable-next-line no-unused-vars
                // axios(options).then((res) => {
                //     this.$router.replace('/dashboard/sliders');
                // }).catch((error) => {
                //     console.log(error);
                // });
            }
        }
    }
</script>

<style scoped>
    .p-component {
        width: 100%;
    }

    .p-inputwrapper-filled {
        width: 100%;
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
