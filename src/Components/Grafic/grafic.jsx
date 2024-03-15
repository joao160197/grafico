import { useEffect, useState, useRef } from "react";
import "./styles.css";
import Chart from "chart.js/auto";

const Grafic = () => {


  const [moeda, setmoeda] = useState("USD");
  const [Data, setData] = useState({});
  const chartRef = useRef(null);

  const fetchData = async () => {
    try {
      const response = await fetch(`https://economia.awesomeapi.com.br/json/last/${moeda}-BRL`);
      if (!response.ok) {
        throw new Error("Failed to fetch moeda data");
      }
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error("Error fetching moeda data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000); // Atualizar os valores a cada 30 segundos 
    return () => clearInterval(interval); //limpa a grafico quando reccaregar a pagina 
  }, [moeda]);

  useEffect(() => {
    if (!chartRef.current || !Object.keys(Data).length) return;

    const ctx = chartRef.current.getContext("2d");
    const labels = Object.keys(Data).map((key) => key.replace("BRL", ""));
    const values = Object.values(Data).map((value) => parseFloat(value.bid));

    const newChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [{
          label: `Cotação de ${moeda}`,
          data: values,
          backgroundColor: "#081435",
          borderColor: "#081435",
          pointBorderColor: "aqua",
          tension: 0.4
        }]
      },
      options: {
        plugins: {
          legend: {
            display: true
          }
        },
        scales: {
          x: {
            type: 'category' 
          },
          y: {
            min: 100,
            max: 363835
          }
        }
      }
    });

    return () => {
      newChart.destroy();
    };
  }, [Data, moeda]);

  const handlemoedaChange = (event) => {
    setmoeda(event.target.value);
  };

  return (
    <div className="container">
      <h1>Cotação de Moedas Estrangeiras</h1>
      <div>
        <select  className="Input" value={moeda} onChange={handlemoedaChange}>
          <option value="USD">Dólar</option>
          <option value="EUR">Euro</option>
          <option value="BTC">Bitmoeda</option>
        </select>
      </div>
      <div className="Grafic">
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
};

export default Grafic;
