
<style lang="less">
    .classReviewDetail{
        .classTitle{
            font-size:0.3rem;
            font-family:PingFang SC;
            font-weight:bold;
            color:rgba(51,51,51,1);
            border-left: 0.08rem solid rgba(226,165,136,1);
            padding-left: 0.25rem;
            margin-top: 0.32rem;
        }
        .tip{
            font-size:0.28rem;
            font-family:PingFang SC;
            font-weight:500;
            color:rgba(153,153,153,1);
        }
        .classContent{
            padding: 0 0.3rem;
            .classInput{
                width:6.9rem !important;
                height:3.41rem !important;;
                background:rgba(247,247,247,1) !important;
                margin:0.4rem 0 !important;
                font-size:0.28rem !important;
            }
            .studentList{
                margin-top: 0.3rem;
                .oneStudent{
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 0.3rem;
                    .left{
                        font-size:0.28rem;
                        font-family:PingFang SC;
                        font-weight:500;
                        color:rgba(51,51,51,1);
                        display: inline-block;
                        img{
                            width:0.9rem;
                            height:0.9rem;
                            border-radius:50%;
                            vertical-align: middle;
                            margin-right: 0.1rem;
                        }
                    }
                    .right{
                        display: inline-block;
                        font-size:0.24rem;
                        color:rgba(153,153,153,1);
                        height: 0.8rem;
                        line-height: 0.8rem;
                    }
                }
            }
            .saveBtn{
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
                margin: 0.6rem auto;
            }
        }
    }
    .van-cell{
        // width:6.9rem !important;
        // height:3.41rem !important;;
        background:transparent !important;
        // margin:0.4rem 0 !important;
        font-size:0.28rem !important;
    }
    // .van-uploader__upload{
    //     width:2.1rem !important;
    //     height:2.1rem !important;
    //     margin-top: 0.36rem !important;
    // }
    // .van-uploader__file{
    //     width:2.1rem !important;
    //     height:2.1rem !important;
    //     margin-top: 0.36rem !important;
    // }
    // .van-uploader__preview-image{
    //     width:2.1rem !important;
    //     height:2.1rem !important;
    //     margin-top: 0.36rem !important;
    // }
    // .van-uploader__preview-delete{
    //     top:0.25rem !important;
    //     right: -0.1rem !important;
    // }
    .addComment{
        .score{
            font-size:0.28rem;
            font-family:PingFang SC;
            font-weight:500;
            color:rgba(51,51,51,1);
            display: flex;
            justify-content: space-between;
            align-items: center;
            .score-icon{
                img{
                    width: 0.64rem;
                }
            }
        }
        .picList{
            img{
                width: 2.1rem;
                height: 2.1rem;
                margin-right: 0.1rem;
            }
        }
    }
    .checkComment{
        .content{
            font-size:0.28rem;
            font-family:PingFang SC;
            font-weight:500;
            color:rgba(102,102,102,1);
            padding:0.38rem 0.25rem;
        }
    }
</style>
<template>
    <div class="classReviewDetail addComment checkComment">
        <div class="topBar">
            <img src="../images/nav_ic_close.png" alt="" @click="goBack">
            <span class="title">老师点评</span>
            <img src="../images/line_ic_04.png" alt="">
        </div>
        <div class="classTitle">点评内容</div>
        <div class="classContent">
            <div class="content">
             {{detail.content}}
            </div>
            <div class="score">
                <span>默认维度</span>
                <span class="score-icon">
                    <!-- <img src="../images/ic_star_s.png" alt="">
                    <img src="../images/ic_star_s.png" alt="">
                    <img src="../images/ic_star_n.png" alt="">
                    <img src="../images/ic_star_n.png" alt="">
                    <img src="../images/ic_star_n.png" alt=""> -->
                    <van-rate
                    v-model="rate"
                    allow-half
                    color="rgb(225,166,138)"
                    :size = 35
                    />
                </span>
            </div>
            <!-- 上传视频图片 -->
            <!-- <van-uploader v-model="fileList" multiple accept="image/*,video/*" :after-read="afterRead"/> -->
            <!-- 上传图片 -->
            <div class="uploadTitle">图片</div>
            <!-- <van-uploader v-model="fileList" multiple accept="image/*" :after-read="afterRead"/> -->
            <div class="picList">
                <img :src="item.url" alt="" v-for="item in imgList">
                <!-- <img src="../images/card_tx_big.png" alt="">
                <img src="../images/card_tx_big.png" alt=""> -->
            </div>
            <!-- 上传视频 -->
            <div class="uploadTitle">视频</div>
            <div class="fileList">
                <div class="oneVideo" v-for="item in videoList">
                    <video :src="item.url" controls></video>
                </div>
                <!-- <div class="oneVideo">
                    <video src="http://yuanfa-gz.com:16688/resources/upload/image/202001/1adeba53-6eee-4c56-aa07-82efe0e5f666.mp4" controls></video>
                </div> -->
                 <!-- <van-uploader accept="video/*" :after-read="afterRead"/> -->
            </div>
            <div class="saveBtn" @click="goEdit">重新编辑</div>
        </div>
        
    </div>
</template>
<script>
    export default {
        data () {
            return {
                // content:'',
                fileList:[],
                // 评价ID
                evaluationId:'',
                // 课程id
                courseId:'',
                detail:{},
                rate:0,
                // 图片列表
                imgList:[],
                // 视频列表
                videoList:[],
            }
        },
        mounted () {
            let evaluationId = this.$route.query.evaluationId;
            if(evaluationId){
                this.evaluationId = evaluationId;
            }
            let courseId = this.$route.query.courseId;
            if(courseId){
                this.courseId = courseId;
            }
            this.viewCommentStudent();
        },
        beforeDestroy () {

        },
        methods: {
            // afterRead(file){
            //     console.log("file",file);
                
            // },
            // 查看学生点评
            viewCommentStudent(){
                const vm = this;
                let params = {
                    sessionId:vm.sessionId,
                    id:vm.evaluationId,
                };
                vm.api(vm, "/api/web/index/viewCommentStudent.json", params, "post", function(res) {
                    let data = res;
                    vm.detail = data;
                    vm.rate = Number(data.studentScopesValue);
                    vm.imgList = data.evalutionImageList.filter((item)=>{
                         return item.type==1
                    })
                    vm.videoList = data.evalutionImageList.filter((item)=>{
                         return item.type==2
                    })
                    if(vm.imgList.length>9){
                        vm.imgList.length = 9;
                    }
                    if(vm.videoList.length>3){
                        vm.videoList.length = 3;
                    }
                    console.log("data",res);
                });
            },
            // 重新编辑
            goEdit(){
                const vm = this;
                this.$router.push({
                    name: "addComment",
                    query: {
                        courseId: vm.courseId,
                        evaluationId:vm.evaluationId,
                        edit:true
                    }
                });
            },
            goBack(){
                this.$router.go(-1);
            },
        }
    }
</script>
