<template>
    <div class="p-grid">
        <div class="p-col-12">

            <div class="card">
                <h1>Kateqoriyalar
                    <Button class="add-button" icon="pi pi-plus" @click="$router.replace('/dashboard/category/add')"/>
                </h1>
                <div>
                    <div class="p-col-12" v-if="validation.message">
                        <Message :severity="validation.messageType">{{validation.message}}</Message>
                    </div>

                    <div class="p-col-12" v-if="!this.nodes">
                        <div style="height: 220px;"></div>
                        <div style="text-align: center">
                            <ProgressSpinner v-if="!this.validation.message"/>
                        </div>
                        <div style="height: 220px;"></div>
                    </div>

                    <TreeTable v-if="this.nodes" :value="nodes">
                        <Column field="name" header="Ad" :expander="true"></Column>
                        <Column field="title" header="Başlıq"></Column>
                        <Column headerStyle="width: 10em" bodyStyle="text-align: center">
                            <template #header>

                            </template>
                            <template #body="slotProps">
                                <div class="align-center button-container">
                                    <Button @click="$router.push('')" icon="pi pi-eye" class="p-button-success"/>
                                    <Button @click="remove(slotProps.node.data)" class="p-button-danger" icon="pi pi-trash"/>
                                    <Button @click="$router.push('category/edit/id/'+slotProps.node.data.id)" class="p-button-warning" icon="pi pi-pencil"/>
                                </div>
                            </template>
                        </Column>
                    </TreeTable>

                </div>


                <Dialog header="Təsdiqlə" :visible.sync="display" :style="{width: '40vw'}" :modal="true">
                    <h2>{{validation.remove}}</h2>
                    <template #footer>
                        <Button label="Geri" icon="pi pi-times" @click="display=false" class="p-button-secondary"/>
                        <Button label="Sil" icon="pi pi-check" @click="removecategory($event)" class="p-button-danger"/>
                    </template>
                </Dialog>

                <Toast />

            </div>

        </div>
    </div>
</template>
<script>

    import {appOptions} from "../../model/Variables";

    let axios = require('axios');

    export default {
        data() {
            return {
                selectedKey1: null,
                columns: [
                    {field: 'name', header: 'Vin', expander: true},
                    {field: 'title', header: 'Size'},
                    {field: 'visible', header: 'Type'}
                ],
                nodes: null,
                visibleRight: false,
                selectedcategoryId: 0,
                display: false,
                removeId: 0,
                validation: {
                    message: '',
                    messageType: 'error',
                    remove: ''
                },
                filters: {},
                categorys: null,
            }
        },
        mounted() {
            // axios.get(appOptions.apiSecureUrl + 'categories/get/offset/0/limit/0').then(response => {
            let options = {
                url:appOptions.apiUrl + 'categories',
                method: 'GET',
                headers: appOptions.jsonHeader,
            };

            // eslint-disable-next-line no-unused-vars
            axios(options).then((response) => {
                if (response.data.status === 'OK') {
                    this.nodes = response.data.body.categoryNodes;
                    this.validation.message = '';
                } else {
                    if (response.data.problem.code === 404) {
                        this.validation.message = 'Bazada göstəriləcək məzmun yoxdur.';
                        this.validation.messageType = 'warn';
                    } else {
                        this.validation.message = 'Servere bağlanarkən problem yarandı.';
                    }
                }

                // eslint-disable-next-line no-unused-vars
            }).catch((error) => {
                console.log(error);
                this.validation.message = 'Servere bağlanmaq mümkün olmadı. Yenidən yoxlamaq üçün səhifəni yeniləyin.';
            });
        },
        methods: {

            toggle(event) {
                this.$refs.menu.toggle(event);
            },
            openRight(id) {
                this.visibleRight = true;
                this.selectedcategoryId = id;
            },
            remove(data) {
                this.display = true;
                this.validation.remove = data.name + ' - silmək istədiyinizdən əminsiniz?';
                this.removeId = data.id;
            },
            // eslint-disable-next-line no-unused-vars
            removecategory(id) {
                this.display = false;
                this.validation.remove = '';

                let options = {
                    url: appOptions.apiSecureUrl + 'category/remove/id/' + this.removeId,
                    method: 'GET',
                    headers: appOptions.jsonHeaderToken,
                };

                // eslint-disable-next-line no-unused-vars
                axios(options).then((response) => {
                    if (response.data.status === 'OK') {
                        this.nodes = response.data.body.categoryNodes;
                        this.$toast.add({severity:'success', summary: 'Uğurla silindi'});
                    }
                }).catch((error) => {
                    console.log(error);
                    // this.removeId = 0;
                    // this.validation.message = 'Servere bağlanmaq mümkün olmadı. Yenidən yoxlamaq üçün səhifəni yeniləyin.';
                });

            }
        }
    }
</script>
<style scoped lang="css">
    .full-width {
        width: 100%;
    }
</style>
<style lang="css">
    .card {
        min-height: 632px;
    }
    .image-body {
        width: 100%;
        text-align: center;
    }
    .img-list {
        height: 80px;
        text-align: center;
    }
    th input {
        display: none;
    }
    .align-center button {
        width: fit-category;
    }
    .button-container button {
        margin: 2px 5px 2px 0;
    }
    a.p-menuitem-link {
        text-align: left;
    }
    .add-button {
        float: right;
    }
    .add-button.p-button {
        border-radius: 16px;
    }
</style>
