//Chart.js
const ctx = document.getElementById('myChart');

//Function populates stock table with top 5 Reddits
function populateChart() {
    const tBody = document.getElementById("table")

    //Images for bullish and bearish
    var bullish = "<img src=\"https://media.istockphoto.com/id/1396601992/vector/bullish-stock-market.jpg?s=612x612&w=0&k=20&c=Q_xvEZVInyDAUI4Lg4sAzuS-lYWNonyAsgp_baCc7hc=\" width=\"100\" height=\"100\">"
    var bearish = "<img src=\"https://img.freepik.com/premium-vector/bear-market-bearish-market-trend-stocks-trade-exchange-background-down-arrow-graph_635702-606.jpg\" width=\"100\" height=\"100\">"
    
    // Fetch Reddit sentiment data
    fetch("https://tradestie.com/api/v1/apps/reddit?date=2022-04-03")
    .then(res => res.json())
    .then((res) => {
        //Top 5 tickers
        res.slice(0,5).forEach(stock => { 
            let row = tBody.insertRow() // Add new row
            let ticker = row.insertCell(0) //Cell 1: Ticker
            ticker.innerHTML = "<a href=\"https://finance.yahoo.com/quote/" + stock.ticker + "\">" + stock.ticker + "</a>"
            let numC = row.insertCell(1) //Cell 2: Number of comments
            numC.innerHTML = stock.no_of_comments
            let sentiment = row.insertCell(2) //Cell 3: Sentiment
            if(stock.sentiment == "Bullish") {
                sentiment.innerHTML = bullish
            } else if (stock.sentiment == "Bearish") {
                sentiment.innerHTML = bearish
            }
            
        });
    })
}

//Time-series fetched, displayed using Chart.js
async function getData() {
    //Checks if chart already exists and destroys it
    let chartStatus = Chart.getChart("myChart"); 
    if (chartStatus != undefined) { 
    chartStatus.destroy();
    }
    //User input for ticker symbol and time
    tickerStock = document.getElementById("stock-name").value
    timeSId = document.getElementById("time-select").value
    //Today's date
    d = new Date();
    currentDate = d.toISOString().slice(0,10) // YYYY-MM-DD
    console.log(currentDate);
    d.setDate(d.getDate() - timeSId); 
    pastDate = d.toISOString().slice(0,10)
    console.log(pastDate);
    //Stock price from Polygon.io API
    var data = await fetch(`https://api.polygon.io/v2/aggs/ticker/${tickerStock}/range/1/day/${pastDate}/${currentDate}?apiKey=Vu8xPz0tFECnKMvlgdnJ1x49n6pu_PhS`)
    .then(res => res.json())
    var objectData = data.results
    values = [] //Closing prices
    days = [] //Formatted dates
    
    try {
        //Closing prices and converted timestamps
        objectData.forEach(element => {
            values.push(element.c)
            //Converts epoch
            newDate = new Date(element.t)
            result = newDate.getUTCFullYear() + '-' + (newDate.getUTCMonth() + 1) + '-' + newDate.getUTCDate()
            days.push(result)
        })
        console.log('Values:', values)
        console.log('Days:', days)

        //New line with Chart.js
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: days, //x-axis
                datasets: [{
                    label: '($) Stock Price',
                    data: values //y axis which is stock closing prices
                }]
            }
        })
    } catch (TypeError) {
        alert("Not a stock/incorrect input")
    }
    
}

window.onload = populateChart