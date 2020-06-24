
<style scoped lang="less">
    .checkStudent{
            .studentList{
                padding: 0.2rem 0.3rem;
                .oneStudent{
                    width:6.9rem;
                    height:2rem;
                    background:rgba(255,255,255,1);
                    border:0.01rem solid rgba(226,165,136,1);
                    border-radius:0.1rem;
                    padding:0.3rem;
                    margin-bottom: 0.3rem;
                    .topMessage{
                        img{
                            width:1.4rem;
                            height:1.4rem;
                            border-radius:50%;
                            vertical-align: bottom;
                        }
                        .studentMessage{
                            height: 1.4rem;
                            display: inline-block;
                            font-size:0.26rem;
                            font-family:PingFang SC;
                            font-weight:500;
                            color:rgba(51,51,51,1);
                            margin-left: 0.1rem;
                            .forward{
                                font-weight:400;
                                color:rgba(153,153,153,1);
                            }
                            .studentId{
                                height: 0.45rem;
                                line-height: 0.45rem;
                            }
                            .otherMessage{
                                width: 4rem;
                                height: 0.45rem;
                                line-height: 0.45rem;
                                display: flex;
                                justify-content: space-between;
                            }
                        }
                    }
                }
            }
    }
</style>
<template>
    <div class="checkStudent">
        <div class="topBar">
            <img src="../images/nav_ic_close.png" alt="" @click="goBack">
            <span class="title">查看学生</span>
            <img src="../images/line_ic_04.png" alt="">
        </div>
        <div class="studentList">
                <div class="oneStudent" v-for="item in studentList">
                    <div class="topMessage">
                        <img src="../images/card_tx_big.png" alt="" v-if="!item.avatar ">
                        <img :src="item.avatar" alt="" v-else>
                        <div class="studentMessage">
                             <div class="studentId"> <span class="forward"> 学号：</span>{{item.serial}}</div>
                            <div class="otherMessage">
                                 <span><span class="forward"> 姓名：</span>{{item.nickname }}</span>
                                <span><span class="forward"> 性别：</span>{{item.sex|getSex}}</span>
                            </div>
                            <div class="otherMessage">
                                 <span><span class="forward"> 剩余课（次）:</span>{{item.surplusChapter}}</span>
                                
                            </div>
                        </div>
                    </div>
                </div>
                <!-- <div class="oneStudent">
                    <div class="topMessage">
                        <img src="../images/card_tx_big.png" alt="">
                        <div class="studentMessage">
                             <div class="studentId"> <span class="forward"> 学号：</span>42542</div>
                            <div class="otherMessage">
                                 <span><span class="forward"> 姓名：</span>紫晓晓</span>
                                <span><span class="forward"> 性别：</span>女</span>
                            </div>
                            <div class="otherMessage">
                                 <span><span class="forward"> 剩余课（次）:</span>23</span>
                            </div>
                        </div>
                    </div>
                </div> -->
    </div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                classId:'',
                // 学生列表
                studentList:[]
            }
        },
        filters:{
            // 转换时间戳为日期
            getSex:function(value){
               switch(value){
                   case 0:
                       return '未知'
                   case 1:
                       return '男'
                    break;
                   case 2:
                       return '女'
                    break;
               }
            },
        },
        mounted () {
            let classId = this.$route.query.classId;
            if(classId){
                this.classId = classId;
            }
            this.getStudentList();
        },
        beforeDestroy () {

        },
        methods: {
            getStudentList(){
                const vm = this;
                let params = {
                    sessionId:vm.sessionId,
                    pageNumber:1,
                    pageSize:100,
                    itemParam:vm.classId,
                };
                vm.api(vm, "/api/web/index/viewStudent.json", params, "post", function(res) {
                    let data = res.list;
                    vm.studentList = data;
                });
            },
            goBack(){
                this.$router.go(-1);
            },
        }
    }
</script>
