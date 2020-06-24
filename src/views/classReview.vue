
<style scoped lang="less">
    .classReview{
        .timePicker{
            padding:0.15rem 0.3rem;
            .onePicker{
                font-size:0.3rem;
                font-family:PingFang SC;
                font-weight:500;
                color:rgba(153,153,153,1);
                border:0.01rem solid rgba(210,210,210,1);
                border-radius:0.1rem;
                width:2.7rem;
                padding:0.15rem 0.2rem;
                display: inline-block;
                img{
                    width: 0.4rem;
                    vertical-align: middle;
                    margin-left: 0.3rem;
                }
            }
            .centerWord{
                padding:0 0.15rem 0 0.15rem;
            }
            .chooseIcon{
                width: 0.5rem;
                vertical-align: middle;
                margin-left: 0.1rem;
            }
        }
        .outerAll{
            background-color: rgb(250, 247, 248);
            // height: 100vh;
            padding-bottom: 1rem;

        }
        .classList{
            width: 100%;
            padding-top: 0.2rem;
            .oneClass{
                font-size:0.34rem;
                font-family:PingFang SC;
                font-weight:500;
                color:rgba(51,51,51,1);
                background:rgba(255,255,255,1);
                padding:0.36rem 0.31rem;
                margin-bottom: 0.2rem;
                .firstLine{
                    display: flex;
                    justify-content: space-between;
                    .noReview{
                        font-size:0.26rem;
                        color:rgba(239,76,76,1);
                    }
                    .hasReview{
                        font-size:0.26rem;
                        color:rgba(153,153,153,1);
                    }
                }
                .class{
                    font-size:0.3rem;
                    color:rgba(102,102,102,1);
                    margin: 0.2rem 0;
                }
                .time{
                    font-size:0.3rem;
                    color:rgba(102,102,102,1);
                    img{
                        width:0.4rem;
                        vertical-align: middle;
                    }
                }
                
            }
        }
        .splitLine{
            font-size:0.24rem;
            font-family:PingFang SC;
            font-weight:500;
            color:rgba(153,153,153,1);
            line-height:0.38rem;
            text-align: center;
        }
    }
    .van-picker{
        width: 100%;
        position: fixed !important;
        bottom: 0 !important;
        z-index: 100;
    }
</style>
<template>
    <div class="classReview">
        <div class="topBar">
            <img src="../images/nav_ic_close.png" alt="" @click="goBack">
            <span class="title">上课点评</span>
            <img src="../images/line_ic_04.png" alt="">
        </div>
        <div class="timePicker">
            <div class="onePicker" @click="showChooseDatePop('start')">
                <span>{{startTime}}</span>
                <img src="../images/ic_down.png" alt="">
            </div>
            <span class="centerWord">至</span>
            <div class="onePicker" @click="showChooseDatePop('end')">
                <span>{{endTime}}</span>
                <img src="../images/ic_down.png" alt="">
            </div>
            <img class="chooseIcon" src="../images/ic_xiala_big.png" alt="" @click="showRecentPop">
        </div>
        <!-- 班级列表 -->
        <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoadUpClass"
        :immediate-check=false
        >
        <div class="outerAll">
            <!-- 已点评 -->
            <div class="classList">
                <div class="oneClass" @click="goDetail(item.courseId)" v-for="item in noReviewClassList">
                    <div class="firstLine">
                        <span>{{item.className}}</span>
                        <span class="noReview">未点评</span>
                    </div>
                    <div class="class">教室：{{item.classroomName}}</div>
                    <div class="time">
                        <img src="../images/ic_time.png" alt="">
                        <span>{{item.startTimeString}}</span>
                    </div>
                </div>
                <!-- <div class="oneClass" @click="goDetail()">
                    <div class="firstLine">
                        <span>班级名称</span>
                        <span class="noReview">未点评</span>
                    </div>
                    <div class="class">教室：S4</div>
                    <div class="time">
                        <img src="../images/ic_time.png" alt="">
                        <span>2019-02-03 08:00-08:40</span>
                    </div>
                </div> -->
            </div>
            <div class="splitLine">以上为未点评信息</div>
            <!-- 未点评 -->
            <div class="classList">
                <div class="oneClass" @click="goDetail(item.courseId)" v-for="item in hasReviewClassList">
                    <div class="firstLine">
                        <span>{{item.className}}</span>
                        <span class="hasReview">已点评</span>
                    </div>
                    <div class="class">教室：{{item.classroomName}}</div>
                    <div class="time">
                        <img src="../images/ic_time.png" alt="">
                        <span>{{item.startTimeString}}</span>
                    </div>
                </div>
                <!-- <div class="oneClass">
                    <div class="firstLine">
                        <span>班级名称</span>
                        <span class="hasReview">已点评</span>
                    </div>
                    <div class="class">教室：S4</div>
                    <div class="time">
                        <img src="../images/ic_time.png" alt="">
                        <span>2019-02-03 08:00-08:40</span>
                    </div>
                </div> -->
            </div>
        </div>
        </van-list>
        <van-action-sheet v-model="showRecent" :actions="actions" @select="onSelect" cancel-text="取消"/>
        <van-datetime-picker
        v-model="currentDate"
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm = "chooseDate"
        @cancel="cancelChooseDate"
        v-show="showChooseDate"
        />
        <van-overlay :show="showChooseDate" @click="showChooseDate = false" />
    </div>
