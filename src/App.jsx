import './App.css'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomeScreen from './components/HomeScreen'
import ArticleScreen from './components/ArticleScreen'


function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<HomeScreen />} />
        <Route path='/articles/:article_id' element={<ArticleScreen />} />
      </Routes>
    </div>
  )
}

export default App
