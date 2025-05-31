<?php
/*
Plugin Name: Paper Trader Simulator
Description: A 24/7 simulated trading chart with Buy/Sell logic for paper trading.
Version: 1.0
Author: Your Name
*/

add_shortcode('paper_trader', 'render_paper_trader_chart');

add_action('wp_enqueue_scripts', function() {
    wp_enqueue_script('lightweight-charts', 'https://unpkg.com/lightweight-charts/dist/lightweight-charts.standalone.production.js', [], null, true);
    wp_enqueue_script('paper-trader-script', plugin_dir_url(__FILE__) . 'paper-trader.js', [], null, true);
});

function render_paper_trader_chart() {
    return '
    <div id="tradingChart" style="margin-bottom: 20px;"></div>
    <div>
      <strong>Price:</strong> <span id="price">$100.00</span><br>
      <strong>Balance:</strong> <span id="balance">$10000.00</span><br>
      <button id="buyBtn">Buy</button>
      <button id="sellBtn">Sell</button>
    </div>
    <div>
      <h4>Trade Log</h4>
      <ul id="tradeLog"></ul>
    </div>
    ';
}
?>