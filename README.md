# BlockSheets

BlockSheets by [Primo Data](https://primodata.org) is a Google Sheets add-on that allows users to fetch cryptocurrency token and NFT price data, as well as project information, directly into their Google Sheets. This add-on is powered by the [CoinMarketCap](https://coinmarketcap.com/api/) and [Coinpaprika](https://api.coinpaprika.com/) APIs.

## Features

- **Google Sheets Add-on**: BlockSheets is designed to be used as a Google Sheets add-on, making it easy to integrate with your existing workflow.

- **CoinMarketCap API Integration**: BlockSheets uses the CoinMarketCap API to fetch various types of data for a given cryptocurrency symbol. This includes information, price data, and token addresses.

- **Coinpaprika API Integration**: BlockSheets also integrates with the Coinpaprika API to fetch data for a given cryptocurrency ID. This includes ticker data (like name, symbol, rank, price, market cap, and 24h percentage change) and coin data (like description, website, contract, and chain).


## Usage

To use BlockSheets, you need to have a CoinMarketCap API key and a Coinpaprika API key. These keys should be stored in your Google Sheets as script properties. The add-on will automatically fetch these keys when it runs.

You can use the `getCryptoData` function to fetch data from the CoinMarketCap API, and the `TokenData` function to fetch data from the Coinpaprika API. These functions take a cryptocurrency symbol or ID and a metadata type or property as parameters, and return the corresponding data.

## Installation

To install BlockSheets, follow these steps:

1. Open your Google Sheets document.
2. Click on "Extensions" in the top menu, then select "Apps Script".
3. In the Apps Script editor, click on "File" in the top menu, then select "New" > "Project from GitHub".
4. In the "Add a project from a GitHub URL" dialog, paste the URL of this repository (https://github.com/primodata/BlockSheets).
5. Click "Add".
6. In the "Select a repository" dialog, select the "BlockSheets" repository, then click "Select".
7. In the "Add a project from a GitHub URL" dialog, click "OK".

## Author

**Primo Data**
- Website: [primodata.org](https://primodata.org)
- Email: [max@primodata.org](mailto:max@primodata.org)
- Twitter: [@Primo_Data](https://twitter.com/Primo_Data)
- Discord: [@Primo_Data](https://discord.com/users/primo_data)
- Telegram: [@Primo_Data](https://t.me/primo_data)

## Contributing

If you find a bug or have a feature request, please open an issue on GitHub. If you want to contribute to the code, please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/primodata/BlockSheets/blob/main/LICENSE) file for details.