

const path = require('path')
const net = require('net')
const child_process = require('child_process')
const axios = require('axios')
const { app, BrowserWindow } = require('electron')
const isDev = require('electron-is-dev')
// 解决“Electron Security Warning”安全警告: https://www.chfse.com/archives/2495
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'
let mainWindow = null
// 
let cmdStrServer = 'start ./PIPServe.exe'
let cmdStrClient = 'start ./PIPClient.exe'
// TODO 关闭electron时，关闭子进程
function runExec() {
  // 使用 spawn 运行 ./PIPServe.exe，spawn运行的子进程会在主进程关闭时一起关闭
  child_process.spawn('./PIPServe.exe', [], {
    windowsHide: false // 隐藏子进程的窗口
  })
  // 使用 exec 运行 ./PIPServe.exe， exec 运行的子进程不会在主进程关闭时一起关闭
  // child_process.exec(cmdStrServer, {})
  // child_process.exec(cmdStrClient, {})
}
// runExec() // 调用子进程
const connectserver = () => { // node通过创建命名管道与 c 或者 julia 的 .exe文件通信
  // 通信 
  // 如何在node.js中创建一个命名pipe https://cloud.tencent.com/developer/ask/81308
  // nodejs执行exe程序并获取输出值 https://blog.csdn.net/chenqk_123/article/details/108801139
  // 通过 electron 启动其它exe 程序 https://juejin.cn/post/6845166890248044557
  // ./PIPServe.exe ./PIPClient.exe 这两个文件的源码 https://blog.csdn.net/forchoosen/article/details/106911135
  // https://blog.csdn.net/dingke2010/article/details/97620266
  const PIPE_NAME = "test"
  const PIPE_PATH = "\\\\.\\Pipe\\" + PIPE_NAME
  const l = console.log
  const client = net.createConnection(PIPE_PATH, () => {
    l('connect to server')
    client.write('world')
    // client.end()
  })
  client.on('data', (data) => {
    l('asdasdasdasdasdas', data.toString())
    if (data.toString()) {
      client.write('world')
    }
  })
  client.on('end', () => {
    l('disconnect from server')
  })
}

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 1324,
    height: 880,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  })
  const urlLocation = isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, './build/index.html')}`
  // const urlLocation = isDev ? 'http://localhost:3000' : 'dummyurl'
  mainWindow.loadURL(urlLocation)
  mainWindow.webContents.openDevTools()
  // connectserver() // 与子进程通信
})

// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') {
//     app.quit()
//   }
// })