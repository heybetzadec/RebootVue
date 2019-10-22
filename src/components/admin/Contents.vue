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
                    <div class="p-col-12" v-if="validation.not_connection">
                        <Message severity="error">{{validation.not_connection}}</Message>
                    </div>


                    <div class="p-col-12" v-if="!this.contents">
                        <div style="height: 220px;"></div>
                        <div style="text-align: center">
                            <ProgressSpinner v-if="!this.contents && !this.validation.not_connection"/>
                        </div>
                        <div style="height: 220px;"></div>
                    </div>

                    <DataTable v-if="this.contents" resizableColumns="true" class="p-datatable-responsive" :value="contents"
                               :filters="filters" :paginator="true" :rows="10">
                        <template #header>
                            <div style="text-align: right">
                                <i class="pi pi-search" style="margin: 4px 4px 0px 0px;"></i>
                                <InputText v-model="filters['global']" placeholder="Global Search" size="50"/>
                            </div>
                        </template>
                        <Column field="imageName" header="Şəkil">
                            <template #body="slotProps">
                                <div class="image-body">
                                    <img :src="mediaUrl +'media/'+ slotProps.data.imageName" :alt="slotProps.data.brand"
                                         class="img-list"/>
                                </div>
                            </template>
                        </Column>
                        <Column field="title" header="Başlıq" filterMatchMode="contains" :sortable="true">
                            <template #filter>
                                <InputText type="text" v-model="filters['title']" class="p-column-filter"/>
                            </template>
                        </Column>
                        <Column field="viewCount" header="Baxış sayı" filterMatchMode="contains" :sortable="true">
                            <template #filter>
                                <InputText type="text" v-model="filters['viewCount']" class="p-column-filter"/>
                            </template>
                        </Column>
                        <Column>
                            <template #body="slotProps">
                                <div class="align-center button-container">
                                    <Button @click="$router.push('')" icon="pi pi-eye" class="p-button-success"/>
                                    <Button @click="remove(slotProps.data)" class="p-button-danger" icon="pi pi-trash"/>
                                    <Button @click="$router.push('content/edit/id/'+slotProps.data.id)"
                                            icon="pi pi-pencil"/>
                                    <Button icon="pi pi-arrow-left" @click="openRight(slotProps.data.id)"
                                            style="margin-right:.25em"/>

                                    <!--                                    <Button @click="remove(slotProps.data)" class="p-button-info" icon="pi pi-cog"/>-->
                                    <!--                                    <SplitButton class="split-button p-button-secondary"  icon="pi pi-cog" :model="items"></SplitButton>-->
                                </div>
                            </template>
                        </Column>
                        <template #empty>
                            Heçbir Qeyd Tapılmadı.
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
    import {Functions} from "../../model/Functions";

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
                    not_connection: '',
                    remove: ''
                },
                filters: {},
                contents: null,
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
                                    window.location.href = 'slider/add/type/2/id/' + this.selectedContentId
                                }
                            },
                            {
                                label: 'Orta alt şəkil',
                                icon: 'pi pi-arrow-down',
                                command: () => {
                                    window.location.href = 'slider/add/type/3/id/' + this.selectedContentId
                                }
                            },
                            {
                                label: 'Sağ şəkil',
                                icon: 'pi pi-arrow-right',
                                command: () => {
                                    window.location.hash = 'slider/add/type/4/id/' + this.selectedContentId
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
                                    window.location.href = 'slider/add/type/5/id/' + this.selectedContentId
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
                console.log(response.data.problem);
                if (response.data.problem === undefined)
                    this.contents = response.data.body.contents;
                this.validation.not_connection = '';
                // eslint-disable-next-line no-unused-vars
            }).catch((error) => {
                console.log(error);
                this.validation.not_connection = 'Servere bağlanmaq mümkün olmadı. Yenidən yoxlamaq üçün səhifəni yeniləyin.';
            });
        },
        methods: {
            toggle(event) {
                console.log(event);
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
                    url: appOptions.apiUrl + 'content/remove/id/' + this.removeId,
                    method: 'GET',
                    headers: appOptions.jsonHeader,
                };
                // eslint-disable-next-line no-unused-vars
                axios(options).then((res) => {
                    this.removeId = 0;
                    var result = this.contents;
                    for (var k in result) {
                        if (this.removeId === result[k].id) {
                            delete result[k];
                        }
                    }
                    this.contents = result.splice(1, 1);
                    this.validation.not_connection = '';
                    // eslint-disable-next-line no-unused-vars
                }).catch((error) => {
                    this.removeId = 0;
                    this.validation.not_connection = 'Servere bağlanmaq mümkün olmadı. Yenidən yoxlamaq üçün səhifəni yeniləyin.';
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
