import Faker from "faker";

export const OverViewData = {
  lastDay: {
    change: Faker.datatype.number({min: 0, max: 10}),
    min: Faker.datatype.number({min: 413990000, max: 513990000}),
    max: Faker.datatype.number({min: 513990000, max: 613990000}),
    volume: Faker.datatype.number({min: 513990000, max: 613990000}),
    type: Faker.datatype.boolean(),
  },
  lastWeek: {
    change: Faker.datatype.number({min: 0, max: 10}),
    min: Faker.datatype.number({min: 413990000, max: 513990000}),
    max: Faker.datatype.number({min: 513990000, max: 613990000}),
    volume: Faker.datatype.number({min: 513990000, max: 613990000}),
    type: Faker.datatype.boolean(),
  },
  lastMonth: {
    change: Faker.datatype.number({min: 0, max: 10}),
    min: Faker.datatype.number({min: 413990000, max: 513990000}),
    max: Faker.datatype.number({min: 513990000, max: 613990000}),
    volume: Faker.datatype.number({min: 513990000, max: 613990000}),
    type: Faker.datatype.boolean(),
  },
};

export const OrderData = {
  Buy: {
    CurrencyBalance: "12،350،000 تومان",
    BestOffer: "450،000،000 ",
    type: true,
  },
  sale: {CurrencyBalance: "0.3 بیتکوین", BestOffer: "450،000،000 ", type: true},
};

export const OrderBookBuyData = () => {
  const data = [];
  for (let i = 0; i < 100; i++) {
    data.push({
      id: Faker.datatype.number,
      amount: Faker.datatype.number({min: 0, max: 1.5, precision: 0.0001}),
      pricePerUnit: Faker.datatype.number({min: 4990000, max: 3990000}),
      totalPrice: Faker.datatype.number({min: 139900000, max: 4139900000}),
      percent: Faker.datatype.number({min: 1, max: 70}),
    });
  }
  return data;
};
export const OrderBookData = () => {
  const data = {
    lastUpdateId: null,
    bids: [],
    asks: [],
  };
  for (let i = 0; i < 100; i++) {
    data.bids.push([
      Faker.datatype.number({min: 4990000, max: 3990000}),
      Faker.datatype.number({min: 0, max: 1.5, precision: 0.0001}),
    ]);
  }
  for (let i = 0; i < 100; i++) {
    data.asks.push([
      Faker.datatype.number({min: 4990000, max: 3990000}),
      Faker.datatype.number({min: 0, max: 1.5, precision: 0.0001}),
    ]);
  }
  return data;
};

export const lastTradesData = () => {
  const data = [];
  for (let i = 0; i < 100; i++) {
    data.push({
      id: Faker.datatype.number,
      timestamp: Faker.date.between("2020-01-01", "2021-02-05"),
      amount: Faker.datatype.number({min: 0, max: 1, precision: 0.0001}),
      price: Faker.datatype.number({min: 413990000, max: 613990000}),
      totalPrice: Faker.datatype.number({min: 13990000, max: 413990000}),
      Type: Faker.random.arrayElement(["buy", "sell"]),
    });
  }

  return data;
};

export const MyOrderCurrentData = () => {
  const data = [];
  const count = Faker.datatype.number({min: 2, max: 15});
  for (let i = 0; i < count; i++) {
    data.push({
      orderId: Faker.datatype.number({min: 11000, max: 1000000}),
      timestamp: Faker.date.between("2020-01-01", "2021-02-05"),
      volume: Faker.datatype.number({min: 0, max: 1, precision: 0.0001}),
      price: Faker.datatype.number({min: 413990000, max: 613990000}),
      totalPrice: Faker.datatype.number({min: 13990000, max: 413990000}),
      tradedAmount: Faker.datatype.number({min: 0, max: 1, precision: 0.0001}),
      avgTradedAmount: Faker.datatype.number({
        min: 0,
        max: 1,
        precision: 0.0001,
      }),
      tradedPrice: Faker.datatype.number({min: 0, max: 1, precision: 0.0001}),
      type: Faker.random.arrayElement(["buy", "sell"]),
      progress: Faker.datatype.number({min: 0, max: 100, precision: 0.5}),
    });
  }
  return data;
};

