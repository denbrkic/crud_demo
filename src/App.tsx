import React from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout/MainLayout'
import HomePage from './pages/HomePage/HomePage'
import Create from './pages/Create/Create'

function App() {

  return (
    <>
      <Routes>
          <Route element={<MainLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/create" element={<Create />} />
          </Route>
      </Routes>
    </>
  )
}

export default App
