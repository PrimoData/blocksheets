function Coinpaprika(tokenId, property) {
  // Validate input
  if (!tokenId) {
    Logger.log("No cryptocurrency ID provided.");
    return "Error: No cryptocurrency ID provided.";
  }
  if (!property) {
    Logger.log("No property specified.");
    return "Error: No property specified.";
  }

  // Base URLs for the API endpoints
  var tickerBaseUrl = 'https://api.coinpaprika.com/v1/tickers/';
  var coinBaseUrl = 'https://api.coinpaprika.com/v1/coins/';

  // Concatenate base URLs with the tokenId parameter to form the full URLs
  var tickerUrl = tickerBaseUrl + tokenId;
  var coinUrl = coinBaseUrl + tokenId;

  try {
    // Initialize variable for the requested data
    var requestedData = "N/A"; // Default value if property not found

    // Fetch ticker data if the property is related to ticker information
    if (['Name', 'Symbol', 'Rank', 'Price ($USD)', 'Market Cap', '% Change (24h)'].includes(property)) {
      var tickerResponse = UrlFetchApp.fetch(tickerUrl, {'method': 'get', 'muteHttpExceptions': true});
      var tickerData = JSON.parse(tickerResponse.getContentText());

      switch(property) {
        case 'Name':
          requestedData = tickerData.name || "";
          break;
        case 'Symbol':
          requestedData = tickerData.symbol || "";
          break;
        case 'Rank':
          requestedData = tickerData.rank || "";
          break;
        case 'Price ($USD)':
          requestedData = tickerData.quotes.USD.price || "";
          break;
        case 'Market Cap':
          requestedData = tickerData.quotes.USD.market_cap || "";
          break;
        case '% Change (24h)':
          requestedData = tickerData.quotes.USD.percent_change_24h/100 || "";
          break;
      }
    }
    // Fetch coin data if the property is related to coin information
    else if (['Description', 'Website','Token Address','Chain'].includes(property)) {
      var coinResponse = UrlFetchApp.fetch(coinUrl, {'method': 'get', 'muteHttpExceptions': true});
      var coinData = JSON.parse(coinResponse.getContentText());

      switch(property) {
        case 'Description':
          requestedData = coinData.description || "";
          break;
        case 'Website':
          requestedData = (coinData.links && coinData.links.website && coinData.links.website.length > 0) ? coinData.links.website[0] : "";
          break;
        case 'Token Address':
          requestedData = coinData.contract || "";
          break;
        case 'Chain':
          requestedData = coinData.platform ? coinData.platform.split("-")[1] : "";
          break;          
      }
    } else if (property === 'Listing') {
      requestedData = 'https://coinpaprika.com/coin/' + tokenId;
    } else if (property === 'DEX Screener') {
      var coinResponse = UrlFetchApp.fetch(coinUrl, {'method': 'get', 'muteHttpExceptions': true});
      var coinData = JSON.parse(coinResponse.getContentText());
      requestedData = coinData.contract ? 'https://dexscreener.com/' + coinData.platform.split("-")[1] + "/" + coinData.contract : "";
    }
    else {
      Logger.log("Property not found: " + property);
      requestedData = "Error: Property not found.";
    }

    console.log(requestedData);
    return requestedData;

  } catch (e) {
    Logger.log("Failed to fetch data for " + tokenId + ": " + e.toString());
    return "Error: Failed to fetch data.";
  }
}

 
function CoinMarketCap(tokenSymbol, property) {

  var apiKey = ''; // Use your actual CoinMarketCap API Key.

  // Base URLs for the API endpoints
  var tickerUrl = 'https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?symbol=' + tokenSymbol;
  var coinmetaUrl = 'https://pro-api.coinmarketcap.com/v2/cryptocurrency/info?symbol=' + tokenSymbol;
  var coinUrl = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/map?symbol=' + tokenSymbol;

  var options = {
      'method': 'get',
      'headers': {
          'X-CMC_PRO_API_KEY': apiKey
      },
      'muteHttpExceptions': true
  };

  try {
      // Initialize variable for the requested data
      var requestedData = "N/A"; // Default value if property not found

      // Fetch ticker data if the property is related to ticker information
      if (['Price ($USD)', '% Change (24h)', 'Rank', 'Market Cap'].includes(property)) {

          var tickerResponse = UrlFetchApp.fetch(tickerUrl, options);
          var data = JSON.parse(tickerResponse)

          if (data.status.error_code !== 0) {
              return "Error: " + data.status.error_message;
          }
          
          var tickerData = data;  
          var quoteData = tickerData.data[tokenSymbol][0].quote.USD; // Assuming USD quotes are desired
        
          switch(property) {
          case 'Price ($USD)':
              requestedData = quoteData.price;
              break;
          case '% Change (24h)':
              requestedData = quoteData.percent_change_24h / 100; // As a direct percentage
              break;
          case 'Rank':
              requestedData = tickerData.data[tokenSymbol].cmc_rank;
              break;
          case 'Market Cap':
              requestedData = quoteData.market_cap;
              break;
          }
      
      // Fetch coin data if the property is related to coin information
      } else if ([ 'Name', 'Twitter','Website','Description','Listing'].includes(property)) {

          var coinResponse = UrlFetchApp.fetch(coinmetaUrl, options);
          var data = JSON.parse(coinResponse);
          if (data.status.error_code !== 0) {
              return "Error: " + data.status.error_message;
          }
          var coinData = data;

          switch (property) {
              case 'Name':
                  requestedData = coinData.data[tokenSymbol][0].name;
                  break;

              case 'Listing':
                  requestedData = 'https://coinmarketcap.com/currencies/' + coinData.data[tokenSymbol][0].name;
                  break;
                  
              case 'Description':
                  requestedData = coinData.data[tokenSymbol][0].description || "";
                  break;
                                  
              case 'Twitter':
                  requestedData = coinData.data[tokenSymbol][0].urls['twitter'][0] || ""; 
                  break;

              case 'Website':
                  if (coinData.data[tokenSymbol][0].urls['website'][0]) {
                      requestedData = coinData.data[tokenSymbol][0].urls['website'][0];
                  } else {
                      requestedData = "";
                  }
                  break;
          }

      // Fetch coin data if the property is related to coin information
      } else if ([ 'Chain', 'Token Address','DEX Screener'].includes(property)) {

          var coinResponse = UrlFetchApp.fetch(coinUrl, options);
          var data = JSON.parse(coinResponse);
          if (data.status.error_code !== 0) {
              return "Error: " + data.status.error_message;
          }
          var coinData = data.getContentText();

          if (coinData.data[0].platform) {
              switch (property) {
                  case 'Token Address':
                      requestedData = coinData.data[0].platform.token_address || "";
                      break;
              
                  case 'Chain':
                      requestedData = coinData.data[0].platform.name || "";
                      break;

                  case 'DEX Screener':
                      requestedData = coinData.data[0].platform.token_address ? 'https://dexscreener.com/' + coinData.data[0].platform.name.toLowerCase() + "/" + coinData.data[0].platform.token_address : "";
                      break;
              }
          } else {
              requestedData = "";
          }
      }

      console.log(requestedData);
      return requestedData;

  } catch (e) {
      return "Error";
  }
}