export const MyOrderHistoryData = () => {
  const data = [];
  const count = Faker.datatype.number({min: 2, max: 15});
  for (let i = 0; i < count; i++) {
    data.push({
      orderId: Faker.datatype.number({min: 11000, max: 1000000}),
      orderType: Faker.random.arrayElement(["stopLimit", "stopMarket"]),
      timestamp: Faker.date.between("2020-01-01", "2021-02-05"),
      stopOrderTime: Faker.date.between("2020-01-01", "2021-02-05"),
      startOrderTime: Faker.date.between("2020-01-01", "2021-02-05"),
      volume: Faker.datatype.number({min: 0, max: 1, precision: 0.0001}),
      price: Faker.datatype.number({min: 413990000, max: 613990000}),
      stoppedPrice: Faker.datatype.number({min: 413990000, max: 613990000}),
      totalPrice: Faker.datatype.number({min: 13990000, max: 413990000}),
      type: Faker.random.arrayElement(["buy", "sell"]),
      status: Faker.random.arrayElement(["NEW", "FILLED", "CANCELED","PARTIALLY_FILLED", "REJECTED"]),
    });
  }
  return data;
};
export const MyOrderStopData = () => {
  const data = [];
  const count = Faker.datatype.number({min: 2, max: 15});
  for (let i = 0; i < count; i++) {
    data.push({
      orderId: Faker.datatype.number({min: 11000, max: 1000000}),
      timestamp: Faker.date.between("2020-01-01", "2021-02-05"),
      volume: Faker.datatype.number({min: 0, max: 1, precision: 0.0001}),
      price: Faker.datatype.number({min: 413990000, max: 613990000}),
      totalPrice: Faker.datatype.number({min: 13990000, max: 413990000}),
      stopPrice: Faker.datatype.number({min: 13990000, max: 413990000}),
      type: Faker.random.arrayElement(["buy", "sell"]),
    });
  }
  return data;
};
export const MyOrderTradeData = () => {
  const data = [];
  const count = Faker.datatype.number({min: 2, max: 15});
  for (let i = 0; i < count; i++) {
    data.push({
      orderId: Faker.datatype.number({min: 11000, max: 1000000}),
      tradeId: Faker.datatype.number({min: 11000, max: 1000000}),
      timestamp: Faker.date.between("2020-01-01", "2021-02-05"),
      volume: Faker.datatype.number({min: 0, max: 1, precision: 0.0001}),
      price: Faker.datatype.number({min: 413990000, max: 613990000}),
      totalPrice: Faker.datatype.number({min: 13990000, max: 413990000}),
      type: Faker.random.arrayElement(["buy", "sell"]),
    });
  }
  return data;
};

export const DTAllTransactionsData = () => {
  const data = [];
  const count = Faker.datatype.number({min: 2, max: 15});
  for (let i = 0; i < count; i++) {
    data.push({
      orderId: Faker.datatype.number({min: 11000, max: 1000000}),
      timestamp: Faker.date.between("2020-01-01", "2021-02-05"),
      transactionType: Faker.random.arrayElement([
        "deposit",
        "withdrawal",
        "Received",
        "send",
      ]),
      volume: Faker.datatype.number({min: 0, max: 1, precision: 0.0001}),
      inventory: Faker.datatype.number({min: 0, max: 2, precision: 0.0001}),
      destination: "009891****" + Faker.datatype.number({min: 1000, max: 9999}),
      transactionId: Faker.datatype.number({
        min: 8439201925530,
        max: 8539201925530,
      }),
      blockchainTransactionId:
        "befe" +
        Faker.datatype.number({min: 8439201925530, max: 8539201925530}),
      status: Faker.random.arrayElement(["NEW", "FILLED", "CANCELED","PARTIALLY_FILLED", "REJECTED"]),
      progress: Faker.datatype.number({min: 0, max: 100, precision: 0.5}),
    });
  }
  return data;
};

