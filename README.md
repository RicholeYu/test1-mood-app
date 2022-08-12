* 项目运行环境
node v16.9.0
npm  v7.21.1
xcode 13.3.1
iOS 13.1 (17A844)

* 项目使用库和插件
expo-cli 6.0.1
expo
react-native-zip-archive （APP zip压缩解压插件）

* 项目启动
项目1: test1-mood-app
npm i
npm i expo-cli -g
expo start
使用xcode打开ios/test1moodapp.xcworkspace, 设置开发者账号和签名，关闭Notification设置，选择Iphone 11 Pro Max模拟器，编译运行。

项目2: mood
npm i
npm start

App架构设计
方案: 使用H5离线化ZIP包模仿微信小程序
优势:
1. H5页面开发效率高，离线化ZIP包可做版本控制，版本回退等。
2. 比起原生小程序，H5离线化功能实现简单，BUG少，不用出一套专门小程序的开发文档供第三方使用，小程序间逻辑功能解耦。
3. 很轻易实现灰度发布方案，无技术壁垒。
4. 实现自平台数据行为信息埋点上报

公共发布平台 (demo中未实现)
- 公司 / 个人创建项目
- 创建应用，上传发布H5离线包
- 离线包灰度验证
- 离线包版本回退
- 公共静态资源发布

APP
- 打开APP时通过接口获取最新离线化H5列表信息, 根据接口维护更新H5离线包
- 当离线包下载失败或不可用时，也可以直接替换为使用http链接打开

项目通过source文件夹中的souce.json控制离线包入口
source/mood.zip由mood工程执行npm run build之后使用zip压缩build文件夹