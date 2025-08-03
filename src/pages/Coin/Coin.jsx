import React, {  useContext, useEffect, useState } from 'react'
import './coin.css';
import { useParams } from 'react-router-dom';
import { CoinContext } from '../../context/CoinContext';
import Linechart from '../../components/LineChart/Linechart';
const API_key = import.meta.env.VITE_API_KEY; // Vite

export const Coin = () => {

  const {coinId}= useParams();
  const[coinData, setCoinData] = useState("");
  const[historicalData, setHistoricalData] = useState("");
  const{currency} = useContext(CoinContext)

  const fetchCoinData = async()=>{
        const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
        'x-cg-demo-api-key': API_key
  }
};

await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
  .then(res => res.json())
  .then(res => setCoinData(res))
  .catch(err => console.error(err));
}

const fetchhistoricalData = async()=>{

const options = {
  method: 'GET',
  headers: {
    accept:'application/json',
    //  'x-cg-demo-api-key': `${API_key}`
    'x-cg-demo-api-key':'CG-x1AajMUotwr4Fpkw8PrfgU3e'
    }
};

fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10`, options)
  .then(res => {
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    return res.json();
  })
  .then(data => setHistoricalData(data))
  .catch(err => console.error(err));
}
    


  useEffect(()=>{
    fetchCoinData()
    fetchhistoricalData()
  },[currency])
   if (!coinData || !coinData.market_data || !coinData.image || !historicalData) {
    return <div className="spinner">Loading...</div>;
   }
   else {

    return (
    <div className='coin'>
    <div className="coin-name">
      <img src={coinData.image.large} alt="" />
      <p><b>{coinData.name} ({coinData.symbol.toUpperCase()})</b></p>

    </div>
    <div className="coin-chart"><Linechart historicalData = {historicalData}/></div>

    <div className="coin-info">
      <ul>
      <li>Crypto Market Rank : {coinData.market_cap_rank}</li>
      </ul>
         <ul>
   <li>
  Current Price :{currency.symbol} {coinData.market_data?.current_price?.[currency.name.toLowerCase()]?.toLocaleString() ?? 'N/A'}
</li>

      </ul>
    </div>

    </div>

    

  )
}
}
// else{
//   return(
//     <div className='spinner'>Loading</div>
//   )
// }
// }



