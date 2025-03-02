// /web-app/pages/index.tsx
import { useState } from "react";
import type { NextPage } from "next";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Crypto {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
}

const fetchCryptoPrices = async (): Promise<Crypto[]> => {
  // List of 5 cryptocurrencies (by ID) to display
  const cryptoIds = [
    "bitcoin",
    "ethereum",
    "ripple",
    "bitcoin-cash",
    "litecoin",
  ];
  const response = await axios.get<Crypto[]>(
    "https://api.coingecko.com/api/v3/coins/markets",
    {
      params: {
        vs_currency: "usd",
        ids: cryptoIds.join(","),
      },
    }
  );
  return response.data;
};

const Home: NextPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading, error, refetch } = useQuery<Crypto[], Error>({
    queryKey: ["cryptoPrices"],
    queryFn: fetchCryptoPrices,
  });

  if (isLoading) return <div style={{ padding: "2rem" }}>Loading...</div>;
  if (error) return <div style={{ padding: "2rem" }}>Error fetching data</div>;

  const filteredData = data!.filter((crypto) =>
    crypto.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>Crypto Price Tracker</h1>
      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Search cryptocurrency..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: "0.5rem", marginRight: "1rem" }}
        />
        <button onClick={() => refetch()} style={{ padding: "0.5rem 1rem" }}>
          Refresh
        </button>
      </div>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {filteredData.map((crypto) => (
          <li
            key={crypto.id}
            style={{
              marginBottom: "1rem",
              borderBottom: "1px solid #ccc",
              paddingBottom: "1rem",
            }}
          >
            <h3>
              {crypto.name} ({crypto.symbol.toUpperCase()})
            </h3>
            <p>Price: ${crypto.current_price.toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
