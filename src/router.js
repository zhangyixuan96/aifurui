const routers = [
    //授权登录
    {
        path: '/',
        name: 'authorizedLogin',
        meta: {
            title: ''
        },
        // component: (resolve) => require(['./views/authorizedLogin.vue'], resolve)
        component: (resolve) => require(['./views/login.vue'], resolve)
    },
    //登录
    {
        path: '/login',
        name: 'login',
        meta: {
            title: ''
        },
        component: (resolve) => require(['./views/login.vue'], resolve)
    },
    //主页
    {
        path: '/home',
        name: 'home',
        meta: {
            title: ''
        },
        redirect: "/home/index",
        component: (resolve) => require(['./views/home.vue'], resolve),
        children:[
            //首页
            {
                path: 'index',
                name: 'index',
                meta: {
                    title: ''
                },
                component: (resolve) => require(['./views/index.vue'], resolve)
            },
            // 上课点评
            {
                path: 'classReview',
                name: 'classReview',
                meta: {
                    title: ''
                },
                component: (resolve) => require(['./views/classReview.vue'], resolve),
            },
            // 我的
            {
                path: 'personalCenter',
                name: 'personalCenter',
                meta: {
                    title: ''
                },
                component: (resolve) => require(['./views/personalCenter.vue'], resolve),
            },
           
        ]
    },
    //查看学生
    {
        path: '/checkStudent',
        name: 'checkStudent',
        meta: {
            title: ''
        },
        component: (resolve) => require(['./views/checkStudent.vue'], resolve)
    },
    //更改进度
    {
        path: '/changeProgress',
        name: 'changeProgress',
        meta: {
            title: ''
        },
        component: (resolve) => require(['./views/changeProgress.vue'], resolve)
    },
    //上课点评详情
    {
        path: '/classReviewDetail',
        name: 'classReviewDetail',
        meta: {
            title: ''
        },
        component: (resolve) => require(['./views/classReviewDetail.vue'], resolve)
    },
    //立即评论
    {
        path: '/addComment',
        name: 'addComment',
        meta: {
            title: ''
        },
        component: (resolve) => require(['./views/addComment.vue'], resolve)
    },
    //查看评论
    {
        path: '/checkComment',
        name: 'checkComment',
        meta: {
            title: ''
        },
        component: (resolve) => require(['./views/checkComment.vue'], resolve)
    },
    
    
];
export default routers;