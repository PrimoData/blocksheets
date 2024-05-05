# BlockSheets

BlockSheets is a Google Sheets add-on that allows users to pull blockchain data from [CoinMarketCap](https://coinmarketcap.com/api/), [Coinpaprika](https://api.coinpaprika.com/), and [Allium](https://www.allium.so/) APIs.

## Functions

The following functions are included:

* `Coinpaprika(tokenId, property)` - The Coinpaprika function integrates real-time cryptocurrency data from the Coinpaprika API into Google Sheets. It allows users to retrieve various properties of cryptocurrencies such as market data, coin specifics, and relevant web links directly into a spreadsheet.

    **Parameters**:
    * `tokenId` (string): The unique identifier for the cryptocurrency. This is required to fetch the corresponding data from the Coinpaprika API.
    * `property` (string): The properties are supported:
        * `Name`: The official name of the cryptocurrency.
        * `Symbol`: The ticker symbol of the cryptocurrency.
        * `Rank`: The ranking of the cryptocurrency based on market cap.
        * `Price ($USD)`: The current price of the cryptocurrency in US Dollars.
        * `Market Cap`: The total market capitalization in US Dollars.
        * `% Change (24h)`: The percentage change in price over the last 24 hours.
        * `Description`: A brief description of the cryptocurrency.
        * `Website`: The official website URL of the cryptocurrency.
        * `Token Address`: The contract address of the cryptocurrency on its respective blockchain.
        * `Chain`: The blockchain platform on which the cryptocurrency operates.
        * `Listing`: URL to the Coinpaprika page for the cryptocurrency.
        * `DEX Screener`: URL to a decentralized exchange screener page for the cryptocurrency.


* `CoinMarketCap(tokenSymbol, property)` - The CoinMarketCap function is designed to fetch and integrate cryptocurrency data from the CoinMarketCap API directly into Google Sheets. This custom function allows users to retrieve a variety of cryptocurrency properties, such as pricing, market statistics, and metadata, providing dynamic and real-time insights within spreadsheets. _(Note: CoinMarketCap API key is required.)_

    **Parameters**
    * `tokenSymbol` (string): The ticker symbol of the cryptocurrency, used to fetch data specific to that crypto asset.
    * `property` (string): The following properties are supported:
        * `Price ($USD)`: Current trading price of the cryptocurrency in US Dollars.
        * `% Change (24h)`: The percentage change in price over the last 24 hours.
        * `Rank`: The rank of the cryptocurrency based on its market capitalization.
        * `Market Cap`: The total market capitalization of the cryptocurrency in US Dollars.
        * `Name`: The full name of the cryptocurrency.
        * `Twitter`: URL of the cryptocurrency's official Twitter account.
        * `Website`: Official website URL of the cryptocurrency.
        * `Description`: A brief description of the cryptocurrency.
        * `Listing`: URL to the CoinMarketCap page for the cryptocurrency.
        * `Chain`: The blockchain platform on which the cryptocurrency is based.
        * `Token Address`: The contract address of the cryptocurrency on its blockchain.
        * `DEX Screener`: URL to a decentralized exchange screener page for the cryptocurrency.

* `Allium(sql)` - The Allium function pulls data from the Allium API, allowing users to fetch blockchain data directly into Google Sheets. (Note: Allium API key is required.)

    **Parameter**
    * `sql` (string): The SQL query string that is to be executed against the Ethereum blockchain data. The query must be valid SQL syntax as interpreted by the Allium API.


## Installation

To install BlockSheets, follow these steps:

1. Open your Google Sheets document.
2. Click on "Extensions" in the top menu, then select "Apps Script".
3. In the Apps Script editor, copy and paste the code from the `blocksheets.js`.

## Author

**Primo Data**
- Website: [primodata.org](https://primodata.org)
- Twitter: [@Primo_Data](https://twitter.com/Primo_Data)

## Contributing

If you find a bug or have a feature request, please open an issue on GitHub. If you want to contribute to the code, please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/primodata/BlockSheets/blob/main/LICENSE) file for details.