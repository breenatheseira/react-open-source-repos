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
          <Route path={import.meta.env.VITE_REPO_NAME}>
            <Route path="" element={<Homepage />} />
          </Route>
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  )
}