<template>
    <div class="p-grid">
        <div class="p-col-12">

            <div class="card">
                <h1>
                    Vitrin məzmunlar
                    <Button class="add-button" icon="pi pi-plus" @click="$router.replace('/dashboard/slider/add')"/>
                </h1>
                <div>
                    <div class="p-col-12" v-if="validation.not_connection">
                        <Message severity="error">{{validation.not_connection}}</Message>
                    </div>
                    <DataTable resizableColumns="true" class="p-datatable-responsive" :value="sliders"
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
                                    <img :src="mediaUrl +'media/'+ slotProps.data.imageName" :alt="slotProps.data.imageName"
                                         class="img-list"/>
                                </div>
                            </template>
                        </Column>
                        <Column field="title" header="Başlıq" filterMatchMode="contains">
                            <template #filter>
                                <InputText type="text" v-model="filters['title']" class="p-column-filter"/>
                            </template>
                        </Column>
                        <Column field="description" header="Açıqlama" filterMatchMode="contains">
                            <template #filter>
                                <InputText type="text" v-model="filters['description']" class="p-column-filter"/>
                            </template>
                        </Column>
                        <Column>
                            <template #body="slotProps">
                                <div class="align-center button-container">
                                    <Button v-if="slotProps.data.typeId===1" @click="remove(slotProps.data)" class="p-button-danger" icon="pi pi-trash" />
                                    <Button @click="$router.push('slider/edit/slider_id/'+slotProps.data.id)" icon="pi pi-pencil"/>
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
                        <Button label="Sil" icon="pi pi-check" @click="removeSlider($event)" class="p-button-danger"/>
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
        name: "Slider",
        data() {
            return {
                selectedSliderId: 0,
                display: false,
                removeId: 0,
                mediaUrl: '',
                validation: {
                    not_connection: '',
                    remove: ''
                },
                filters: {},
                sliders: null,
                items: [
                    {
                        label: 'Slayder',
                        items: [
                            {
                                label: 'Sol salyder',
                                icon: 'pi pi-images',
                                command: () => {
                                    window.location.href = 'slider/type/1/id/' + this.selectedSliderId
                                }
                            },
                            {
                                label: 'Orta üst şəkil',
                                icon: 'pi pi-arrow-up',
                                command: () => {
                                    window.location.href = 'slider/type/2/id/' + this.selectedSliderId
                                }
                            },
                            {
                                label: 'Orta alt şəkil',
                                icon: 'pi pi-arrow-down',
                                command: () => {
                                    window.location.href = 'slider/type/3/id/' + this.selectedSliderId
                                }
                            },
                            {
                                label: 'Sağ şəkil',
                                icon: 'pi pi-arrow-right',
                                command: () => {
                                    window.location.hash = 'slider/type/4/id/' + this.selectedSliderId
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
                                    window.location.href = 'slider/type/5/id/' + this.selectedSliderId
                                }
                            },
                        ],
                    }
                ],

            }
        },
        mounted() {
            this.mediaUrl = appOptions.apiUrl;
            axios.get(appOptions.apiUrl + 'slide/get/offset/0/limit/0').then(response => {
                console.log(response.data.problem);
                if (response.data.problem === undefined)
                    this.sliders = response.data.body.sliders;
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
                this.selectedSliderId = id;
            },
            remove(data) {
                this.display = true;
                this.validation.remove = data.title + ' - silmək istədiyinizdən əminsiniz?';
                this.removeId = data.id;
            },
            // eslint-disable-next-line no-unused-vars
            removeSlider(id) {
                this.display = false;
                this.validation.remove = '';

                let options = {
                    url: appOptions.apiUrl + 'slider/remove/id/' + this.removeId,
                    method: 'GET',
                    headers: appOptions.jsonHeader,
                };
                // eslint-disable-next-line no-unused-vars
                axios(options).then((res) => {
                    this.removeId = 0;
                    var result = this.sliders;
                    for (var k in result) {
                        if (this.removeId === result[k].id) {
                            delete result[k];
                        }
                    }
                    this.sliders = result.splice(1, 1);
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
