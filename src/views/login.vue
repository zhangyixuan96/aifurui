<style  lang="less">
    .topBar{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.2rem 0.2rem;
        background:rgba(250,250,250,1);
        img{
            width: 0.4rem;
        }
        .title{
            font-size:0.34rem;
            font-family:PingFang SC;
            font-weight:bold;
            color:rgba(51,51,51,1);
        }
    }
    .login{
        .outerLogo{
            text-align: center;
            .logo{
                // display: inline-block
                width:4.38rem;
                margin: 1.28rem 0;
            }
        }
        .input{
            width:6.2rem;
            height:0.98rem;
            background:rgba(255,255,255,1);
            border:0.02rem solid rgba(226,165,136,1);
            border-radius:0.49rem;
            padding:0.25rem 0.3rem;
            margin:0 auto;
            margin-bottom: 0.4rem;
            img{
                width: 0.5rem;
                vertical-align: middle;
            }
            input{
                width: 4.8rem;
                height: 0.48rem;
                font-size:0.28rem;
                font-family:PingFang SC;
                font-weight:500;
                color:rgba(51,51,51,1);
                margin-left:0.1rem;
            }
        }
        .loginBtn{
            width:6.2rem;
            height:0.98rem;
            line-height: 0.98rem;
            background:rgba(226,165,136,1);
            border-radius:0.49rem;
            font-size:0.34rem;
            font-family:PingFang SC;
            font-weight:500;
            color:rgba(255,255,255,1);
            text-align: center;
            margin:1rem  auto;
        }
    }
    input::-webkit-input-placeholder { /* WebKit browsers */
            color:rgba(153,153,153,1);
        } 
</style>
<template>
    <div class="login">
        <div class="topBar">
            <img src="../images/nav_ic_close.png" alt="">
            <span class="title">绑定教师账号</span>
            <img src="../images/line_ic_04.png" alt="">
        </div>
        <div class="outerLogo">
            <img class="logo" src="../images/login_ic_logo.png" alt="">
        </div>
         <div class="input">
             <img src="../images/login_ic_phone.png" alt="">
             <input type="text" placeholder="请输入账号" v-model="account">
         </div>
         <div class="input">
             <img src="../images/login_ic_password.png" alt="">
             <input type="password" placeholder="请输入密码" v-model="password">
         </div>
         <div class="loginBtn" @click="login">登录</div>
    </div>
</template>
<script>
    export default {
        
        data() {
            return {
                // account:'pzh',
                // password:'402257',
                wxOpenId:'',
                account:'',
                password:''
            }
        },
        mounted() {
            let wxOpenId = this.$route.query.wxOpenId;
            if(wxOpenId){
                this.wxOpenId = wxOpenId;
            }
        },
        methods: {
            login(){
                const vm = this;
                if(!vm.account.trim()||!vm.password.trim()){
                    vm.$dialog.alert({
                        message: '账号或密码不可为空'
                    });
                    return;
                }
                // vm.$router.push({
                //         name:'home'
                //     })
                let params = {
                    account:vm.account,
                    password:vm.password,
                    type:1
                    // wxOpenId:vm.wxOpenId
                };
                vm.api(vm, "/api/web/index/login.json", params, "post", function(res) {
                    let data = res;
                    console.log("login",res);
                    vm.addCookie("sessionId",data.sessionId);
                    // vm.auth();
                    // vm.orderList = data.resultList;
                    // console.log("data",data.sessionId);
                    vm.$router.push({
                        name:'home'
                    })
                });
                // this.$dialog.alert({
                //     message: '账号或密码错误，请重新填写'
                // });
                // this.$dialog.alert({
                //     message: '您填写的账号未成为老师哦'
                // });
            },
            
        }
    }
</script>