export const OrdersTradesAliveOrderData = () => {
  const data = [];
  const count = Faker.datatype.number({min: 2, max: 15});
  for (let i = 0; i < count; i++) {
    data.push({
      orderId: Faker.datatype.number({min: 11000, max: 1000000}),
      timestamp: Faker.date.between("2020-01-01", "2021-02-05"),
      market: Faker.random.arrayElement(["BTC/IRT", "ETH/BTC", "BTC/USDT"]),
      side: Faker.random.arrayElement(["buy", "sell"]),
      order: Faker.datatype.number({min: 0, max: 10, precision: 0.0001}),
      done: Faker.datatype.number({min: 0, max: 0.5, precision: 0.0001}),
      pricePerUnit: Faker.datatype.number({min: 0, max: 2, precision: 0.0001}),
      totalPrice: Faker.datatype.number({min: 0, max: 5, precision: 0.0001}),
      donePercentage: Faker.datatype.number({min: 0, max: 100, precision: 0.5}),
    });
  }
  return data;
};

export const OrdersTradesStopData = () => {
  const data = [];
  const count = Faker.datatype.number({min: 2, max: 15});
  for (let i = 0; i < count; i++) {
    data.push({
      orderId: Faker.datatype.number({min: 11000, max: 1000000}),
      timestamp: Faker.date.between("2020-01-01", "2021-02-05"),
      market: Faker.random.arrayElement(["BTC/IRT", "ETH/BTC", "BTC/USDT"]),
      side: Faker.random.arrayElement(["buy", "sell"]),
      order: Faker.datatype.number({min: 0, max: 10, precision: 0.0001}),
      stoppedPrice: Faker.datatype.number({min: 0, max: 450000540}),
      pricePerUnit: Faker.datatype.number({min: 0, max: 450000540}),
      totalPrice: Faker.datatype.number({min: 0, max: 450000540}),
      donePercentage: Faker.datatype.number({min: 0, max: 100, precision: 0.5}),
    });
  }
  return data;
};

export const OrdersTradesOrdersHistoryData = () => {
  const data = [];
  const count = Faker.datatype.number({min: 2, max: 15});
  for (let i = 0; i < count; i++) {
    data.push({
      orderId: Faker.datatype.number({min: 11000, max: 1000000}),
      timestamp: Faker.date.between("2020-01-01", "2021-02-05"),
      market: Faker.random.arrayElement(["BTC/IRT", "ETH/BTC", "BTC/USDT"]),
      side: Faker.random.arrayElement(["buy", "sell"]),
      type: Faker.random.arrayElement(["market", "limit"]),
      order: Faker.datatype.number({min: 0, max: 1, precision: 0.0001}),
      done: Faker.datatype.number({min: 0, max: 1, precision: 0.0001}),
      pricePerUnit: Faker.datatype.number({min: 0, max: 450000540}),
      paid: Faker.datatype.number({min: 0, max: 450000540}),
      status: Faker.random.arrayElement(["NEW", "FILLED", "CANCELED","PARTIALLY_FILLED", "REJECTED"]),
    });
  }
  return data;
};

export const OrdersTradesTradesData = () => {
  const data = [];
  const count = Faker.datatype.number({min: 2, max: 15});
  for (let i = 0; i < count; i++) {
    data.push({
      orderId: Faker.datatype.number({min: 11000, max: 1000000}),
      timestamp: Faker.date.between("2020-01-01", "2021-02-05"),
      market: Faker.random.arrayElement(["BTC/IRT", "ETH/BTC", "BTC/USDT"]),
      side: Faker.random.arrayElement(["buy", "sell"]),
      type: Faker.random.arrayElement(["market", "limit"]),
      order: Faker.datatype.number({min: 0, max: 1, precision: 0.0001}),
      stoppedPrice: Faker.datatype.number({min: 0, max: 450000540}),
      pricePerUnit: Faker.datatype.number({min: 0, max: 450000540}),
      totalPrice: Faker.datatype.number({min: 0, max: 450000540}),
    });
  }
  return data;
};