</template>
<script>
    export default {
        data () {
            return {
                // 最近几天的数据
                chooseRecentType:"",
                showRecent: false,
                actions: [
                    { name: '今天',id:1 },
                    { name: '最近3天',id:2 },
                    { name: '最近7天',id:3},
                    { name: '最近30天',id:4},
                    // { name: '最新三天', subname: '描述信息' }
                ],
                // 选择日期数据
                startTime:'开始日期',
                endTime:'结束日期',
                // 时间戳
                startTimeStamp:'',
                endTimeStamp:'',
                showChooseDate:false,
                minDate: new Date(2018, 0, 1),
                maxDate: new Date(2025, 10, 1),
                currentDate: new Date(),
                // 是否选择的是开始时间
                isStart:true,
                // 未点评列表
                noReviewClassList:[],
                // 已点评列表
                hasReviewClassList:[],
                pageNumber:1,
                loading: false,
                finished: false
            }
        },
        mounted () {
            
            let detailBack = this.$route.query.detailBack;
            console.log("detailBack",detailBack);
            
            if(detailBack){
                this.startTime = this.getCookie('startTime');
                this.endTime = this.getCookie('endTime');
                this.startTimeStamp = this.getCookie('startTimeStamp');
                this.endTimeStamp = this.getCookie('endTimeStamp');
                console.log("sdfsd",this.startTime,this.endTime,this.startTimeStamp,this.endTimeStamp );
            }
            this.getClassReviews();
        },
        beforeDestroy () {

        },
        methods: {
            // 上拉刷新
            onLoadUpClass() {
                // console.log("onLoadonLoadonLoadonLoad");
                this.pageNumber = this.pageNumber+1;
                this.getClassReviews();
            },
            // 选择最近几天
            onSelect(item) {
                // 默认情况下点击选项时不会自动收起
                // 可以通过 close-on-click-action 属性开启自动收起
                this.showRecent = false;
                this.chooseRecentType = item.id;
                console.log(item.id);
                let today = new Date();
                // let today = new Date(1583048398000);
                let date = today.getDate();
                // 结束的都是今天
                this.endTime = this.date(today);
                this.endTimeStamp = today.getTime();
                this.addCookie("endTime",this.endTime);
                this.addCookie("endTimeStamp",this.endTimeStamp);
                // 开始的日期
                switch(item.id){
                    // 今天
                    case 1:
                        this.startTime = this.date(today);
                        this.startTimeStamp = today.getTime();
                        this.addCookie("startTime",this.startTime);
                        this.addCookie("startTimeStamp",this.startTimeStamp);
                    break;
                    // 最近3天
                    case 2:
                        today.setDate(date-2)
                        this.startTime = this.date(today);
                        this.startTimeStamp = today.getTime();
                        this.addCookie("startTime",this.startTime);
                        this.addCookie("startTimeStamp",this.startTimeStamp);
                        break;
                    // 最近7天
                    case 3:
                        today.setDate(date-6)
                        this.startTime = this.date(today);
                        this.startTimeStamp = today.getTime();
                        this.addCookie("startTime",this.startTime);
                        this.addCookie("startTimeStamp",this.startTimeStamp);
                        break;
                    // 最近30天
                    case 4:
                        today.setDate(date-29)
                        this.startTime = this.date(today);
                        this.startTimeStamp = today.getTime();
                        this.addCookie("startTime",this.startTime);
                        this.addCookie("startTimeStamp",this.startTimeStamp);
                        break;
                        
                }
                this.getClassReviews('search');
            },
            // 显示最近几天选择器
            showRecentPop(){
                this.showRecent = true;
            },
            // 选择日期
            chooseDate(value){
                // console.log("value",value.getTime());
                let date = this.date(value);
                if(this.isStart){
                    this.startTime = date;
                    this.startTimeStamp = value.getTime();
                    this.addCookie("startTime",this.startTime);
                    this.addCookie("startTimeStamp",this.startTimeStamp);
                }else{
                    this.endTime = date;
                    this.endTimeStamp = value.getTime();
                    this.addCookie("endTime",this.endTime);
                    this.addCookie("endTimeStamp",this.endTimeStamp);
                }
                this.showChooseDate = false;
                if(this.endTimeStamp&&this.startTimeStamp){
                    if(this.endTimeStamp<this.startTimeStamp){
                        this.$toast.fail('结束事件不得早于开始时间');
                        this.endTime = '结束时间';
                        this.endTimeStamp = "";
                        this.addCookie("endTimeStamp",this.endTimeStamp);
                        this.addCookie("endTime",this.endTime);
                    }
                }
                if(this.startTime!='开始时间'&&this.endTime!='结束时间'){
                    this.getClassReviews('search');
                }
                
            },
            // 上课点评
            getClassReviews(search){
                const vm = this;
                // console.log("search",search);
                if(search){
                    vm.hasReviewClassList = [];
                    vm.noReviewClassList = [];
                    vm.pageNumber = 1;
                }
                let params = {
                    sessionId:vm.sessionId,
                    pageNumber:vm.pageNumber,
                    pageSize:10,
                    startTime:vm.startTimeStamp,
                    endTime:vm.endTimeStamp,
                    // type:"",
                };
                vm.api(vm, "/api/web/index/classReviews.json", params, "post", function(res) {
                    let data = res;
                    data.list.map(item=>{
                        if(item.newStatus==1){
                            vm.hasReviewClassList.push(item);
                        }else{
                            vm.noReviewClassList.push(item);
                        }
                    })
                    // 加载完本次的数据了
                    vm.loading = false;
                    // 全部数据加载完成，关闭上拉加载
                    if(vm.hasReviewClassList.length+vm.noReviewClassList.length >=data.count){
                        vm.finished = true;
                    }
                    // vm.noReviewclassList = data.list;
                    // hasReviewClassList
                    // console.log("data",data);
                    // console.log("vm.hasReviewClassList",vm.hasReviewClassList);
                    // console.log("vm.noReviewclassList",vm.noReviewClassList);
                    // vm.$router.push({
                    //     name:'home'
                    // })
                });
            },
            // 显示日期选择器
            showChooseDatePop(type){
                if(type=='start'){
                    this.isStart = true;
                }else{
                    this.isStart = false;
                }
                this.showChooseDate = true;
            },
            // 隐藏日期选择器
            cancelChooseDate(){
                this.showChooseDate = false;
            },
            // 转换为日期
            date:function(time){
                // var time = new Date(value);
                var y = time.getFullYear(); //getFullYear方法以四位数字返回年份
                var M = time.getMonth() + 1; // getMonth方法从 Date 对象返回月份 (0 ~ 11)，返回结果需要手动加一
                var d = time.getDate(); // getDate方法从 Date 对象返回一个月中的某一天 (1 ~ 31)
                // var h = time.getHours(); // getHours方法返回 Date 对象的小时 (0 ~ 23)
                // var m = time.getMinutes(); // getMinutes方法返回 Date 对象的分钟 (0 ~ 59)
                // // var s = time.getSeconds(); // getSeconds方法返回 Date 对象的秒数 (0 ~ 59)
                // if(m<10){
                //     m = "0"+m;
                // }
                return y + '/' + M + '/' + d
                // + ':' + s;
            },
            goDetail(courseId){
                this.$router.push({
                    name: "classReviewDetail",
                    query: {
                        courseId: courseId
                    }
                });
            },
            goBack(){
                this.$router.go(-1);
            },
        }
    }
</script>
