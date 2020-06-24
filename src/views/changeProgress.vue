
<style scoped lang="less">
    .changeProgress{
        .catalogList{
            .oneCatalog{
                font-size:0.3rem;
                font-family:PingFang SC;
                font-weight:500;
                color:rgba(51,51,51,1);
                display: flex;
                justify-content: space-between;
                border-bottom: 0.01rem solid rgb(228, 223, 223);
                padding:0.36rem 0.3rem;
                img{
                    width: 0.4rem;
                    // height: 0.37rem;
                }
                .title{
                    width: 6.24rem;
                    display: inline-block;
                    white-space: nowrap; 
                    overflow: hidden;
                    text-overflow:ellipsis;
                }
            }
        }
    }
</style>
<template>
    <div class="changeProgress">
        <div class="topBar">
            <img src="../images/nav_ic_close.png" alt="" @click="goBack">
            <span class="title">更改进度</span>
            <img src="../images/line_ic_04.png" alt="">
        </div>
        <div class="catalogList">
            <div class="oneCatalog" v-for="item in chapterList" @click="openArticle(item.id,item.openStatus)">
                <span class="title">{{item.chapterName}}</span>
               <img src="../images/ic_lock.png" alt="" v-if="item.openStatus==2">
            </div>
            <!-- <div class="oneCatalog" @click="openArticle">
                <span class="title">第一章 开篇词第一章 开篇词第一章 开篇词第一章 开篇词第一章 开篇词</span>
               <img src="../images/ic_lock.png" alt="">
            </div> -->
        </div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                // 班级ID
                classId:'e837a4a4-9464-4eb2-ba0a-bc95645827aa',
                chapterList:[],
                // 班级ID
                userId:'' ,
                // 课程ID
                shId:'',
                shiftId:''
            }
        },
        mounted () {
            // let classId = this.$route.query.classId;
            // if(classId){
            //     this.classId = classId;
            // }
            let userId = this.$route.query.userId;
            if(userId){
                this.userId = userId;
            }
            let shId = this.$route.query.shId;
            if(shId){
                this.shId = shId;
            }
            let shiftId = this.$route.query.shiftId;
            if(shiftId){
                this.shiftId = shiftId;
            }
            if(!this.userId){
                this.getClassSchedule();
            }else{
                this.getStudentSchedule();
            }
            
        },
        beforeDestroy () {

        },
        methods: {
            // 打开章节
            openArticle(chapterId,openStatus){
                if(openStatus==1){
                    return;
                }
                if(!this.userId){
                    this.openClassArticle(chapterId);
                }else{
                    this.openStudentArticle(chapterId);
                }
            },
            // 获取班级章节列表
            getClassSchedule(){
                const vm = this;
                let params = {
                    sessionId:vm.sessionId,
                    itemParam:vm.classId
                };
                vm.api(vm, "/api/web/index/schedule.json", params, "post", function(res) {
                    let data = res;
                    vm.chapterList = data;
                    console.log("data",data);
                    
                });
            },
            // 打班级的开章节
            openClassArticle(chapterId){
                const vm = this;
                let params = {
                    sessionId:vm.sessionId,
                    id:chapterId,
                    classId:vm.classId
                };
                this.$dialog.confirm({
                    message: '确认打开此章节?'
                }).then(() => {
                // on confirm
                    vm.api(vm, "/api/web/index/openSchedule.json", params, "post", function(res) {
                        let data = res;
                        vm.$toast.success('打开成功！');
                        vm.getClassSchedule();
                        console.log("data",data);
                    });
                }).catch(() => {
                // on cancel
                });
            },
            // 获取学生章节列表
            getStudentSchedule(){
                const vm = this;
                let params = {
                    sessionId:vm.sessionId,
                    userId:vm.userId,
                    // shiftId:vm.shiftId,
                    // classId:vm.classId,
                    shId:vm.shId
                    // chapterId:
                };
                vm.api(vm, "/api/web/index/studentSchedule.json", params, "post", function(res) {
                    let data = res;
                    vm.chapterList = data;
                    console.log("data",data);
                    
                });
            },
            // 打学生的开章节
            openStudentArticle(chapterId){
                const vm = this;
                let params = {
                    sessionId:vm.sessionId,
                    userId:vm.userId,
                    chapterId:chapterId,
                    classId:vm.classId,
                    // chapterId:
                };
                this.$dialog.confirm({
                    message: '确认打开此章节?'
                }).then(() => {
                // on confirm
                    vm.api(vm, "/api/web/index/openStudentSchedule.json", params, "post", function(res) {
                        let data = res;
                        vm.$toast.success('打开成功！');
                        vm.getStudentSchedule();
                        console.log("data",data);
                    });
                }).catch(() => {
                // on cancel
                });
            },
            goBack(){
                this.$router.go(-1);
            },
        }
    }
</script>
