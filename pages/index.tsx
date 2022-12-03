import { useEffect, useState } from "react";
const ccxt = require('ccxt')


export default function Home() {

  const [price, setPrice] = useState(0);
  const [dateStart, setDateStart] = useState(0);
  const [dateEnd, setDateEnd] = useState(0);
  let binance = new ccxt.binance();
  const [timeDif, setTimeDif] = useState(0);

  useEffect(() => {
    
    setInterval(() => {
      setDateStart(Date.now());
      try { 
        (async function () {
          const value = await binance.fetchTicker('BTC/USDT');
          console.log(JSON.parse(value.last));
          setPrice(JSON.parse(value.last));
        })()

      } catch (e) {
        console.log (e)
        console.log ("mistake")
        if (e instanceof ccxt.RequestTimeout) {
          // do nothing and retry upon your next iteration
        }
      }
      setDateEnd(Date.now());
      console.log(dateStart);
      console.log(dateEnd);
      setTimeDif(dateEnd - dateStart);
      console.log(timeDif);
      }, 5000);


  }, []);




  return (
    <div>
      <h1>{price}</h1>
      <h1>{timeDif}</h1>
    </div>
  )
}
