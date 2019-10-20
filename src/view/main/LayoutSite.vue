<template>
    <div class="p-grid sample-layout">
        <div class="p-col-12 p-md-12 p-col-nogutter">
            <MainHeader />
        </div>

            <router-view />


        <div class="p-col-12">
            Footer
        </div>
    </div>
<!--    <div>-->
<!--        <MainHeader />-->
<!--        <div class="layout-main">-->
<!--            <router-view />-->
<!--        </div>-->

<!--        <MainFooter />-->
<!--    </div>-->
</template>

<script>


    import MainHeader from "./MainHeader";
    import MainFooter from "./MainFooter";

    export default {
        components: {
            'MainHeader': MainHeader,
            'MainFooter': MainFooter,
        }
    }
</script>

<style scoped lang="css">
    .layout-container{
        padding: 15px;
    }
    .p-grid.sample-layout {
        margin: 0!important;
    }

</style>
