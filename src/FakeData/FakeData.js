import Faker from 'faker';

export const OverViewData = {
    lastDay: {
        change: Faker.random.number({'min': 0, 'max': 10}),
        min: Faker.random.number({'min': 413990000, 'max': 513990000}),
        max: Faker.random.number({'min': 513990000, 'max': 613990000}),
        volume: Faker.random.number({'min': 513990000, 'max': 613990000}),
        type: Faker.random.boolean()
    },
    lastWeek: {
        change: Faker.random.number({'min': 0, 'max': 10}),
        min: Faker.random.number({'min': 413990000, 'max': 513990000}),
        max: Faker.random.number({'min': 513990000, 'max': 613990000}),
        volume: Faker.random.number({'min': 513990000, 'max': 613990000}),
        type: Faker.random.boolean()
    },
    lastMonth: {
        change: Faker.random.number({'min': 0, 'max': 10}),
        min: Faker.random.number({'min': 413990000, 'max': 513990000}),
        max: Faker.random.number({'min': 513990000, 'max': 613990000}),
        volume: Faker.random.number({'min': 513990000, 'max': 613990000}),
        type: Faker.random.boolean()
    },
}

export const OrderData = {
    Buy: {CurrencyBalance: "12،350،000 تومان", BestOffer: "450،000،000 ", type: true},
    sale: {CurrencyBalance: "0.3 بیتکوین", BestOffer: "450،000،000 ", type: true},

}

/*export const OrderBookData = [
    {
        totalPrice: '413،990،000',
        Amount: "0.01",
        Count: "413،990،000",
        Percent: 10
    }
];*/

export const OrderBookBuyData = () => {
    const data = [];
    for (let i = 0; i < 100; i++) {
        data.push({
            id: Faker.random.number,
            amount: Faker.random.number({'min': 0, 'max': 1.5,precision: 0.0001}),
            pricePerUnit: Faker.random.number({'min': 4990000, 'max': 3990000}),
            totalPrice: Faker.random.number({'min': 139900000, 'max': 4139900000}),
            percent:Faker.random.number({'min': 1, 'max': 70})
        });
    }
    return data;
}
export const OrderBookSellData = () => {
    const data = [];
    for (let i = 0; i < 100; i++) {
        data.push({
            id: Faker.random.number,
            amount: Faker.random.number({'min': 0, 'max': 1.5,precision: 0.0001}),
            pricePerUnit: Faker.random.number({'min': 4990000, 'max': 3990000}),
            totalPrice: Faker.random.number({'min': 139900000, 'max': 4139900000}),
            percent:Faker.random.number({'min': 1, 'max': 70})
        });
    }
    return data;
}

export const lastTradesData = () => {
    const data = [];
    for (let i = 0; i < 100; i++) {
        data.push({
            id: Faker.random.number,
            timestamp: Faker.date.between('2020-01-01', '2021-02-05'),
            amount: Faker.random.number({'min': 0, 'max': 1,precision: 0.0001}),
            price: Faker.random.number({'min': 413990000, 'max': 613990000}),
            totalPrice: Faker.random.number({'min': 13990000, 'max': 413990000}),
            Type: Faker.random.arrayElement(['buy', 'sell'])
        });
    }

    return data;
}

export const MyOrderCurrentData = () => {
    const data = [];
    const count = Faker.random.number({'min': 2, 'max': 15})
    for (let i = 0; i < count; i++) {
        data.push({
            orderId: Faker.random.number({'min': 11000, 'max': 1000000}),
            timestamp: Faker.date.between('2020-01-01', '2021-02-05'),
            volume: Faker.random.number({'min': 0, 'max': 1,precision: 0.0001}),
            price: Faker.random.number({'min': 413990000, 'max': 613990000}),
            totalPrice: Faker.random.number({'min': 13990000, 'max': 413990000}),
            tradedAmount: Faker.random.number({'min': 0, 'max': 1,precision: 0.0001}),
            avgTradedAmount: Faker.random.number({'min': 0, 'max': 1,precision: 0.0001}),
            tradedPrice: Faker.random.number({'min': 0, 'max': 1,precision: 0.0001}),
            type: Faker.random.arrayElement(['buy', 'sell']),
            progress: Faker.random.number({'min': 0, 'max': 100,precision: 0.5})
        });
    }
    return data;
}

