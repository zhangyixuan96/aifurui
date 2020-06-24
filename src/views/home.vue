
<style  lang="less">
    .van-tabbar-item__icon img{
        width: 0.56rem;
        height: auto !important;
    }
    .van-tabbar{
        height:1.2rem !important;
    }
</style>
<template>
    <div>
        <router-view />
        <van-tabbar route active-color="#DDA384" inactive-color="#999999">
        <van-tabbar-item replace to="/home/index">
            <span>首页</span>
                <img
                slot="icon"
                slot-scope="props"
                :src="props.active ? indexIcon.active : indexIcon.inactive"
                >
        </van-tabbar-item>
        <van-tabbar-item replace to="/home/classReview" >
            <span>上课点评</span>
                <img
                slot="icon"
                slot-scope="props"
                :src="props.active ? reviewIcon.active : reviewIcon.inactive"
                >
        </van-tabbar-item>
        <van-tabbar-item replace to="/home/personalCenter" >
            <span>我的</span>
                <img
                slot="icon"
                slot-scope="props"
                :src="props.active ? personalIcon.active : personalIcon.inactive"
                >
        </van-tabbar-item>
        </van-tabbar>

        <!-- <van-tabbar v-model="active">
            <van-tabbar-item info="3">
                <span>自定义</span>
                <img
                slot="icon"
                slot-scope="props"
                :src="props.active ? icon.active : icon.inactive"
                >
            </van-tabbar-item>
            <van-tabbar-item icon="search">标签</van-tabbar-item>
            <van-tabbar-item icon="setting-o">标签</van-tabbar-item>
        </van-tabbar> -->
    </div>
</template>
<script>
    export default {
        data () {
            return {
                indexIcon: {
                    active: require('../images/tab_ic_home_s.png'),
                    inactive: require('../images/tab_ic_home_n.png')
                },
                reviewIcon:{
                    active: require('../images/tab_ic_study_s.png'),
                    inactive: require('../images/tab_ic_study_n.png')
                },
                personalIcon:{
                    active: require('../images/tab_ic_me_s.png'),
                    inactive: require('../images/tab_ic_me_n.png')
                }
            }
        },
        mounted () {
        },
        beforeDestroy () {

        },
        methods: {

        }
    }
</script>
