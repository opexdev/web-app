
const apiBaseUrl = window.env.REACT_APP_API_BASE_URL
const api_root = `${apiBaseUrl}/binance/api/v3/klines`;
const history = {};

const fetchData = async function* (symbol, startTime, endTime, interval) {
  let isDone = false;
  let url = `${api_root}?symbol=${symbol}&endTime=${endTime}&interval=${interval}&limit=1000`;
  const bars = [];
  while (!isDone) {
    await fetch(url).then(async (res) => {
      const data = await res.json();
      if (res.status !== 200) {
        console.log("Binance API error:", data.message);
        return;
      }
      if (data.length) {
        const rawBarData = data.map((el) => {
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
        url = `${api_root}?symbol=${symbol}&endTime=${rawBarData[0].time - 1000
          }&interval=${interval}&limit=1000`;
        const filteredBarData = rawBarData.filter((v) => v.time > startTime);
        if (filteredBarData.length === 0) {
          isDone = true;
          return;
        }
        bars.unshift(...filteredBarData);
      } else {
        isDone = true;
      }
    });
    yield bars;
  }
};

export default {
  history,
  async getBars(symbolInfo, resolution, from, to, first) {
    const isMinute = Number(resolution.toLowerCase()) < 60;
    const interval = Number(resolution.toLowerCase())
      ? isMinute
        ? `${parseInt(resolution.toLowerCase())}m`
        : `${parseInt(resolution.toLowerCase()) / 60}h`
      : resolution.toLowerCase();
    const symbol = symbolInfo.name.replace("/", "");
    let bars = [];
    for await (const res of fetchData(
      symbol,
      from * 1000,
      to * 1000,
      interval,
    )) {
      bars = res;
    }
    return bars;
  },
};
