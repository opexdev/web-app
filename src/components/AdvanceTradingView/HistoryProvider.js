const api_root = "https://api.binance.com/api/v3/klines";
const history = {};

export default {
  history,
  async getBars(symbolInfo, resolution, from, to, first, limit) {
    const isMinute = Number(resolution.toLowerCase()) < 60;
    const interval = Number(resolution.toLowerCase())
      ? isMinute
        ? `${parseInt(resolution.toLowerCase())}m`
        : `${parseInt(resolution.toLowerCase()) / 60}h`
      : resolution.toLowerCase();
    const symbol = symbolInfo.name.replace("/", "");
    const url = `${api_root}?symbol=${symbol}&startTime=${
      ((from + to) / 2) * 1000
    }&endTime=${to * 1000}&interval=${interval}&limit=1000`;
    return fetch(url).then(async (res) => {
      const data = await res.json();
      if (res.status !== 200) {
        console.log("Binance API error:", data.message);
        return [];
      }
      if (data.length) {
        const bars = data.map((el) => {
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
        // if (first) {
        //   const lastBar = bars[bars.length - 1];
        //   history[symbolInfo.name] = {lastBar};
        // }
        return bars;
      } else {
        return [];
      }
    });
  },
};
