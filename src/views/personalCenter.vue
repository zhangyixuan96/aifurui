
<style scoped lang="less">
    .personalCenter{
        text-align: center;
        .avatar{
             width: 1.74rem;
             margin-top: 0.6rem;
        }
        .userName{
            font-size:0.32rem;
            font-family:PingFang SC;
            font-weight:bold;
            color:rgba(51,51,51,1);
            text-align: center;
            margin-top: 0.26rem;
        }
        .changeAccount{
            display: inline-block;
            width:2.9rem;
            height:0.98rem;
            line-height: 0.98rem;
            background:rgba(226,165,136,1);
            border-radius:0.49rem;
            text-align: center;
            font-size:0.34rem;
            font-family:PingFang SC;
            font-weight:500;
            color:rgba(255,255,255,1);
            margin-top: 1.1rem;
        }
    }
</style>
<template>
    <div class="personalCenter">
        <div class="topBar">  
            <img src="../images/nav_ic_close.png" alt="" @click="goBack">
            <span class="title">我的</span>
            <img src="../images/line_ic_04.png" alt="">
        </div>
        <img class="avatar" src="../images/card_tx_big.png" alt="" v-if="!userMessage.avatar">
        <img class="avatar" :src="userMessage.avatar" alt="" v-else>
        <div class="userName">{{userMessage.nickname}}</div>
        <div class="changeAccount"  @click="changeAccount">切换账号</div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                userMessage:{}
            }
        },
        mounted () {
            this.getMyMessage();
        },
        beforeDestroy () {

        },
        methods: {
            getMyMessage(){
                const vm = this;
                let params = {
                    sessionId:vm.sessionId,
                };
                vm.api(vm, "/api/web/index/mine.json", params, "post", function(res) {
                    let data = res;
                    vm.userMessage = data;
                    // console.log("data",data);
                });
            },
            goBack(){
                this.$router.go(-1);
            },
            // 切换账号
            changeAccount(){
                const vm = this;
                this.$dialog.confirm({
                    message: '确认切换账号?'
                }).then(() => {
                // on confirm
                    vm.removeCookie("sessionId");
                    vm.$router.push({
                        name:'login'
                    })
                }).catch(() => {
                // on cancel
                });
                
            }
        }
    }
</script>
