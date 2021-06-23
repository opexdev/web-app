import historyProvider from "./HistoryProvider";

const api_root = "https://api.binance.com/api/v1/exchangeInfo";

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

let initialized = false;

export default {
  onReady(cb) {
    setTimeout(() => {
      cb(config);
    }, 0);
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
      exchange: "Binance",
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
    // !initialized &&
    //   setInterval(() => {
    //     const isMinute = Number(resolution.toLowerCase()) < 60;
    //     const interval = Number(resolution.toLowerCase())
    //       ? isMinute
    //         ? `${parseInt(resolution.toLowerCase())}m`
    //         : `${parseInt(resolution.toLowerCase()) / 60}h`
    //       : resolution.toLowerCase();
    //     const symbol = symbolInfo.name.replace("/", "");
    //     const url = `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=1`;
    //     fetch(url).then(async (res) => {
    //       const data = await res.json();
    //       if (res.status !== 200) {
    //         console.log("Binance API error:", data.message);
    //         return;
    //       }
    //       if (data.length) {
    //         const [time, open, high, low, close, volume] = data[0];
    //         onRealtimeCallback({
    //           time: time,
    //           low: parseFloat(low),
    //           high: parseFloat(high),
    //           open: parseFloat(open),
    //           close: parseFloat(close),
    //           volume: parseFloat(volume),
    //         });
    //       }
    //     });
    //   }, 60000);
    initialized = true;
  },
  unsubscribeBars(subscriberUID) {
    console.log("=====unsubscribeBars running");
  },
  async searchSymbols(userInput, exchange, symbolType, onResult) {
    const symbols = await fetch(api_root).then(async (res) => {
      const json = await res.json();
      if (res.status !== 200) {
        console.log("Binance API error:", json.message);
        return [];
      }
      return json.symbols;
    });
    setTimeout(() => {
      onResult(
        symbols.map((v) => ({
          symbol: v.symbol.replace(v.baseAsset, `${v.baseAsset}/`),
          full_name: v.symbol,
          description: "Binance",
          exchange,
          ticker: v.symbol.replace(v.baseAsset, `${v.baseAsset}/`),
          type: "Crypto",
        })),
      );
    }, 0);
  },
};
