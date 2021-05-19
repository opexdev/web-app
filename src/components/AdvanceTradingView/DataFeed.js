import historyProvider from "./HistoryProvider";

const supportedResolutions = [
  "1",
  "3",
  "5",
  "15",
  "30",
  "60",
  "120",
  "240",
  "D",
];

const config = {
  supported_resolutions: supportedResolutions,
};

export default {
  onReady(cb) {
    setTimeout(() => cb(config), 0);
  },
  resolveSymbol(symbolName, onSymbolResolvedCallback, onResolveErrorCallback) {
    // expects a symbolInfo object in response
    var split_data = symbolName.split("/");
    var symbol_stub = {
      name: symbolName,
      description: "",
      type: "Crypto",
      session: "24x7",
      timezone: "Etc/UTC",
      ticker: symbolName,
      minmov: 1,
      pricescale: 100000000,
      has_intraday: true,
      intraday_multipliers: ["1", "60"],
      supported_resolution: supportedResolutions,
      volume_precision: 8,
      data_status: "streaming",
    };
    if (split_data[1].match(/USD|EUR|JPY|AUD|GBP|KRW|CNY/)) {
      symbol_stub.pricescale = 100;
    }
    setTimeout(function () {
      onSymbolResolvedCallback(symbol_stub);
    }, 0);
  },
  getBars(
    symbolInfo,
    resolution,
    from,
    to,
    onHistoryCallback,
    onErrorCallback,
    firstDataRequest,
  ) {
    historyProvider
      .getBars(symbolInfo, resolution, from, to, firstDataRequest)
      .then((bars) => {
        onHistoryCallback(bars, {noData: !bars.length});
      })
      .catch((err) => {
        console.log({err});
        onErrorCallback(err);
      });
  },
  subscribeBars(
    symbolInfo,
    resolution,
    onRealtimeCallback,
    subscribeUID,
    onResetCacheNeededCallback,
  ) {
    console.log("=====subscribeBars running");
  },
  unsubscribeBars(subscriberUID) {
    console.log("=====unsubscribeBars running");
  },
  searchSymbols(userInput, exchange, symbolType, onResult) {
    console.log(userInput, exchange, symbolType, onResult);
    setTimeout(() => {
      onResult([
        {
          symbol: "BTC/USDT",
          full_name: "Bitcoin/Tether",
          description: "",
          exchange,
          ticker: "BTC/USDT",
          type: "Crypto",
        },
      ]);
    }, 0);
  },
};
