import { useEffect, useState } from "react";

function App() {
	const [loading, setLoading] = useState(true);
	const [coins, setCoins] = useState([]); 
	// useState(); 로 하게 되면 아래의 coins.length에서 초기 로드시에는 undefind이기 때문에 에러발생.
	// 그래서 빈 배열로 초기화 해둠.

	useEffect(()=>{
		fetch("https://api.coinpaprika.com/v1/tickers")
			.then((response) => response.json())
			.then((json) => {
				setCoins(json);
				setLoading(false);
			});
	}, []); // 아무것도 주시하고있지 않으면 한번만 실행됨.
	return (
		<div>
			<h1>The Coins! {loading ? "" : `(${coins.length})`} </h1>
			{loading ? <strong>Loading...</strong> : 
				<select> 
					{coins.map((coin) => 
						<option key={coin.id}>
							{coin.name} ({coin.symbol} : ${coin.quotes.USD.price} USD)
						</option>
				)}
				</select>
			}
			{/* <ul>
				<li key={coin.id}>
					{coin.name} ({coin.symbol} : {coin.quotes.USD.price} USD)
				</li>
			</ul> */}
		</div>
	);
}

export default App;