export const MarketPair = [
  {
    name: "BTC/IRT",
    Change: Faker.datatype.number({min: 0, max: 20, precision: 0.01}),
    Price: Faker.datatype.number({min: 0, max: 450000540}),
    Vol: Faker.datatype.number({min: 200, max: 3000}),
    Type: Faker.random.arrayElement(["increase", "decrease"]),
    price7d: [
      Faker.datatype.number({min: 0, max: 20}),
      Faker.datatype.number({min: 0, max: 20}),
      Faker.datatype.number({min: 0, max: 20}),
      Faker.datatype.number({min: 0, max: 20}),
      Faker.datatype.number({min: 0, max: 20}),
      Faker.datatype.number({min: 0, max: 20}),
      Faker.datatype.number({min: 0, max: 20}),
    ],
  },
  {
    name: "BTC/USDT",
    Change: Faker.datatype.number({min: 0, max: 20, precision: 0.01}),
    Price: Faker.datatype.number({min: 0, max: 450000540}),
    Vol: Faker.datatype.number({min: 200, max: 3000}),
    Type: Faker.random.arrayElement(["increase", "decrease"]),
    price7d: [
      Faker.datatype.number({min: 0, max: 20}),
      Faker.datatype.number({min: 0, max: 20}),
      Faker.datatype.number({min: 0, max: 20}),
      Faker.datatype.number({min: 0, max: 20}),
      Faker.datatype.number({min: 0, max: 20}),
      Faker.datatype.number({min: 0, max: 20}),
      Faker.datatype.number({min: 0, max: 20}),
    ],
  },
  {
    name: "ETH/BTC",
    Change: Faker.datatype.number({min: 0, max: 20, precision: 0.01}),
    Price: Faker.datatype.number({min: 0, max: 450000540}),
    Vol: Faker.datatype.number({min: 200, max: 3000}),
    Type: Faker.random.arrayElement(["increase", "decrease"]),
    price7d: [
      Faker.datatype.number({min: 0, max: 20}),
      Faker.datatype.number({min: 0, max: 20}),
      Faker.datatype.number({min: 0, max: 20}),
      Faker.datatype.number({min: 0, max: 20}),
      Faker.datatype.number({min: 0, max: 20}),
      Faker.datatype.number({min: 0, max: 20}),
      Faker.datatype.number({min: 0, max: 20}),
    ],
  },
  {
    name: "LTC/BTC",
    Change: Faker.datatype.number({min: 0, max: 20, precision: 0.01}),
    Price: Faker.datatype.number({min: 0, max: 450000540}),
    Vol: Faker.datatype.number({min: 200, max: 3000}),
    Type: Faker.random.arrayElement(["increase", "decrease"]),
    price7d: [
      Faker.datatype.number({min: 0, max: 20}),
      Faker.datatype.number({min: 0, max: 20}),
      Faker.datatype.number({min: 0, max: 20}),
      Faker.datatype.number({min: 0, max: 20}),
      Faker.datatype.number({min: 0, max: 20}),
      Faker.datatype.number({min: 0, max: 20}),
      Faker.datatype.number({min: 0, max: 20}),
    ],
  },
  {
    name: "DOGE/BTC",
    Change: Faker.datatype.number({min: 0, max: 20, precision: 0.01}),
    Price: Faker.datatype.number({min: 0, max: 450000540}),
    Vol: Faker.datatype.number({min: 200, max: 3000}),
    Type: Faker.random.arrayElement(["increase", "decrease"]),
    price7d: [
      Faker.datatype.number({min: 0, max: 20}),
      Faker.datatype.number({min: 0, max: 20}),
      Faker.datatype.number({min: 0, max: 20}),
      Faker.datatype.number({min: 0, max: 20}),
      Faker.datatype.number({min: 0, max: 20}),
      Faker.datatype.number({min: 0, max: 20}),
      Faker.datatype.number({min: 0, max: 20}),
    ],
  },
  {
    name: "BCH/BTC",
    Change: Faker.datatype.number({min: 0, max: 20, precision: 0.01}),
    Price: Faker.datatype.number({min: 0, max: 450000540}),
    Vol: Faker.datatype.number({min: 200, max: 3000}),
    Type: Faker.random.arrayElement(["increase", "decrease"]),
    price7d: [
      Faker.datatype.number({min: 0, max: 20}),
      Faker.datatype.number({min: 0, max: 20}),
      Faker.datatype.number({min: 0, max: 20}),
      Faker.datatype.number({min: 0, max: 20}),
      Faker.datatype.number({min: 0, max: 20}),
      Faker.datatype.number({min: 0, max: 20}),
      Faker.datatype.number({min: 0, max: 20}),
    ],
  },

  {
    name: "ETH/IRT",
    Change: Faker.datatype.number({min: 0, max: 20, precision: 0.01}),
    Price: Faker.datatype.number({min: 0, max: 450000540}),
    Vol: Faker.datatype.number({min: 200, max: 3000}),
    Type: Faker.random.arrayElement(["increase", "decrease"]),
    price7d: [
      Faker.datatype.number({min: 0, max: 20}),
      Faker.datatype.number({min: 0, max: 20}),
      Faker.datatype.number({min: 0, max: 20}),
      Faker.datatype.number({min: 0, max: 20}),
      Faker.datatype.number({min: 0, max: 20}),
      Faker.datatype.number({min: 0, max: 20}),
      Faker.datatype.number({min: 0, max: 20}),
    ],
  },
  {
    name: "LTC/IRT",
    Change: Faker.datatype.number({min: 0, max: 20, precision: 0.01}),
    Price: Faker.datatype.number({min: 0, max: 450000540}),
    Vol: Faker.datatype.number({min: 200, max: 3000}),
    Type: Faker.random.arrayElement(["increase", "decrease"]),
    price7d: [
      Faker.datatype.number({min: 0, max: 20}),
      Faker.datatype.number({min: 0, max: 20}),
      Faker.datatype.number({min: 0, max: 20}),
      Faker.datatype.number({min: 0, max: 20}),
      Faker.datatype.number({min: 0, max: 20}),
      Faker.datatype.number({min: 0, max: 20}),
      Faker.datatype.number({min: 0, max: 20}),
    ],
  },
  {
    name: "DOGE/IRT",
    Change: Faker.datatype.number({min: 0, max: 20, precision: 0.01}),
    Price: Faker.datatype.number({min: 0, max: 450000540}),
    Vol: Faker.datatype.number({min: 200, max: 3000}),
    Type: Faker.random.arrayElement(["increase", "decrease"]),
    price7d: [
      Faker.datatype.number({min: 0, max: 20}),
      Faker.datatype.number({min: 0, max: 20}),
      Faker.datatype.number({min: 0, max: 20}),
      Faker.datatype.number({min: 0, max: 20}),
      Faker.datatype.number({min: 0, max: 20}),
      Faker.datatype.number({min: 0, max: 20}),
      Faker.datatype.number({min: 0, max: 20}),
    ],
  },
  {
    name: "BCH/IRT",
    Change: Faker.datatype.number({min: 0, max: 20, precision: 0.01}),
    Price: Faker.datatype.number({min: 0, max: 450000540}),
    Vol: Faker.datatype.number({min: 200, max: 3000}),
    Type: Faker.random.arrayElement(["increase", "decrease"]),
    price7d: [
      Faker.datatype.number({min: 0, max: 20}),
      Faker.datatype.number({min: 0, max: 20}),
      Faker.datatype.number({min: 0, max: 20}),
      Faker.datatype.number({min: 0, max: 20}),
      Faker.datatype.number({min: 0, max: 20}),
      Faker.datatype.number({min: 0, max: 20}),
      Faker.datatype.number({min: 0, max: 20}),
    ],
  },

  {
    name: "ETH/USDT",
    Change: Faker.datatype.number({min: 0, max: 20, precision: 0.01}),
    Price: Faker.datatype.number({min: 0, max: 450000540}),
    Vol: Faker.datatype.number({min: 200, max: 3000}),
    Type: Faker.random.arrayElement(["increase", "decrease"]),
    price7d: [
      Faker.datatype.number({min: 0, max: 20}),
      Faker.datatype.number({min: 0, max: 20}),
      Faker.datatype.number({min: 0, max: 20}),
      Faker.datatype.number({min: 0, max: 20}),
      Faker.datatype.number({min: 0, max: 20}),
      Faker.datatype.number({min: 0, max: 20}),
      Faker.datatype.number({min: 0, max: 20}),
    ],
  },
  {
    name: "LTC/USDT",
    Change: Faker.datatype.number({min: 0, max: 20, precision: 0.01}),
    Price: Faker.datatype.number({min: 0, max: 450000540}),
    Vol: Faker.datatype.number({min: 200, max: 3000}),
    Type: Faker.random.arrayElement(["increase", "decrease"]),
    price7d: [
      Faker.datatype.number({min: 0, max: 20}),
      Faker.datatype.number({min: 0, max: 20}),
      Faker.datatype.number({min: 0, max: 20}),
      Faker.datatype.number({min: 0, max: 20}),
      Faker.datatype.number({min: 0, max: 20}),
      Faker.datatype.number({min: 0, max: 20}),
      Faker.datatype.number({min: 0, max: 20}),
    ],
  },
  {
    name: "DOGE/USDT",
    Change: Faker.datatype.number({min: 0, max: 20, precision: 0.01}),
    Price: Faker.datatype.number({min: 0, max: 450000540}),
    Vol: Faker.datatype.number({min: 200, max: 3000}),
    Type: Faker.random.arrayElement(["increase", "decrease"]),
    price7d: [
      Faker.datatype.number({min: 0, max: 20}),
      Faker.datatype.number({min: 0, max: 20}),
      Faker.datatype.number({min: 0, max: 20}),
      Faker.datatype.number({min: 0, max: 20}),
      Faker.datatype.number({min: 0, max: 20}),
      Faker.datatype.number({min: 0, max: 20}),
      Faker.datatype.number({min: 0, max: 20}),
    ],
  },
  {
    name: "BCH/USDT",
    Change: Faker.datatype.number({min: 0, max: 20, precision: 0.01}),
    Price: Faker.datatype.number({min: 0, max: 450000540}),
    Vol: Faker.datatype.number({min: 200, max: 3000}),
    Type: Faker.random.arrayElement(["increase", "decrease"]),
    price7d: [
      Faker.datatype.number({min: 0, max: 20}),
      Faker.datatype.number({min: 0, max: 20}),
      Faker.datatype.number({min: 0, max: 20}),
      Faker.datatype.number({min: 0, max: 20}),
      Faker.datatype.number({min: 0, max: 20}),
      Faker.datatype.number({min: 0, max: 20}),
      Faker.datatype.number({min: 0, max: 20}),
    ],
  },
];

