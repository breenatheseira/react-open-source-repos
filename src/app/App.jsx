import React from 'react'

import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'

import Header from '../components/Header'
import Homepage from "./routes/Homepage";
import Footer from '../components/Footer'

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <div id="body-content">
        <Routes>
          <Route path='/' element={<Homepage />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  )
}