<template>
    <div class="p-grid">
        <div class="p-col-12">

            <Sidebar :visible.sync="visibleRight" :baseZIndex="1000" position="right">
                <h1 style="fontWeight:normal">Vitirin olaraq ayarla</h1>
                <div class="empty20"></div>
                <Menu :model="items" class="full-width"/>
            </Sidebar>

            <div class="card">
                <h1>Məzmunlar
                    <Button class="add-button" icon="pi pi-plus" @click="$router.replace('/dashboard/content/add')"/>
                </h1>
                <div>
                    <div class="p-col-12" v-if="validation.message">
                        <Message :severity="validation.messageType">{{validation.message}}</Message>
                    </div>
                    <div class="p-col-12" v-if="!this.contents">
                        <div style="height: 220px;"></div>
                        <div style="text-align: center">
                            <ProgressSpinner v-if="!this.contents && !this.validation.message"/>
                        </div>
                        <div style="height: 220px;"></div>
                    </div>

                    <DataTable v-if="this.contents" :value="contents" :expandedRows.sync="expandedRows" dataKey="title" @row-expand="onRowExpand" @row-collapse="onRowCollapse" :filters="filters">
                        <template #header>
                            <div class="table-header-container">
                                <Button class="p-button-secondary" icon="pi pi-chevron-right" @click="collapseAll" />
                                <Button class="p-button-secondary" icon="pi pi-chevron-down" @click="expandAll"/>
                            </div>
                            <div style="text-align: right">
                                <i class="pi pi-search" style="margin: 4px 4px 0px 0px;"></i>
                                <InputText v-model="filters['global']" placeholder="Global Search" size="50"/>
                            </div>
                        </template>
                        <Column :expander="true" headerStyle="width: 3em" >
                            <template #header>
                                <div class="collapseAll">
                                    <Button style="width: 1.5em;" class="p-button-secondary" icon="pi pi-caret-down"  @click="collapseSelect" />
                                </div>
                            </template>
                        </Column>
                        <Column header="Başlıq" filterMatchMode="contains" :sortable="true">
                            <template #filter>
                                <InputText type="text" v-model="filters['title']" class="p-column-filter"/>
                            </template>
                            <template #body="slotProps">
                                <div :class="['red-text', {'black-text': slotProps.data.visible}]">
                                    {{slotProps.data.title}}
                                </div>
                            </template>
                        </Column>
                        <Column field="createDate" header="Yaradılma zamanı" filterMatchMode="contains" :sortable="true">
                            <template #filter>
                                <InputText type="text" v-model="filters['createDate']" class="p-column-filter"/>
                            </template>
                        </Column>
                        <Column bodyStyle="text-align: center"  headerStyle="width: 8em"  field="viewCount" header="Baxış sayı" filterMatchMode="contains" :sortable="true">
                            <template #filter>
                                <InputText type="text" v-model="filters['viewCount']" class="p-column-filter"/>
                            </template>
                        </Column>
                        <Column bodyStyle="text-align: center">
                            <template #body="slotProps">
                                <div class="align-center button-container">
                                    <Button @click="$router.push('')" icon="pi pi-eye" class="p-button-success"/>
                                    <Button @click="remove(slotProps.data)" class="p-button-danger" icon="pi pi-trash"/>
                                    <Button @click="$router.push('content/edit/id/'+slotProps.data.id)" class="p-button-warning" icon="pi pi-pencil"/>
                                    <Button icon="pi pi-arrow-left" @click="openRight(slotProps.data.id)" style="margin-right:.25em"/>
                                </div>
                            </template>
                        </Column>
                        <template #expansion="slotProps">
                            <div class="car-details">
                                <div class="detail-content">
                                    <img style="width: 200px;" :src="mediaUrl +'th_'+ slotProps.data.imageName" :alt="slotProps.data.imageName"/>
                                    <div class="p-grid">
                                        <div class="p-col-12 p-md-6 p-lg-3">Başlıq: <b>{{slotProps.data.title}}</b></div>
                                        <div class="p-col-12 p-md-6 p-lg-3">Yaradılma zamanı: <b>{{slotProps.data.createDate}}</b></div>
                                        <div class="p-col-12 p-md-6 p-lg-3">Redaktə zamanı: <b>{{slotProps.data.createDate}}</b></div>
                                        <div class="p-col-12 p-md-6 p-lg-3">Baxış sayı: <b>{{slotProps.data.viewCount}}</b></div>
                                    </div>
                                </div>
                            </div>
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
                collapseAllOn:false,
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
                contents: null,
                contentThubnailImageMediaPath: null,
                expandedRows: [],
                items: [
                    {
                        label: 'Slayder',
                        items: [
                            {
                                label: 'Sol salyder',
                                icon: 'pi pi-images',
                                command: () => {
                                    window.location.href = 'slider/type/1/id/' + this.selectedContentId
                                }
                            },
                            {
                                label: 'Orta üst şəkil',
                                icon: 'pi pi-arrow-up',
                                command: () => {
                                    window.location.href = 'slider/type/2/id/' + this.selectedContentId
                                }
                            },
                            {
                                label: 'Orta alt şəkil',
                                icon: 'pi pi-arrow-down',
                                command: () => {
                                    window.location.href = 'slider/type/3/id/' + this.selectedContentId
                                }
                            },
                            {
                                label: 'Sağ şəkil',
                                icon: 'pi pi-arrow-right',
                                command: () => {
                                    window.location.hash = 'slider/type/4/id/' + this.selectedContentId
                                }
                            }
                        ],
                    },
                    {
                        label: 'Önərilən',
                        items: [
                            {
                                label: 'Sol üst',
                                icon: 'pi pi-image',
                                command: () => {
                                    window.location.href = 'slider/type/5/id/' + this.selectedContentId
                                }
                            },
                        ],
                    }
                ],
            }
        },
        mounted() {
            this.mediaUrl = appOptions.apiUrl;
            axios.get(appOptions.apiUrl + 'contents/get/offset/0/limit/0').then(response => {
                if (response.data.status === 'OK') {
                    this.contents = response.data.body.contents;
                    this.mediaUrl = appOptions.apiUrl + response.data.body.contentThubnailImageMediaPath;
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
                this.validation.remove = data.title + ' - silmək istədiyinizdən əminsiniz?';
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
                        // this.removeId = 0;
                        var result = this.contents;
                        for (var k in result) {
                            if (this.removeId === result[k].id) {
                                delete result[k];
                            }
                        }
                        this.contents = result.splice(1, 1);
                        this.validation.message = '';
                        this.$toast.add({severity:'success', summary: 'Uğurla silindi'});
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
                // this.$toast.add({severity: 'info', summary: 'Row Expanded', detail: 'Vin: ' + event.data.vin, life: 3000});
            },
            onRowCollapse(event) {
                // this.$toast.add({severity: 'success', summary: 'Row Collapsed', detail: 'Vin: ' + event.data.vin, life: 3000});
            },
            collapseSelect(){
                if (this.collapseAllOn){
                    this.collapseAll();
                    this.collapseAllOn = false;
                } else {
                    this.expandAll();
                    this.collapseAllOn = true;
                }
            },
            expandAll() {
                this.expandedRows = this.contents.filter(dt => dt.title);
                // this.$toast.add({severity: 'success', summary: 'All Rows Expanded', life: 3000});
            },
            collapseAll() {
                this.expandedRows = null;
                // this.$toast.add({severity: 'success', summary: 'All Rows Collapsed', life: 3000});
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
