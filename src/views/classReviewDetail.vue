
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
        .uploadTitle{
            font-size: 0.3rem;
            font-family: PingFang SC;
            font-weight: 700;
            color: #333;
            margin: 0.25rem 0;
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
            .fileList{
                margin-top: 0.3rem;
                img{
                    width: 2.2rem;
                    height: 2.2rem;
                }
                video{
                    width: 2.2rem;
                    height: 2.2rem;
                }
                .oneVideo{
                    display: inline-block;
                    width: 2.2rem;
                    margin-right: 0.05rem;
                }
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
    .van-uploader{
        vertical-align: top !important;
    }
    .van-uploader__upload{
        width:2.1rem !important;
        height:2.1rem !important;
        // margin: 0 !important;
    }
    // .van-uploader__file{
    //     width:2.1rem !important;
    //     height:2.1rem !important;
    //     // margin-top: 0.36rem !important;
    // }
    .van-uploader__preview-image{
        width:2.1rem !important;
        height:2.1rem !important;
        // margin-top: 0.36rem !important;
    }
    .van-uploader__preview-delete{
        top:-0.1rem !important;
        right: -0.1rem !important;
    }
</style>
<template>
    <div class="classReviewDetail">
        <div class="topBar">
            <img src="../images/nav_ic_close.png" alt="" @click="goBack">
            <span class="title">上课点评详情</span>
            <img src="../images/line_ic_04.png" alt="">
        </div>
        <div class="classTitle">上课内容</div>
        <div class="classContent">
            <div class="classInput">
            <van-field
            v-model="content" 
            rows="6"
            autosize
            type="textarea"
            maxlength="100"
            placeholder="请输入上课内容"
            show-word-limit
            />
            </div>
            <div class="tip">（上课内容可上传最多9张图片和3个视频）</div>
            <!-- 上传图片 -->
            <div class="uploadTitle">上传图片</div>
            <van-uploader v-model="imgFileList" :max-count="9" accept="image/*" multiple :after-read="afterReadImg" :before-delete="deleteImg"/>
            <!-- 上传视频 -->
            <div class="uploadTitle">上传视频</div>
            <div class="fileList">
                <div class="oneVideo" v-for="(item,index) in videoFileList">
                    <video :src="item.url" controls :poster="item.poster"></video>
                    <van-button type="warning" block @click="deleteVideo(index)">删除</van-button>
                </div>
                <!-- <div class="oneVideo">
                    <video src="http://yuanfa-gz.com:16688/resources/upload/image/202001/1adeba53-6eee-4c56-aa07-82efe0e5f666.mp4" controls></video>
                    <van-button type="warning" block >删除</van-button>
                </div> -->
                 <van-uploader accept="video/*" :after-read="afterReadVideo" multiple v-if="videoFileList.length<3"/>
            </div>
           <!-- 学生列表 -->
            <div class="studentList">
                <div class="oneStudent" @click="checkComment(item.evaluationId,item.status)" v-for="item in detail.list" >
                    <div class="left" v-if="item">
                        <img src="../images/card_tx_big.png" alt="" v-if="!item.avatar ">
                        <img :src="item.avatar" alt="" v-else>
                        <span>{{item.nickname }}</span>
                    </div>
                    <div class="right" v-if="item">
                        <span v-if="item.status==1">查看点评 ></span>
                        <span v-else>立即点评 ></span>
                    </div>
                </div>
                <!-- <div class="oneStudent" @click="addComment">
                    <div class="left">
                        <img src="../images/card_tx_big.png" alt="">
                        <span>紫晓静</span>
                    </div>
                    <div class="right">
                        <span>立即点评 ></span>
                    </div>
                </div> -->
            </div>
            <div class="saveBtn" @click="saveClassReviewsDetails">保存</div>
        </div>
        
    </div>
</template>
<script>
    export default {
        data () {
            return {
                content:'',
                fileList:[],
                // 上课点评详情
                detail:{},
                courseId:'9439d44e-8f76-4214-a79a-46f507779de2',
                // 图片列表
                imgFileList:[],
                // 视频列表
                videoFileList:[],
                imgNum:0,
                // curImgLength:0

            }
        },
        mounted () {
            let courseId = this.$route.query.courseId;
            if(courseId){
                this.courseId = courseId;
            }
            this.getDetail();
        },
        beforeDestroy () {

        },
        methods: {
            // 上传图片
            afterReadImg(file){
                // console.log("file",file);
                // file.status = 'uploading';
                // file.message = '上传中...';
                const vm = this;
                let fileArr = [];
                let num = 1;
                if(!Array.isArray(file)){
                    fileArr.push(file);
                }else{
                    fileArr = file;
                }
                let arrLength = fileArr.length;
                // console.log("arrLength",arrLength);
                fileArr.map((item,index)=>{
                    // console.log("vm.imgNum",vm.imgNum);
                    item.status = 'uploading';
                    item.message = '上传中...';
                    let params = {
                        sessionId:vm.sessionId,
                        file:item.file
                    };
                    vm.api(vm, "/api/app/common/upload", params, "post", function(res) {
                        let data = res;
                        data.isImage = true;
                        data.index = vm.imgNum;
                        // data.url = data.url + ".jpg"                        // let url = data.url;
                        // console.log("num",vm.imgNum);
                        vm.imgFileList.splice(vm.imgNum,1,data);
                        // vm.imgFileList.push(data);
                        item.status = 'doned';
                        if(num==arrLength){
                            vm.$toast.success('上传图片成功！');
                        }
                        // console.log("vm.imgNum",vm.imgNum,num,arrLength);
                        if(vm.imgNum>=8){
                            vm.$toast.fail('最多上传9张');
                            return;
                        }
                        if(vm.imgNum<8){
                            vm.imgNum++;
                        }
                        num++;
                    });
                })
            },
            // 上传视频
            afterReadVideo(file){
                // console.log("afterReadVideo file",file);
                this.$toast.loading({
                    message: '上传视频中...',
                    forbidClick: true,
                    duration: 0
                });
                const vm = this;
                let fileArr = [];
                let num = 0;
                if(!Array.isArray(file)){
                    fileArr.push(file);
                }else{
                    fileArr = file;
                }
                let arrLength = fileArr.length; 
                fileArr.map(item=>{
                    let params = {
                        sessionId:vm.sessionId,
                        fileType:'media',
                        file:item.file
                    };
                    vm.api(vm, "/api/app/common/upload", params, "post", function(res) {
                        let data = res;
                        data.poster = data.url+"?vframe/jpg/offset/1/w/220/h/220";
                        // file.status = 'doned';
                        // vm.$toast.success('上传视频成功！');
                        vm.videoFileList.push(data);
                        num++;
                        if(num==arrLength){
                             vm.$toast.clear();
                        }
                        // if(vm.videoFileList.length==3){
                        //     vm.$toast.fail('最多上传3个视频');
                        // }
                        // vm.content = data.content;
                        // vm.detail = data;
                        // console.log("data",res);
                    });
                })
            },
            // 获取详情
            getDetail(){
                const vm = this;
                let params = {
                    sessionId:vm.sessionId,
                    itemParam:vm.courseId
                };
                vm.api(vm, "/api/web/index/classReviewsDetails.json", params, "post", function(res) {
                    let data = res;
                    vm.content = data.content;
                    vm.detail = data;
                    if(data.videoImgResultList){
                        vm.imgFileList = data.videoImgResultList.filter((item)=>{
                         return item.type==2
                        })
                        vm.videoFileList = data.videoImgResultList.filter((item)=>{
                            return item.type==1
                        })
                        if(vm.imgFileList.length>9){
                            vm.imgFileList.length = 9;
                        }
                        if(vm.videoFileList.length>3){
                            vm.videoFileList.length = 3;
                        }
                    }
                    // console.log("data",res);
                    
                });
            },
            // 保存详情
            saveClassReviewsDetails(){
                const vm = this;
                let imgArr = vm.imgFileList;
                let imgUrlArr = [];
                if(imgArr.length>0){
                    imgArr.map(item=>{
                        imgUrlArr.push(item.url);
                    })
                }
                let videoArr = vm.videoFileList;
                let videoUrlArr = [];
                if(videoArr.length>0){
                    videoArr.map(item=>{
                        videoUrlArr.push(item.url);
                    })
                }
                let imgUrl = imgUrlArr.join("###");
                let videoUrl = videoUrlArr.join("###");
                // console.log("save imgUrl",imgUrl);
                // console.log("save videoUrl",videoUrl);
                let params = {
                    sessionId:vm.sessionId,
                    content:vm.content,
                    courseId:vm.courseId,
                    imgUrl:imgUrl,
                    voiceUrl:videoUrl
                };
                vm.api(vm, "/api/web/index/saveClassReviewsDetails.json", params, "post", function(res) {
                    let data = res;
                    // vm.content = data.content;
                    // vm.detail = data;
                    vm.$toast.success('保存成功！');
                    vm.$router.back(-1)
                    // console.log("data",res);
                    
                });
            },
            // 跳转学生点评或查看点评
            checkComment(id,type){
                const vm = this;
                let name = 'checkComment';
               if(type==2){
                   name = 'addComment'
               }
                this.$router.push({
                    name:name,
                    query: {
                        evaluationId: id,
                        courseId:vm.courseId
                    }
                })
            },
            // 删除视频
            deleteVideo(index){
                const vm = this;
                // console.log("index",index);
                vm.$dialog.confirm({
                    message: '确认删除该视频？'
                }).then(() => {
                // on confirm
                    vm.videoFileList.splice(index,1)
                }).catch(() => {
                // on cancel
                });
            },
            // 删除图片
            deleteImg(file){
                const vm = this;
                console.log("deleteImg",file);
                let cancel = true;
                vm.$dialog.confirm({
                    message: '确认删除该图片？'
                }).then(() => {
                // on confirm
                vm.imgFileList.splice(file.index,1);
                vm.imgFileList.map((item,index)=>{
                    item.index = index;
                })
                vm.imgNum = vm.imgFileList.length;
                    return true;
                }).catch(() => {
                    // on cancel
                    return false;
                });
            },
            goBack(){
                // this.$router.go(-1);
                this.$router.push({
                        name:'classReview',
                        query: {
                            detailBack: true
                        }
                })
            },
            // addComment(){
            //     this.$router.push({
            //         name:'addComment'
            //     })
            // },
        }
    }
</script>
