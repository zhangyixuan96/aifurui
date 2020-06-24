
<style  lang="less">
    .index{
        .tap{
            margin-top: 0.2rem;
            .classList{
                padding:0.28rem 0.3rem 1rem 0.3rem;
                .oneClass{
                    width:6.9rem;
                    height:5.12rem;
                    border:0.01rem solid rgba(226,165,136,1);
                    border-radius:0.1rem;
                    padding:0.3rem;
                    margin-bottom: 0.2rem;
                    table tr td:first-child{
                        width: 1.4rem;
                        font-size:0.26rem;
                        font-family:PingFang SC;
                        font-weight:400;
                        color:rgba(153,153,153,1);
                        text-align-last: justify;
                    }
                    table tr td:nth-child(2){
                        font-size:0.26rem;
                        font-family:PingFang SC;
                        font-weight:500;
                        color:rgba(51,51,51,1);
                    }
                    table tr{
                        height: 0.46rem;
                    }
                    .bottom{
                        font-size:0.26rem;
                        font-family:PingFang SC;
                        font-weight:500;
                        color:rgba(226,165,136,1);
                        display: flex;
                        justify-content: space-between;
                        margin-top: 0.2rem;
                        .watchStudent{
                            display: inline-block;
                            width:1.6rem;
                            height:0.64rem;
                            line-height: 0.64rem;
                            background:rgba(255,255,255,1);
                            border:0.01rem solid rgba(226,165,136,1);
                            border-radius:0.32rem;
                            text-align: center;
                        }
                        .changeProgress{
                            display: inline-block;
                            width:1.6rem;
                            height:0.64rem;
                            line-height: 0.64rem;
                            background:rgba(226,165,136,1);
                            border:0.01rem solid rgba(226,165,136,1);
                            border-radius:0.32rem;
                            text-align: center;
                            color:rgba(255,255,255,1);
                        }
                    }
                }
            }
            .studentList{
                padding:0.28rem 0.3rem 1rem 0.3rem;
                .oneStudent{
                    width:6.9rem;
                    height:3.49rem;
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
                                height: 0.7rem;
                                line-height: 0.7rem;
                            }
                            .otherMessage{
                                width: 4rem;
                                height: 0.7rem;
                                line-height: 0.7rem;
                                display: flex;
                                justify-content: space-between;
                            }
                        }
                    }
                    .progress{
                        font-size:0.26rem;
                        font-family:PingFang SC;
                        font-weight:500;
                        color:rgba(51,51,51,1);
                        margin-top: 0.3rem;
                    }
                    .changeProgess{
                        text-align: right;
                        margin-top: 0.3rem;
                        .changeProgessBtn{
                            display: inline-block;
                            width:1.6rem;
                            height:0.64rem;
                            line-height: 0.64rem;
                            background:rgba(226,165,136,1);
                            border-radius:0.32rem;
                            font-size:0.26rem;
                            font-family:PingFang SC;
                            font-weight:500;
                            color:rgba(255,255,255,1);
                            text-align: center;
                        }
                    }
                }
            }
        }
    }
    .van-tab--active{
        color: #E2A588 !important;
    }
    .van-hairline--top-bottom:after, .van-hairline-unset--top-bottom:after{
        border:0 !important;
    }
    .van-search__content{
        border-radius:0.35rem !important;
    }
    .van-search__action{
        color:#E2A588 !important;
    }
    .van-search{
        margin-top: 0.2rem;
    }
     .mescroll {
			    position: fixed;
			    top: 0;
			    bottom: 0;
			    height: auto;
			  }
