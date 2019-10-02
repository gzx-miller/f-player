# f-player
A windows video player based electron, can play four video in same time.

------------------------------------------------------------------------
1. Install environment.
`npm install create-electron-app -g`

2. Clone or download this project.
`npm install`

3. Test this code.
`npm run start`

4. build the setup.
`npm run make`

------------------------------------------------------------------------
四格播放器:
  1. 四格播放器, 田字排布, 均分宽高            OK
  2. 启动即载入上次播放的片子                  OK
  3. 拖拽片子进到播放器, 拖入就显示drag区      OK
  4. 空白,暂停,播完时显示Drag区, 开播隐藏      OK
  6. 顶部全透明的拖拽区.                       OK
  7. 右上角小/大/关三按钮, hover可见, 半透     OK
  8. 四周可拉伸                                OK
  10. Drag区增加open按钮                       OK
  11. 增加按钮清除播放记录                     localStorage.clear()