export const MyMessagesData = () => {
  const data = [];
  const count = Faker.datatype.number({min: 28, max: 38});
  for (let i = 0; i < count; i++) {
    data.push({
      orderId: Faker.datatype.number({min: 11000, max: 1000000}),
      timestamp: Faker.date.between("2020-01-01", "2021-02-05"),
      title: Faker.random.arrayElement(["NEW", "FILLED", "CANCELED","PARTIALLY_FILLED", "REJECTED"]),
    });
  }
  return data;
};

export const newsData = () => {
  const data = [];
  const count = Faker.datatype.number({min: 1, max: 1});
  for (let i = 0; i < count; i++) {
    data.push({
      orderId: Faker.datatype.number({min: 11000, max: 1000000}),
      timestamp: Faker.date.between("2020-01-01", "2021-02-05"),
      title: Faker.random.arrayElement(["NEW", "FILLED", "CANCELED","PARTIALLY_FILLED", "REJECTED"]),
    });
  }
  return data;
};

export const AccountStatusData = () => {
  const data = [];
  const count = Faker.datatype.number({min: 1, max: 1});
  for (let i = 0; i < count; i++) {
    data.push({
      dailyWithdrawal: Faker.datatype.number({min: 11000, max: 1000000}),
      dailyDeposit: Faker.datatype.number({min: 0, max: 0}),
      monthlyWithdrawal: Faker.datatype.number({min: 11000, max: 1000000}),
      monthlyDeposit: Faker.datatype.number({min: 11000, max: 1000000}),
    });
  }
  return data;
};
