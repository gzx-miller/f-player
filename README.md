# f-player
A windows video player based electron, can play four video in same time.
桌面视频播放器, 基于electron, 可同时播放四个视频文件.
界面紧凑, 几乎没有任何菜单, 边框, 按钮遮挡画面, 完全沉浸.

------------------------------------------------------------------------
1. Install environment. 
   安装环境.

`npm install create-electron-app -g`

2. Clone or download this project.
   克隆或下载这个工程, 安装依赖.
   
`npm install`

3. Test this code.
   测试

`npm run start`

4. build the setup.
   打包安装包.

`npm run make`

------------------------------------------------------------------------
四格播放器:
  1. 四格播放器, 田字排布, 均分宽高            OK
  2. 启动即载入上次播放的片子                  OK
  3. 拖拽片子进到播放器, 拖入就显示drag区      OK
  4. 空白,暂停,播完时显示Drag区, 开播隐藏      OK
  5. 顶部全透明的拖拽区.                       OK
  6. 右上角小/大/关三按钮, hover可见, 半透     OK
  7. 四周可拉伸                                OK
  8. Drag区增加open按钮                       OK
