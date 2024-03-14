import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import HomeScreen from './components/HomeScreen'
import ArticleScreen from './components/ArticleScreen'
import { UserContext } from './contexts/UserContext'

function App() {
  const [currentUser] = useState({username: 'happyamy2016', name: 'guest', avatar_url: 'https://imgs.search.brave.com/oqZI4obN2H1p6XRfStgFAWyTc2aEHXz11NwRJQCVNE8/rs:fit:500:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy90/aHVtYi9jL2NmL1Bl/YXJzLmpwZy81MTJw/eC1QZWFycy5qcGc'})
  return (
    <div id='app-div'>
      <UserContext.Provider value={currentUser}>
        <Routes>
          <Route path='/' element={<HomeScreen />} />
          <Route path='/articles/:article_id' element={<ArticleScreen />} />
        </Routes>
      </UserContext.Provider>
    </div>
  )
}

export default App
