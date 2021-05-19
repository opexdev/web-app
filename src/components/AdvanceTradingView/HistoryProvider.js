const api_root = "https://api.binance.com/api/v3/klines";
const history = {};

export default {
  history: history,
  async getBars(symbolInfo, resolution, from, to, first, limit) {
    const url = first
      ? `${api_root}?symbol=${symbolInfo.name.replace(
          "/",
          "",
        )}&interval=1m&limit=300`
      : `${api_root}?symbol=${symbolInfo.name.replace("/", "")}&startTime=${
          from * 1000
        }&interval=1m&limit=300`;
    return fetch(url).then(async (res) => {
      const data = await res.json();
      if (res.status !== 200) {
        console.log("Binance API error:", data.message);
        return [];
      }
      if (data.length) {
        var bars = data
          .filter((el) => {
            const [time] = el;
            return first || time < to * 1000;
          })
          .map((el) => {
            const [time, open, high, low, close, volume] = el;
            return {
              time: time,
              low: parseFloat(low),
              high: parseFloat(high),
              open: parseFloat(open),
              close: parseFloat(close),
              volume: parseFloat(volume),
            };
          });
        if (first) {
          var lastBar = bars[bars.length - 1];
          history[symbolInfo.name] = {lastBar};
        }
        return bars;
      } else {
        return [];
      }
    });
  },
};