export const MyOrderHistoryData = () => {
    const data = [];
    const count = Faker.random.number({'min': 2, 'max': 15})
    for (let i = 0; i < count; i++) {
        data.push({
            orderId: Faker.random.number({'min': 11000, 'max': 1000000}),
            orderType: Faker.random.arrayElement(['stopLimit','stopMarket']),
            timestamp: Faker.date.between('2020-01-01', '2021-02-05'),
            stopOrderTime: Faker.date.between('2020-01-01', '2021-02-05'),
            startOrderTime: Faker.date.between('2020-01-01', '2021-02-05'),
            volume: Faker.random.number({'min': 0, 'max': 1,precision: 0.0001}),
            price: Faker.random.number({'min': 413990000, 'max': 613990000}),
            stoppedPrice: Faker.random.number({'min': 413990000, 'max': 613990000}),
            totalPrice: Faker.random.number({'min': 13990000, 'max': 413990000}),
            type: Faker.random.arrayElement(['buy', 'sell']),
            status: Faker.random.arrayElement(['live', 'reject','done','cancel']),
        });
    }
    return data;
}
export const MyOrderStopData = () => {
    const data = [];
    const count = Faker.random.number({'min': 2, 'max': 15})
    for (let i = 0; i < count; i++) {
        data.push({
            orderId: Faker.random.number({'min': 11000, 'max': 1000000}),
            timestamp: Faker.date.between('2020-01-01', '2021-02-05'),
            volume: Faker.random.number({'min': 0, 'max': 1,precision: 0.0001}),
            price: Faker.random.number({'min': 413990000, 'max': 613990000}),
            totalPrice: Faker.random.number({'min': 13990000, 'max': 413990000}),
            stopPrice: Faker.random.number({'min': 13990000, 'max': 413990000}),
            type: Faker.random.arrayElement(['buy', 'sell']),
        });
    }
    return data;
}
export const MyOrderTradeData = () => {
    const data = [];
    const count = Faker.random.number({'min': 2, 'max': 15})
    for (let i = 0; i < count; i++) {
        data.push({
            orderId: Faker.random.number({'min': 11000, 'max': 1000000}),
            tradeId: Faker.random.number({'min': 11000, 'max': 1000000}),
            timestamp: Faker.date.between('2020-01-01', '2021-02-05'),
            volume: Faker.random.number({'min': 0, 'max': 1,precision: 0.0001}),
            price: Faker.random.number({'min': 413990000, 'max': 613990000}),
            totalPrice: Faker.random.number({'min': 13990000, 'max': 413990000}),
            type: Faker.random.arrayElement(['buy', 'sell']),
        });
    }
    return data;
}


export const DTAllTransactionsData = () => {
    const data = [];
    const count = Faker.random.number({'min': 2, 'max': 15})
    for (let i = 0; i < count; i++) {
        data.push({
            orderId: Faker.random.number({'min': 11000, 'max': 1000000}),
            timestamp: Faker.date.between('2020-01-01', '2021-02-05'),
            transactionType: Faker.random.arrayElement(['deposit', 'withdrawal', 'Received', 'send']),
            volume: Faker.random.number({'min': 0, 'max': 1,precision: 0.0001}),
            inventory: Faker.random.number({'min': 0, 'max': 2,precision: 0.0001}),
            destination: "009891****"+Faker.random.number({'min': 1000, 'max': 9999}),
            transactionId: Faker.random.number({'min': 8439201925530, 'max': 8539201925530}),
            blockchainTransactionId: "befe"+Faker.random.number({'min': 8439201925530, 'max': 8539201925530}),
            status: Faker.random.arrayElement(['live', 'reject','done','cancel','doing']),
            progress: Faker.random.number({'min': 0, 'max': 100,precision: 0.5})
        });
    }
    return data;
}

