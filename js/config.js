//主页面图片信息
var caseConfig = [
    {
        id: 'original',    //大项标示(必须和下面的子项配置所对应)
        img: 'caseImg/case-original.jpg'
    },
    {
        id: 'viDesign',    //大项标示(必须和下面的子项配置所对应)
        img: 'caseImg/case-bite.jpg'
    },
    {
        id: 'web',    //大项标示(必须和下面的子项配置所对应)
        img: 'caseImg/case-web.jpg'
    },
    {
        id: 'ring',    //大项标示(必须和下面的子项配置所对应)
        img: 'caseImg/case-jewe.jpg'
    },
    {
        id: 'photo',    //大项标示(必须和下面的子项配置所对应)
        img: 'caseImg/case-photo.jpg'
    },
    {
        id: 'space',    //大项标示(必须和下面的子项配置所对应)
        img: 'caseImg/case-space.jpg'
    }
];


//子项配置信息
var subCaseConfig = {
    //子项a
    viDesign: [
        {
            title: 'bite',     //小图显示的title
            info: 'bite info',  //小图底部显示的说明
            smallImg: 'caseImg/bite-title.jpg', //小图路径
            largeImg: 'caseImg/bite.jpg'        //大图路径
        },
        {
            title: 'juyi',
            info: 'juyi info',
            smallImg: 'caseImg/juyi-title.jpg',
            largeImg: 'caseImg/juyi.jpg'
        },
        {
            title: 'logo',
            info: 'logo info',
            smallImg: 'caseImg/logo-title.jpg',
            largeImg: 'caseImg/logo.jpg'
        },
        {
            title: 'xiaoyuan',
            info: 'xiaoyuan info',
            smallImg: 'caseImg/xiaoyuan-title.jpg',
            largeImg: 'caseImg/xiaoyuan.jpg'
        },
        {
            title: 'marcus',
            info: 'marcus info',
            smallImg: 'caseImg/marcus-title.jpg',
            largeImg: 'caseImg/marcus.jpg'
        }
    ],
    ring : [
        {
            title: 'ring-1',
            info: 'ring-1 info',
            smallImg: 'caseImg/ring-1-title.jpg',
            largeImg: 'caseImg/ring-1.jpg'
        },{
            title: 'ring-2',
            info: 'ring-2 info',
            smallImg: 'caseImg/ring-2-title.jpg',
            largeImg: 'caseImg/ring-2.jpg'
        },{
            title: 'ring-3',
            info: 'ring-3 info',
            smallImg: 'caseImg/ring-3-title.jpg',
            largeImg: 'caseImg/ring-3.jpg'
        },{
            title: 'ring-4',
            info: 'ring-4 info',
            smallImg: 'caseImg/ring-4-title.jpg',
            largeImg: 'caseImg/ring-4.jpg'
        },{
            title: 'ring-5',
            info: 'ring-5 info',
            smallImg: 'caseImg/ring-5-title.jpg',
            largeImg: 'caseImg/ring-5.jpg'
        },{
            title: 'ring-6',
            info: 'ring-6 info',
            smallImg: 'caseImg/ring-6-title.jpg',
            largeImg: 'caseImg/ring-6.jpg'
        },{
            title: 'ring-7',
            info: 'ring-7 info',
            smallImg: 'caseImg/ring-7-title.jpg',
            largeImg: 'caseImg/ring-7.jpg'
        },{
            title: 'ring-8',
            info: 'ring-8 info',
            smallImg: 'caseImg/ring-8-title.jpg',
            largeImg: 'caseImg/ring-8.jpg'
        },{
            title: 'ring-9',
            info: 'ring-9 info',
            smallImg: 'caseImg/ring-9-title.jpg',
            largeImg: 'caseImg/ring-9.jpg'
        },{
            title: 'ring-10',
            info: 'ring-10 info',
            smallImg: 'caseImg/ring-10-title.jpg',
            largeImg: 'caseImg/ring-10.jpg'
        }
    ],
    web : [
        {
            title: 'v-shine',
            info: 'v-shine info',
            smallImg: 'caseImg/v-shine-title.jpg',
            largeImg: 'caseImg/v-shine.jpg'
        },{
            title: 'ReyQ',
            info: 'ReyQ info',
            smallImg: 'caseImg/ReyQ-title.jpg',
            largeImg: 'caseImg/ReyQ.jpg'
        },{
            title: 'lolo-design',
            info: 'lolo-design info',
            smallImg: 'caseImg/lolo-design-title.jpg',
            largeImg: 'caseImg/lolo-design.jpg'
        }
    ],
    space:[
        {
            title: 'space-1',
            info: 'space-1 info',
            smallImg: 'caseImg/space-1-title.jpg',
            largeImg: 'caseImg/space-1.jpg'
        },{
            title: 'space-2',
            info: 'space-2 info',
            smallImg: 'caseImg/space-2-title.jpg',
            largeImg: 'caseImg/space-2.jpg'
        },{
            title: 'space-3',
            info: 'space-3 info',
            smallImg: 'caseImg/space-3-title.jpg',
            largeImg: 'caseImg/space-3.jpg'
        },{
            title: 'space-4',
            info: 'space-4 info',
            smallImg: 'caseImg/space-4-title.jpg',
            largeImg: 'caseImg/space-4.jpg'
        }
    ],
    photo: [
        {
            title: 'photo-1',
            info: 'photo-1 info',
            smallImg: 'caseImg/photo-1-title.jpg',
            largeImg: 'caseImg/photo-1.jpg'
        },{
            title: 'photo-2',
            info: 'photo-2 info',
            smallImg: 'caseImg/photo-2-title.jpg',
            largeImg: 'caseImg/photo-2.jpg'
        },{
            title: 'photo-3',
            info: 'photo-3 info',
            smallImg: 'caseImg/photo-3-title.jpg',
            largeImg: 'caseImg/photo-3.jpg'
        },{
            title: 'photo-4',
            info: 'photo-4 info',
            smallImg: 'caseImg/photo-4-title.jpg',
            largeImg: 'caseImg/photo-4.jpg'
        },{
            title: 'photo-5',
            info: 'photo-5 info',
            smallImg: 'caseImg/photo-5-title.jpg',
            largeImg: 'caseImg/photo-5.jpg'
        },{
            title: 'photo-4',
            info: 'photo-4 info',
            smallImg: 'caseImg/photo-6-title.jpg',
            largeImg: 'caseImg/photo-6.jpg'
        }
    ],
    original: [
        {
            title: 'original-1',
            info: 'original-1 info',
            smallImg: 'caseImg/original-1-title.jpg',
            largeImg: 'caseImg/original-1.jpg'
        },{
            title: 'original-2',
            info: 'original-2 info',
            smallImg: 'caseImg/original-2-title.jpg',
            largeImg: 'caseImg/original-2.jpg'
        },{
            title: 'original-3',
            info: 'original-3 info',
            smallImg: 'caseImg/original-3-title.jpg',
            largeImg: 'caseImg/original-3.jpg'
        },{
            title: 'original-4',
            info: 'original-4 info',
            smallImg: 'caseImg/original-4-title.jpg',
            largeImg: 'caseImg/original-4.jpg'
        },{
            title: 'original-5',
            info: 'original-5 info',
            smallImg: 'caseImg/original-5-title.jpg',
            largeImg: 'caseImg/original-5.jpg'
        },{
            title: 'original-6',
            info: 'original-6 info',
            smallImg: 'caseImg/original-6-title.jpg',
            largeImg: 'caseImg/original-6.jpg'
        },{
            title: 'original-7',
            info: 'original-7 info',
            smallImg: 'caseImg/original-7-title.jpg',
            largeImg: 'caseImg/original-7.jpg'
        }
    ]
};