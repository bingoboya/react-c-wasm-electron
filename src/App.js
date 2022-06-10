// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {FileSearch} from './components/FileSearch'
import hello from './hello.js';
import { useEffect, useState } from 'react'


const HelloPromise = hello({
  noInitialRun: true,
  noExitRuntime: true
})
function App() {
  const [helloModule, setHelloModule] = useState()
  useEffect(() => {
    // 加载初始化 wasm instance
    HelloPromise.then(mod => {
      setHelloModule(mod)
    })
  })
  const add = () => {
    console.log('计算（22+4）', helloModule._add(22, 4))
  }
  const subtract = () => {
    console.log('计算（22-4）', helloModule._subtract(22, 4))
  }
  const multiply = () => {
    console.log('计算（22*4）', helloModule._multiply(22, 4))
  }
  const devide = () => {
    console.log('计算（22/4）', helloModule._devide(22, 4))
  }
  return (
    <div className="App" container-fluid='true'>
      <div className='row'>
        <div className='col-3 bg-danger left-panel'>
          <FileSearch title='我的文档' onFileSearch={(value) => {console.log('value', value)}} />
        </div>
        <div className='col-9 bg-primary right-panel'>
          <h1>this is right</h1>
          <p>
          wasm run(2+3)={helloModule&&helloModule._add(2,3)}
        </p>
        <button onClick={add}>+</button>
        <button onClick={subtract}>-</button>
        <button onClick={multiply}>*</button>
        <button onClick={devide}>/</button>
        </div>
      </div>
    </div>
  );
}

export default App;
