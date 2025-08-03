import React, { useContext } from 'react';
import './navbar.css';
import logo from '../assets/logo.png'; // ✅ corrected path
import { CoinContext } from '../context/CoinContext';
import { Link } from 'react-router-dom';

export const Navbar = () => {

    const {setCurrency} = useContext(CoinContext)

    const currencyHandler = (event)=>{
        const val = event.target.value;
        switch(val){
            case 'USD':
                setCurrency({name:'USD',symbol:'$'});
                break;

            case 'EUR':
            setCurrency({name:'EUR',symbol:'€ '});
            break;

            case 'INR':
               setCurrency({name:'INR',symbol:'₹ '});
               break;

               default  :{
                setCurrency({name:'EUR',symbol:'$'});
                break;
               }
        }

    }


  return (
    <div className="navbar">
    <Link to={"/"}>    <img src={logo} alt="logo" /></Link>
  
      <ul>
       <Link to={'/'}> <li className="nav-link">Home</li></Link>
        <Link><li className="nav-link">Features</li></Link>
       <Link> <li className="nav-link">Pricing</li></Link>
       <Link> <li className="nav-link">Pricing</li></Link>
        <Link>  <li className="nav-link"> Blog</li></Link>
      </ul>
      <div className="nav-right">
        <select onChange={currencyHandler}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="INR">INR</option>
        </select>
        <button className="signup">Sign Up</button>
      </div>
    </div>
  );
};