function Allium(sql) {
  // Validate input
  if (!sql) {
    Logger.log("No SQL query.");
    return "Error: No SQL query.";
  }

  // Use Script Properties to securely store your API key
  // Set it up via File > Project properties > Script properties in the Apps Script editor

  var apiKey = "";

  if (!apiKey) {
    throw new Error('ALLIUM_API_KEY is not set. Please set it in the Script properties.');
  }

  var url = 'https://api.allium.so/api/v1/developer/ethereum/sql/';
  var options = {
    method: 'post',
    contentType: 'application/json',
    headers: {
      'X-API-Key': apiKey
    },
    payload: JSON.stringify({ query: sql }),
    muteHttpExceptions: true // To handle HTTP errors gracefully
  };

  try {
    var response = UrlFetchApp.fetch(url, options);
    
    var data = JSON.parse(response.getContentText());
    console.log(data)
    // Assuming the API returns a JSON object, and you want to return a specific value
    if (data) {
      // Assuming data.data is an array of objects like [{ last_block_num: 19191121, last_block_dttm: '2024-02-09T14:19:11' }]
      
      // Extract keys for the header row
      var headers = Object.keys(data[0]);
      
      // Initialize rows array with headers
      var rows = [headers];
      
      // Loop through each item to extract values
      data.forEach(function(item) {
        // Extract values in the order of headers
        var row = headers.map(function(header) {
          return item[header];
        });
        // Add row of values to rows array
        rows.push(row);
      });
      
      return rows;

    } else {
      return "No data found";
    }
  } catch (error) {
    console.log('Error running query: ' + error.toString());
    return "Error: " + error.toString();
  }
}

  