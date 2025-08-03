import React from 'react'
// import Navbar from './components/Navbar/Navbar'
import {Navbar} from './components/Navbar';
import {Route,Routes} from 'react-router-dom'
import { NavLink } from 'react-router-dom';
import { Home } from './pages/Home/Home';
import {Features} from './pages/Features/Features'
import { Coin } from './pages/Coin/Coin';
import { Footer } from './components/Footer/Footer';
import { Link } from 'react-router-dom';



const App = () => {
  return (
    <div className='app'>
      <Navbar/>
      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coin/:coinId" element={<Coin />} />
      </Routes>
      <Footer/>

    </div>
  )
}

export default App;