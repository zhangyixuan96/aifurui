
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
            margin: 0.1rem 0;
            .score-icon{
                img{
                    width: 0.64rem;
                }
            }
        }
    }
</style>
<template>
    <div class="classReviewDetail addComment">
        <div class="topBar">
            <img src="../images/nav_ic_close.png" alt="" @click="goBack">
            <span class="title">老师点评</span>
            <img src="../images/line_ic_04.png" alt="">
        </div>
        <div class="classTitle">点评内容</div>
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
            <div class="tip">（上课内容可上传最多9张图片和3个视频）</div>
            <!-- 上传图片 -->
            <div class="uploadTitle">上传图片</div>
            <van-uploader v-model="imgFileList" :max-count="9"  multiple accept="image/*" :after-read="afterReadImg" :before-delete="deleteImg"/>
            <!-- 上传视频 -->
            <div class="uploadTitle">上传视频</div>
            <div class="fileList">
                <div class="oneVideo" v-for="(item,index) in videoFileList">
                    <video :src="item.url" controls></video>
                    <van-button type="warning" block @click="deleteVideo(index)">删除</van-button>
                </div>
                <!-- <div class="oneVideo">
                    <video src="http://yuanfa-gz.com:16688/resources/upload/image/202001/1adeba53-6eee-4c56-aa07-82efe0e5f666.mp4" controls></video>
                    <van-button type="warning" block >删除</van-button>
                </div> -->
                 <van-uploader accept="video/*" v-if="videoFileList.length<3" :after-read="afterReadVideo" multiple/>
            </div>
            <div class="saveBtn" @click="commentStudent">保存</div>
        </div>
        
    </div>
</template>
<script>
    export default {
        data () {
            return {
                // 点评内容
                content:'',
                // 图片列表
                imgFileList:[],
                // 视频列表
                videoFileList:[],
                // 点评ID
                evaluationId:'',
                // 排课记录ID
                courseId:'',
                // 评分
                rate:0,
                imgNum:0,
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
            let edit = this.$route.query.edit;
            if(edit){
                this.viewCommentStudent();
            }
        },
        beforeDestroy () {

        },
        methods: {
            // // 上传图片
            // afterReadImg(file){
            //     // console.log("file",file.file);
            //     file.status = 'uploading';
            //     file.message = '上传中...';
            //     const vm = this;
            //     let params = {
            //             sessionId:vm.sessionId,
            //             file:file.file
            //         };
            //         vm.api(vm, "/api/app/common/upload", params, "post", function(res) {
            //             let data = res;
            //             file.status = 'doned';
            //             data.isImage = true;
            //             // let url = data.url;
            //             // console.log("forimg",vm.imgFileList);
            //             vm.$toast.success('上传图片成功！');
            //             vm.imgFileList.splice(vm.imgFileList.length-1,1);
            //             vm.imgFileList.push(data);
            //             // console.log("img",vm.imgFileList);
            //             // vm.content = data.content;
            //             // vm.detail = data;
            //             // console.log("data",res);
            //         });
            // },
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
            // // 上传视频
            // afterReadVideo(file){
            //     const vm = this;
            //     this.$toast.loading({
            //         message: '上传视频中...',
            //         forbidClick: true,
            //         duration: 0
            //     });
            //     let params = {
            //             sessionId:vm.sessionId,
            //             file:file.file,
            //             fileType:'media'
            //         };
            //         vm.api(vm, "/api/app/common/upload", params, "post", function(res) {
            //             let data = res;
            //             // vm.$toast.success('上传视频成功！');
            //             vm.videoFileList.push(data);
            //             vm.$toast.clear();
            //             // vm.content = data.content;
            //             // vm.detail = data;
            //             // console.log("data",res);
            //         });
            // },
            // 上传视频
            afterReadVideo(file){
                console.log("afterReadVideo file",file);
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
            // 点评学生
            commentStudent(){
                this.$router.back(-1)
                const vm = this;
                // let allArr = vm.imgFileList.concat(vm.videoFileList);
                // let urlArr = [];
                // if(allArr.length>0){
                //     allArr.map(item=>{
                //         urlArr.push(item.url);
                //     })
                // }
                // let url = urlArr.join("###");
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
                let params = {
                    sessionId:vm.sessionId,
                    evaluationId:vm.evaluationId,
                    latitude:String(vm.rate),
                    content:vm.content,
                    courseId:vm.courseId,
                    imgUrl:imgUrl,
                    voiceUrl:videoUrl
                };
                vm.api(vm, "/api/web/index/commentStudent.json", params, "post", function(res) {
                    let data = res;
                    vm.$toast.success('点评成功');
                    // vm.content = data.content;
                    // vm.detail = data;
                    vm.$router.back(-1)
                    // console.log("data",res);
                    
                });
            },
            // 查看学生点评
            viewCommentStudent(){
                const vm = this;
                let params = {
                    sessionId:vm.sessionId,
                    id:vm.evaluationId,
                };
                vm.api(vm, "/api/web/index/viewCommentStudent.json", params, "post", function(res) {
                    let data = res;
                    // vm.detail = data;
                    vm.content = data.content;
                    vm.rate = Number(data.studentScopesValue);
                    vm.imgFileList = data.evalutionImageList.filter((item)=>{
                         return item.type==1
                    })
                    vm.videoFileList = data.evalutionImageList.filter((item)=>{
                         return item.type==2
                    })
                    if(vm.imgFileList.length>9){
                        vm.imgFileList.length = 9;
                    }
                    vm.imgFileList.map(item=>{
                        item.isImage = true;
                    })
                    if(vm.videoFileList.length>3){
                        vm.videoFileList.length = 3;
                    }
                    // vm.imgFileList = data.evalutionImageList;
                    // vm.$toast.success('点评成功');
                    // vm.content = data.content;
                    // vm.detail = data;
                    console.log("data",res);
                    
                });
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
                this.$router.go(-1);
                
            },
            // deleteImg(file){
            //     console.log("file",file);
                
            // }
        }
    }
</script>
