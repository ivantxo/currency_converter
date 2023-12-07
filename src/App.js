import { useEffect, useState } from "react";

function App() {
  const [amount, setAmount] = useState(0);
  const [fromCurrency, setFromCurrency] = useState("AUD");
  const [toCurrency, setToCurrency] = useState("USD");
  const [conversion, setConversion] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    function () {
      async function convertCurrency() {
        setIsLoading(true);
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
        );
        console.log("res", res);

        if (amount === 0) {
          setConversion(0);
        }

        const data = await res.json();
        setConversion(data.rates[toCurrency]);
        setIsLoading(false);
      }

      if (fromCurrency === toCurrency) {
        return setConversion(amount);
      }
      if (amount === 0) {
        setConversion(0);
        return;
      }
      convertCurrency();
    },
    [amount, fromCurrency, toCurrency]
  );

  return (
    <div>
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        disabled={isLoading}
      />
      <select
        value={fromCurrency}
        onChange={(e) => setFromCurrency(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="AUD">AUD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        value={toCurrency}
        onChange={(e) => setToCurrency(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="AUD">AUD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>{isLoading ? <Loader /> : `$${conversion} ${toCurrency}`}</p>
    </div>
  );
}

function Loader() {
  return <p className="loader">Converting...</p>;
}

export default App;
