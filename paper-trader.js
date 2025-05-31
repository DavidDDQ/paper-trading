document.addEventListener("DOMContentLoaded", function () {
  const chartContainer = document.getElementById("tradingChart");
  const balanceDisplay = document.getElementById("balance");
  const priceDisplay = document.getElementById("price");
  const logContainer = document.getElementById("tradeLog");

  let balance = 10000;
  let price = 100;

  const chart = LightweightCharts.createChart(chartContainer, {
    width: 800,
    height: 400,
  });
  const lineSeries = chart.addLineSeries();

  function updateChart() {
    fetch("https://api.yoursite.com/api/price")
      .then((res) => res.json())
      .then((data) => {
        price = data.price;
        lineSeries.update({ time: Math.floor(Date.now() / 1000), value: price });
        priceDisplay.innerText = `$${price.toFixed(2)}`;
      });
  }

  function logTrade(type) {
    const li = document.createElement("li");
    li.innerText = `${new Date().toLocaleTimeString()} - ${type} @ $${price.toFixed(2)}`;
    logContainer.prepend(li);
  }

  document.getElementById("buyBtn").addEventListener("click", () => {
    balance -= price;
    balanceDisplay.innerText = `$${balance.toFixed(2)}`;
    logTrade("BUY");
  });

  document.getElementById("sellBtn").addEventListener("click", () => {
    balance += price;
    balanceDisplay.innerText = `$${balance.toFixed(2)}`;
    logTrade("SELL");
  });

  updateChart();
  setInterval(updateChart, 2000);
});