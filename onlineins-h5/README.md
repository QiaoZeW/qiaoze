## 脚手架介绍
https://sunmengyuan.github.io/garden/2018/03/05/ballade.html

## 开发环境
npm run dev

## sit环境
./sitbuild.sh

## uat环境
./build.sh

## 生产环境
./probuild.sh

## 接口地址&配置文件
./settings.json

## routes.json 说明
"/product/detail": {
    "view": "ProductDetail", //views.js定义的组件名称，利用 gulp 会生成/entries/**.js
    "path": "product/", //组件所在路径，支持二级目录
    "url": "Detail",    //非dev环境，生成单页面时的页面名称
    "query": [
        "product_id", //页面参数
    ]
}
