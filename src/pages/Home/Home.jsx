import React, { use, useContext, useEffect, useState } from 'react'
import './Home.css'
import { CoinContext } from '../../context/CoinContext'
import { Link } from 'react-router-dom';

export const Home = () => {


    const {allCoin,currency}= useContext(CoinContext);
    const [displayCoin,setDisplayCoin] =useState([]);
    const[input,setInput] = useState("");


// search the word when clicking on the search button or when submitting.......

    // const inputHandler = (event)=>{
    //   setInput(event.target.value);
    //   if(event.target.value===""){
    //     setDisplayCoin(allCoin);
    //   }

    // }


    // search the word without clicking on the search button or without submitting the form......

    const inputHandler = (event) => {
  const value = event.target.value;
  setInput(value);

  const filtered = allCoin.filter((item) =>
    item.name.toLowerCase().includes(value.toLowerCase())
  );
  setDisplayCoin(filtered);
};

    const searchHandler = async(event)=>{
      event.preventDefault();
      const coins = await  allCoin.filter((item)=>{
      return   item.name.toLowerCase().includes(input.toLowerCase())
      })
      setDisplayCoin(coins);
    }

    useEffect(()=>{
        setDisplayCoin(allCoin)

    },[allCoin])
  return (
    <div>
        <div className="hero-section">
            <h1>Largest<br />Crypto Marketplace</h1>
            <p>Welcome to the world's largest cryptocurrency marketplace. Sign up to explore more about cryptos.</p>

            <form onSubmit={searchHandler} >
                <input type="text" onChange={inputHandler} list='coinlist' placeholder='Search crypto...' required value={input}/>


              <datalist id='coinlist'>
                {allCoin.map((item,index)=>(<option key={index}value={item.name}/>))}
              </datalist>








                <button type='submit'>Search</button>
            </form>
        </div>

        <div className="crypto-table">
            <div className="table-layout"><p>#</p>
            <p>Coins</p>
            <p>Price</p>
            <p>24H Change</p>
            <p>Market Cap</p></div>
            {
                displayCoin.slice(0,10).map((item,index)=>(
                  <Link to={`/coin/${item.id}`} className="table-layout" key={index}>
                             <p>{item.market_cap_rank}</p>

                        <div className="coin-details">
                          <img src={item.image} alt={item.name} />
                          <p>{item.name} - {item.symbol.toUpperCase()}</p>
                        </div>

                        <p>{currency.symbol}{item.current_price.toLocaleString()}</p>

                        <p style={{ color: item.price_change_percentage_24h >= 0 ? 'limegreen' : 'red' }}>
                          {item.price_change_percentage_24h.toFixed(2)}%
                        </p>

                        <p>{item.market_cap.toLocaleString()}</p>
                  </Link>

                ))
            }
        </div>

    </div>
  )
}

