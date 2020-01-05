<template>
    <div class="p-grid">
        <div class="p-col-12">

            <div class="card">
                <h1>İstifadəçilər
                    <Button class="add-button" icon="pi pi-plus" @click="$router.replace('/dashboard/content/add')"/>
                </h1>
                <div>
                    <div class="p-col-12" v-if="validation.message">
                        <Message :severity="validation.messageType">{{validation.message}}</Message>
                    </div>
                    <div class="p-col-12" v-if="!this.users">
                        <div style="height: 220px;"></div>
                        <div style="text-align: center">
                            <ProgressSpinner v-if="!this.users && !this.validation.message"/>
                        </div>
                        <div style="height: 220px;"></div>
                    </div>

                    <DataTable v-if="this.users" :value="users" :filters="filters" :paginator="true" :rows="10">
                        <template #header>
                            <div style="text-align: right">
                                <i class="pi pi-search" style="margin: 4px 4px 0px 0px;"></i>
                                <InputText v-model="filters['global']" placeholder="Global Search" size="50" />
                            </div>
                        </template>
                        <Column field="name" header="Ad" filterMatchMode="startsWith">
                            <template #filter>
                                <InputText type="text" v-model="filters['name']" class="p-column-filter" />
                            </template>
                        </Column>
                        <Column field="surname" header="Soyad" filterMatchMode="startsWith">
                            <template #filter>
                                <InputText type="text" v-model="filters['surname']" class="p-column-filter" />
                            </template>
                        </Column>
                        <Column field="mail" header="EPoçt" filterMatchMode="startsWith">
                            <template #filter>
                                <InputText type="text" v-model="filters['mail']" class="p-column-filter" />
                            </template>
                        </Column>
                        <Column field="roleName" header="Rol" filterMatchMode="startsWith">
                            <template #filter>
                                <InputText type="text" v-model="filters['roleName']" class="p-column-filter" />
                            </template>
                        </Column>
                        <Column field="lastLoginDate" header="Son daxilolma" filterMatchMode="startsWith">
                            <template #filter>
                                <InputText type="text" v-model="filters['lastLoginDate']" class="p-column-filter" />
                            </template>
                        </Column>
                        <Column bodyStyle="text-align: center">
                            <template #body="slotProps">
                                <div class="align-center button-container">
                                    <Button @click="$router.push('')" icon="pi pi-eye" class="p-button-success"/>
                                    <Button @click="remove(slotProps.data)" class="p-button-danger" icon="pi pi-trash"/>
                                    <Button @click="$router.push('user/edit/id/'+slotProps.data.id)" class="p-button-warning" icon="pi pi-pencil"/>
                                </div>
                            </template>
                        </Column>
                        <template #empty>
                            Heç bir qeyd tapılmadı.
                        </template>
                    </DataTable>

                </div>

                <Dialog header="Təsdiqlə" :visible.sync="display" :style="{width: '40vw'}" :modal="true">
                    <h2>{{validation.remove}}</h2>
                    <template #footer>
                        <Button label="Geri" icon="pi pi-times" @click="display=false" class="p-button-secondary"/>
                        <Button label="Sil" icon="pi pi-check" @click="removeContent($event)" class="p-button-danger"/>
                    </template>
                </Dialog>

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
                visibleRight: false,
                selectedContentId: 0,
                display: false,
                removeId: 0,
                mediaUrl: '',
                validation: {
                    message: '',
                    messageType: 'error',
                    remove: ''
                },
                filters: {},
                users: null,
                expandedRows: []
            }
        },
        mounted() {
            this.mediaUrl = appOptions.apiUrl;
            axios.get(appOptions.apiUrl + 'users').then(response => {
                if (response.data.status === 'OK') {
                    this.users = response.data.body.userData;
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
                this.validation.message = 'Servere bağlanmaq mümkün olmadı. Yenidən yoxlamaq üçün səhifəni yeniləyin.';
            });
        },
        methods: {
            toggle(event) {
                this.$refs.menu.toggle(event);
            },
            openRight(id) {
                this.visibleRight = true;
                this.selectedContentId = id;
            },
            remove(data) {
                this.display = true;
                this.validation.remove = data.name + ' ' + data.surname +' - silmək istədiyinizdən əminsiniz?';
                this.removeId = data.id;
            },
            // eslint-disable-next-line no-unused-vars
            removeContent(id) {
                this.display = false;
                this.validation.remove = '';

                let options = {
                    url: appOptions.apiSecureUrl + 'content/remove/id/' + this.removeId,
                    method: 'GET',
                    headers: appOptions.jsonHeaderToken,
                };
                // eslint-disable-next-line no-unused-vars
                axios(options).then((response) => {
                    if (response.data.status === 'OK') {
                        this.removeId = 0;
                        var result = this.users;
                        for (var k in result) {
                            if (this.removeId === result[k].id) {
                                delete result[k];
                            }
                        }
                        this.users = result.splice(1, 1);
                        this.validation.message = '';
                    } else  {
                        this.validation.message = 'Silinmə zamanı problem yarandı';
                    }
                    // eslint-disable-next-line no-unused-vars
                }).catch((error) => {
                    this.removeId = 0;
                    this.validation.message = 'Servere bağlanmaq mümkün olmadı. Yenidən yoxlamaq üçün səhifəni yeniləyin.';
                });

            },
            onRowExpand(event) {
                this.$toast.add({severity: 'info', summary: 'Row Expanded', detail: 'Vin: ' + event.data.vin, life: 3000});
            },
            onRowCollapse(event) {
                this.$toast.add({severity: 'success', summary: 'Row Collapsed', detail: 'Vin: ' + event.data.vin, life: 3000});
            },
            expandAll() {
                this.expandedRows = this.users.filter(car => car.title);
                this.$toast.add({severity: 'success', summary: 'All Rows Expanded', life: 3000});
            },
            collapseAll() {
                this.expandedRows = null;
                this.$toast.add({severity: 'success', summary: 'All Rows Collapsed', life: 3000});
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
    .detail-content{
        width: 100%;
        margin: 7px 0px 0px 0px;
    }
    .detail-content img{
        float:left;
    }

    .detail-content p-grid{
        float:left;
    }
    .red-text {
        color: #a83d3b;
    }
    .red-text {
        color: #000000;
    }
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
        width: fit-content;
    }
    .button-container button {
        margin: 0px 5px 0px 0;
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
