<template>
    <div class="logout">
        <div style="width: 100%; margin-top: 100px; text-align: center;">
            <ProgressSpinner />
        </div>
    </div>
</template>

<script>
    export default {
        name: "Logout",
        mounted() {
            localStorage.removeItem('token');
            localStorage.removeItem('user');

            this.$cookie.remove('token');
            this.$cookie.remove('loginUser');

            this.$router.replace('/dashboard/login');

            // this.$router.go('/dashboard/login');
        }
    }
</script>

<style scoped>
    .logout {
        position: absolute;
        top: 0;
        bottom: 0;
        height: 100%;
        width: 100%;
        background: #444444;
        overflow: hidden;
    }
</style>