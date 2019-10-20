<template>
    <Toolbar id="toolbar-container">
        <template slot="left">
            <img class="title-logo" src="/assets/static/logo.png" alt="Reboot">
        </template>

        <template slot="right">
            <div class="menu-buttons">
                <Button label="Ana səhifə" icon="pi pi-home"  />
                <Button label="Xəbərlər" class="p-button-secondary" />
                <Button label="Video" class="p-button-secondary" />
                <Button type="button" icon="pi pi-angle-down"  label="Kateqoriyalar" @click="toggle" class="p-button-secondary"  iconPos="right"/>
                <Menu id="sub-menu" ref="menu" :model="items" :popup="true" />
            </div>

        </template>
    </Toolbar>
</template>

<script>
    export default {
        name: "MainHeader",
        data() {
            return {
                items: [
                    {
                        label: 'Update',
                        icon: 'pi pi-refresh'
                    },
                    {
                        label: 'Delete',
                        icon: 'pi pi-times'
                    },
                    {
                        label: 'Vue Website',
                        icon: 'pi pi-external-link',
                        command: () => {
                            window.location.href = 'https://vuejs.org/'
                        }
                    },
                    {   label: 'Upload',
                        icon: 'pi pi-upload',
                        command: () => {
                            window.location.hash = "/fileupload"
                        }
                    }
                ]
            }
        },
        methods: {
            toggle(event) {
                this.$refs.menu.toggle(event);
            },
            save() {
                this.$toast.add({severity: 'success', summary: 'Success', detail: 'Data Saved', life: 3000});
            }
        }
    }
</script>

<style scoped lang="css">
    body .p-toolbar {
         padding: 0.571em 1.450em;
         border-radius: 0;
    }
    .title-logo{
        height: 70px;
    }
    .menu-buttons button{
        margin: 3% 0 2% 5px;
        font-size: 20px;
        font-family: arial,sans-serif;
    }
    .p-menu-list a{
        font-size: 20px;
        font-family: arial,sans-serif;
    }
    #sub-menu{
        /*font-size: 16px;*/
    }
</style>
