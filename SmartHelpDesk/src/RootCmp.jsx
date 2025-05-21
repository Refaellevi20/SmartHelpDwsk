import React from 'react'
import { Routes, Route } from 'react-router-dom'

import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'



export function RootCmp() {
  //! for checking if the current path is a toy page (without refreshing/rendering the page)

  return (
    <div className="l">
      <main>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} /> 
         
        </Routes>
      </main>
    </div>
  )
}

