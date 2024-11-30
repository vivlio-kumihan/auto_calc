// // 開発が一段落したらコメントアウトした上のコードに戻す。
// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './style.css'
// import AutoCalc from './components/AutoCalc.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <AutoCalc />
//   </StrictMode>,
// )

// 開発中は、コンソールログの出力が2重に出力されて見通しが悪いので『StrictMode』を外す。
import { createRoot } from 'react-dom/client'
import './assets/styles/vendors/css-reset.css';
import './style.css'
import AutoCalc from './AutoCalc.jsx'

createRoot(document.getElementById('root')).render(
  <>
    <AutoCalc />
  </>
)
