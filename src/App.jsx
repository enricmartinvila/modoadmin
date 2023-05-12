//import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AppContent from './components/content/Content'
import AppSidemenu from './components/sidemenu/Sidemenu' 
//import AppHeader from './components/header/Header'
import { Space } from 'antd';

function App() {

  return (
    <div className="App">
         <AppSidemenu/>
         <AppContent/>
    </div>
  )
}

export default App
