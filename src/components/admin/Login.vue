<template>
    <div class="login">
        <div class="p-grid p-fluid container-box">
            <div class="p-col-12 p-md-4">

            </div>

            <div class="p-col-12 p-md-4">

                <Panel>
                    <template #header>
                        <div class="panel-header">Daxil ol</div>
                    </template>
                    <div class="p-inputgroup">
                        <span class="p-inputgroup-addon">
                            <i class="pi pi-user"></i>
                        </span>
                        <InputText placeholder="İstifadəçi adı"/>
                    </div>
                    <div class="p-inputgroup">
                        <span class="p-inputgroup-addon">
                            <i class="pi pi-key"></i>
                        </span>
                        <InputText type="password" placeholder="Şifrə"/>
                    </div>
                    <div class="p-grid p-fluid">
                        <div class="p-col-12 p-md-8">
                            <div class="remmember-me">
                                <Checkbox id="binary" v-model="checked" :binary="true"/>
                                <label for="binary" class="p-checkbox-label">Məni xatırla</label>
                            </div>
                        </div>
                        <div class="p-col-12 p-md-4">
                            <div class="login-button-container">
                                <Button label="Daxil ol" />
                            </div>
                        </div>
                    </div>
                </Panel>


            </div>

            <div class="p-col-12 p-md-4">

            </div>

        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                checked: false,
            };
        },
    };

</script>

<style scoped lang="css">
    .login {
        position: absolute;
        top: 0;
        bottom: 0;
        height: 100%;
        width: 100%;
        background: #fbfbfb;
        overflow: hidden;
    }
    .panel-header {
        font-size: 20px;
    }
    .login-button-container {
        margin-right: 15px;
    }
    .login-button-container button {
        font-size: 16px;
    }
    .remmember-me {
        margin-left: 15px;
        margin-top: 8px;
    }
    .container-box {
        margin-top: 15%;
    }
    .p-inputgroup {
        margin: 16px 15px 19px 15px;
        font-size: 16px;
    }
    body .p-panel .p-panel-titlebar {
        font-size: 20px;
    }
    body .p-inputtext {
        font-size: 16px;
    }
</style>
