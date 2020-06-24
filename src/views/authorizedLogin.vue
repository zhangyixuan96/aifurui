
<style scoped lang="less">

</style>
<template>
    <div>

    </div>
</template>
<script>
    export default {
        data () {
            return {
			
            }
        },
        mounted () {
            this.auth()
        },
        beforeDestroy () {

        },
        methods: {
            auth(){
                const vm = this;
                let params = {
                    // sessionId:vm.sessionId,
                };
                vm.api(vm, "/api/wechat/auth/register", params, "get", function(res) {
                    let data = res;
                    window.location.href = data;
                });
            }
        }
    }
</script>