</style>
<template>
    <div class="index">
        <!-- <mescroll-vue ref="mescroll" :up="mescrollUp"  :down="mescrollDown" @init="mescrollInit"> -->
        <div class="topBar">
            <img src="../images/nav_ic_close.png" alt="" @click="goBack">
            <span class="title">首页</span>
            <img src="../images/line_ic_04.png" alt="" >
        </div>
        <!-- sticky -->
        <van-tabs v-model="active" class="tap" color="#E2A588" animated > 
            <van-tab title="班级管理">
                <!-- 搜索框 -->
                <van-search
                v-model="searchClassValue"
                show-action
                placeholder="请输入班级名称"
                @search="onSearch('class')"
                >
                <div slot="action" @click="onSearch('class')">搜索</div>
                </van-search>
                <!-- 班级列表 -->
                <div class="classList">
                    <van-list
                    v-model="loadingClass"
                    :finished="finishedClass"
                    finished-text="没有更多了"
                    @load="onLoadUpClass"
                    :immediate-check=false
                    >
                    <div class="oneClass" v-for="item in classList">
                            <table>
                                <tr>
                                    <td>班级名称：</td>
                                    <td>{{item.name}}</td>
                                </tr>
                                <tr>
                                    <td>课程名称：</td>
                                    <td>{{item.shiftName}}</td>
                                </tr>
                                <tr>
                                    <td>学生人数：</td>
                                    <td>{{item.studentNum}}</td>
                                </tr>
                                <tr>
                                    <td>课&#160;&#160;次：</td>
                                    <td>{{item.courseTimes}}</td>
                                </tr>
                                <tr>
                                    <td>上课进度：</td>
                                    <td>{{item.openChapterNum}}/{{item.numCountChapter}}</td>
                                </tr>
                                <tr>
                                    <td>上课时间：</td>
                                    <td>{{item.cycle|getWeek}}{{item.startTime}}</td>
                                </tr>
                                <tr>
                                    <td>课程进度：</td>
                                    <td>{{item.chapterName}}</td>
                                </tr>
                            </table>
                            <div class="bottom">
                                <span class="watchStudent" @click="goCheckStudent(item.id)">查看学生</span>
                                <span class="changeProgress" @click="goChangeProgress(item.id)">更改进度</span>
                            </div>
                    </div>
                    <!-- <div class="oneClass">
                            <table>
                                <tr>
                                    <td>班级名称：</td>
                                    <td>少儿集体班</td>
                                </tr>
                                <tr>
                                    <td>课程名称：</td>
                                    <td>少儿集体班</td>
                                </tr>
                                <tr>
                                    <td>学生人数：</td>
                                    <td>5</td>
                                </tr>
                                <tr>
                                    <td>课&#160;&#160;次：</td>
                                    <td>40</td>
                                </tr>
                                <tr>
                                    <td>上课进度：</td>
                                    <td>8/40</td>
                                </tr>
                                <tr>
                                    <td>上课时间：</td>
                                    <td>周三 08:00～09:50</td>
                                </tr>
                                <tr>
                                    <td>课程进度：</td>
                                    <td>第一章 开篇词>03 发刊词:自信社交</td>
                                </tr>
                            </table>
                            <div class="bottom">
                                <span class="watchStudent">查看学生</span>
                                <span class="changeProgress">更改进度</span>
                            </div>
                    </div> -->
                    </van-list>
                </div>
            </van-tab>
            <van-tab title="学生管理">
                <!-- 搜索框 -->
                <van-search
                v-model="searchStudentValue"
                show-action
                placeholder="请输入学生名称"
                @search="onSearch('student')"
                >
                <div slot="action" @click="onSearch('student')">搜索</div>
                </van-search>
                <!-- 学生列表 -->
                <div class="studentList">
                    <van-list
                    v-model="loadingStudent"
                    :finished="finishedStudent"
                    finished-text="没有更多了"
                    @load="onLoadUpStudent"
                    :immediate-check=false
                    >
                    <div class="oneStudent" v-for="item in studentList">
                        <div class="topMessage">
                            <img src="../images/card_tx_big.png" alt="" v-if="!item.avatar">
                            <img :src="item.avatar" alt="" v-else>
                            <div class="studentMessage">
                                <div class="studentId"> <span class="forward"> 学号：</span>{{item.serial}}</div>
                                <div class="otherMessage">
                                    <span><span class="forward"> 姓名：</span>{{item.nickName}}</span>
                                    <span><span class="forward"> 性别：</span>{{item.sex | getSex}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="progress">
                            课程进度：{{item.courseProcess}}
                        </div>
                        <div class="changeProgess">
                            <div class="changeProgessBtn" @click="goChangeProgress(item.classId,item.id,item.shId)">更改进度</div>
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
                            </div>
                        </div>
                        <div class="progress">
                            课程进度：第一章 开篇词>03 发刊词：自信社交...
                        </div>
                        <div class="changeProgess">
                            <div class="changeProgessBtn">更改进度</div>
                        </div>
                    </div> -->
                     </van-list>
                </div>
            </van-tab>
        </van-tabs>
        <!-- </mescroll-vue> -->
    </div>
</template>
<script>
// import MescrollVue from 'mescroll.js/mescroll.vue'
// import 'mescroll.js/mescroll.min.css'
    export default {
        data () {
            return {
                // tap 0：班级，1学生
                active: 0,
                // 搜索值
                searchStudentValue:'',
                searchClassValue:'',
                // 班级列表
                classList:[],
                // 学生列表
                studentList:[],
                // mescroll: null, // mescroll实例对象
                // mescrollDown:{
                //     user:false
                // },
                // mescrollUp: {
                //     use:true,
                //     auto:false,
                //     offset:0,
                //     callback: this.upCallback
                // },
                // 页数
                classPage:1,
                studentPage:1,
                // 页码
                classPageSize:10,
                studentPageSize:5,
                // 班级上拉加载
                loadingClass: false,
                finishedClass: false,
                // 学生上拉加载
                loadingStudent: false,
                finishedStudent: false
            }
        },
        components: {
			    // MescrollVue // 注册mescroll组件
		},
        mounted () {
            this.getClassManagement();
            this.getStudentManagement();
        },
        beforeDestroy () {

        },
        filters:{
            // 转换时间戳为日期
            getSex:function(value){
               switch(value){
                   case 1:
                       return '男'
                    break;
                   case 2:
                       return '女'
                    break;
               }
            },
            getWeek:function(value){
                switch (value){
                    case 1:
                        return '周一'
                    break;
                    case 2:
                        return '周二'
                    break;
                    case 3:
                        return '周三'
                    break;
                    case 4:
                        return '周四'
                    break;
                    case 5:
                        return '周五'
                    break;
                    case 6:
                        return '周六'
                    break;
                    case 7:
                        return '周日'
                    break;
                }
            }
        },
        methods: {
            // 班级列表
            getClassManagement(){
                const vm = this;
                let params = {
                    sessionId:vm.sessionId,
                    pageNumber:vm.classPage,
                    pageSize:vm.classPageSize,
                    // className:"",
                };
                vm.api(vm, "/api/web/index/classManagement.json", params, "post", function(res) {
                    let data = res.classListDTOList;
                    // data.map((item)=>{
                    //     let time = item.startTime.split(" ");
                    //     console.log("ti                                                        em",time);
                        
                    //     item.startTime = time[3];
                    // })
                    // console.log("vm.classList",vm.classList);
                    vm.loadingClass = false;
                    vm.classList = vm.classList.concat(data);
                    if(vm.classList.length>=res.count){
                        vm.finishedClass = true;
                    }
                });
            },
            // 学生列表
            getStudentManagement(){
                const vm = this;
                let params = {
                    sessionId:vm.sessionId,
                    pageNumber:vm.studentPage,
                    pageSize:vm.studentPageSize,
                    // studentName:"",
                };
                vm.api(vm, "/api/web/index/studentManagement.json", params, "post", function(res) {
                    let data = res.studentListDTO;
                    // console.log("vm.studentList",vm.studentList);
                    vm.studentList = vm.studentList.concat(data);
                    vm.loadingStudent = false;
                    // console.log("vm.studentList.length",vm.studentList.length);
                    if(vm.studentList.length>=res.count){
                        vm.finishedStudent = true;
                    }
                    // console.log("data",data);
                    // vm.$router.push({
                    //     name:'home'
                    // })
                });
            },
            // 搜索学生列表
            getSearchStudentManagement(){
                const vm = this;
                let params = {
                    sessionId:vm.sessionId,
                    pageNumber:vm.studentPage,
                    pageSize:vm.classPageSize,
                    itemParam:vm.searchStudentValue,
                };
                vm.api(vm, "/api/web/index/studentManagement.json", params, "post", function(res) {
                    let data = res.studentListDTO;
                    // console.log("vm.studentList",vm.studentList);
                    vm.studentList = vm.studentList.concat(data);
                    vm.loadingStudent = false;
                    // console.log("vm.studentList.length",vm.studentList.length);
                    if(vm.studentList.length>=res.count){
                        vm.finishedStudent = true;
                    }
                    // console.log("data",data);
                    // vm.$router.push({
                    //     name:'home'
                    // })
                });
            },
            // 搜搜班级列表
            getSearchClassManagement(){
                const vm = this;
                let params = {
                    sessionId:vm.sessionId,
                    pageNumber:vm.classPage,
                    pageSize:vm.studentPageSize,
                    itemParam:vm.searchClassValue,
                };
                vm.api(vm, "/api/web/index/classManagement.json", params, "post", function(res) {
                    let data = res.classListDTOList;
                    // console.log("vm.classList",vm.classList);
                    vm.loadingClass = false;
                    vm.classList = vm.classList.concat(data);
                    if(vm.classList.length>=res.count){
                        vm.finishedClass = true;
                    }
                });
            },
            goCheckStudent(shiftId){
                this.$router.push({
                    name: "checkStudent",
                    query: {
                        classId: shiftId
                    }
                });
            },
            goChangeProgress(classId,userId,shId){
                // console.log("classId",classId);
                this.$router.push({
                    name: "changeProgress",
                    query: {
                        classId: classId,
                        userId:userId,
                        // shiftId:shiftId,
                        shId :shId
                    }
                });
            },
            // 搜索
            onSearch(type){
                const vm = this;
                // let params = [];
                switch (type){
                    case 'class':
                        if(!vm.searchClassValue){
                            vm.$toast.fail('搜索值不可为空');
                            return;
                        }
                        vm.classList = [];
                        // console.log("type",type);
                        vm.classPage = 1;
                        vm.finishedClass = false;
                        vm.loadingClass = false;
                        vm.getSearchClassManagement();
                        // params = {
                        //     sessionId:vm.sessionId,
                        //     pageNumber:vm.classPage,
                        //     pageSize:5,
                        //     itemParam:vm.searchClassValue,
                        // };
                        // vm.api(vm, "/api/web/index/classManagement.json", params, "post", function(res) {
                        //     let data = res.classListDTOList;
                        //     vm.loadingClass = false;
                        //     vm.classList = vm.classList.concat(data);
                        //     if(vm.classList.length>=res.count){
                        //         vm.finishedClass = true;
                        //     }
                        // });
                        break;
                    case 'student':
                        if(!vm.searchStudentValue){
                            vm.$toast.fail('搜索值不可为空');
                            return;
                        }
                        vm.studentList = [];
                        vm.studentPage = 1;
                        vm.finishedStudent = false;
                        vm.loadingStudent = false;
                        vm.getSearchStudentManagement();
                        // console.log("type",type);
                        // params = {
                        //     sessionId:vm.sessionId,
                        //     pageNumber:vm.studentPage,
                        //     pageSize:10,
                        //     itemParam:vm.searchStudentValue,
                        // };
                        // vm.api(vm, "/api/web/index/studentManagement.json", params, "post", function(res) {
                        //     let data = res.studentListDTO;
                        //     vm.studentList = vm.studentList.concat(data);
                        //     vm.loadingStudent = false;
                        //     if(vm.studentList.length>=res.count){
                        //         vm.finishedStudent = true;
                        //     }
                        // });
                        break;

                }
            },
            //  上拉加载班级列表
            onLoadUpClass(){
                // console.log("onLoad onLoad onLoad");
                this.classPage = this.classPage+1;
                if(this.searchClassValue){
                    this.getSearchClassManagement();
                }else{
                    this.getClassManagement();
                }
                
            },
            //  上拉加载学生列表
            onLoadUpStudent(){
                // console.log("onLoad onLoad onLoad");
                this.studentPage = this.studentPage+1;
                if(this.searchStudentValue){
                    this.getSearchStudentManagement();
                }else{
                     this.getStudentManagement();
                }
               
            },
            goBack(){
                this.$router.go(-1);
            },
            // mescroll组件初始化的回调,可获取到mescroll对象
			mescrollInit (mescroll) {
			    this.mescroll = mescroll  // 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
                // console.log("mescroll",mescroll);
            },
            // 上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
            upCallback (page, mescroll) {
                // console.log("upCallback",page,mescroll);
                if(this.active==0){
                    this.classPage +=1;
                    this.getClassManagement();
                }else{
                    this.studentPage +=1;
                    this.getStudentManagement();
                }
            },
            unique(string1,string2){
                var longString = string1+","+string2;
                var arr = longString.split(",")
                var result = (Array.from(new Set(arr))).join(",");
                console.log("result",result);
            }
        }
    }
</script>