export const OrdersTradesAliveOrderData = () => {
    const data = [];
    const count = Faker.random.number({'min': 2, 'max': 15})
    for (let i = 0; i < count; i++) {
        data.push({
            orderId: Faker.random.number({'min': 11000, 'max': 1000000}),
            timestamp: Faker.date.between('2020-01-01', '2021-02-05'),
            market: Faker.random.arrayElement(['BTC/IRT','ETH/BTC','BTC/USDT']),
            side: Faker.random.arrayElement(['buy', 'sell']),
            order: Faker.random.number({'min': 0, 'max': 10,precision: 0.0001}),
            done: Faker.random.number({'min': 0, 'max': 0.5,precision: 0.0001}),
            pricePerUnit: Faker.random.number({'min': 0, 'max': 2,precision: 0.0001}),
            totalPrice: Faker.random.number({'min': 0, 'max': 5,precision: 0.0001}),
            donePercentage: Faker.random.number({'min': 0, 'max': 100,precision: 0.5})
        });
    }
    return data;
}

export const OrdersTradesStopData = () => {
    const data = [];
    const count = Faker.random.number({'min': 2, 'max': 15})
    for (let i = 0; i < count; i++) {
        data.push({
            orderId: Faker.random.number({'min': 11000, 'max': 1000000}),
            timestamp: Faker.date.between('2020-01-01', '2021-02-05'),
            market: Faker.random.arrayElement(['BTC/IRT', 'ETH/BTC','BTC/USDT']),
            side: Faker.random.arrayElement(['buy', 'sell']),
            order: Faker.random.number({'min': 0, 'max': 10,precision: 0.0001}),
            stoppedPrice: Faker.random.number({'min': 0, 'max': 450000540}),
            pricePerUnit: Faker.random.number({'min': 0, 'max': 450000540}),
            totalPrice: Faker.random.number({'min': 0, 'max': 450000540}),
            donePercentage: Faker.random.number({'min': 0, 'max': 100,precision: 0.5})
        });
    }
    return data;
}

export const OrdersTradesOrdersHistoryData = () => {
    const data = [];
    const count = Faker.random.number({'min': 2, 'max': 15})
    for (let i = 0; i < count; i++) {
        data.push({
            orderId: Faker.random.number({'min': 11000, 'max': 1000000}),
            timestamp: Faker.date.between('2020-01-01', '2021-02-05'),
            market: Faker.random.arrayElement(['BTC/IRT', 'ETH/BTC','BTC/USDT']),
            side: Faker.random.arrayElement(['buy', 'sell']),
            type: Faker.random.arrayElement(['market', 'limit']),
            order: Faker.random.number({'min': 0, 'max': 1,precision: 0.0001}),
            done: Faker.random.number({'min': 0, 'max': 1,precision: 0.0001}),
            pricePerUnit: Faker.random.number({'min': 0, 'max': 450000540}),
            paid: Faker.random.number({'min': 0, 'max': 450000540}),
            status: Faker.random.arrayElement(['reject','done','cancel','incompleted']),
        });
    }
    return data;
}

export const OrdersTradesTradesData = () => {
    const data = [];
    const count = Faker.random.number({'min': 2, 'max': 15})
    for (let i = 0; i < count; i++) {
        data.push({
            orderId: Faker.random.number({'min': 11000, 'max': 1000000}),
            timestamp: Faker.date.between('2020-01-01', '2021-02-05'),
            market: Faker.random.arrayElement(['BTC/IRT', 'ETH/BTC','BTC/USDT']),
            side: Faker.random.arrayElement(['buy', 'sell']),
            type: Faker.random.arrayElement(['market', 'limit']),
            order: Faker.random.number({'min': 0, 'max': 1,precision: 0.0001}),
            stoppedPrice: Faker.random.number({'min': 0, 'max': 450000540}),
            pricePerUnit: Faker.random.number({'min': 0, 'max': 450000540}),
            totalPrice: Faker.random.number({'min': 0, 'max': 450000540}),

        });
    }
    return data;
}
