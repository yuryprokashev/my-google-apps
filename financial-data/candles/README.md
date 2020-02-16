# Financial Data Services. Candles.
## CandlesApp
Stores 1-minute Candle Data in [the spreadsheet](https://docs.google.com/spreadsheets/d/1oQO_oN_C2KvrwqnzGvvRxAWoYx41I1fGR-0KttO1iLw/edit#gid=0)
at `Candles` tab.

## CandleSynchronizer
Polls the finnhub.io API /candle endpoint and uses `CandlesApp` to store it.