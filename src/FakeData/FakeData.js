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

export const OrderBookData = [
    {
        totalPrice: '413،990،000',
        Amount: "0.01",
        Count: "413،990،000",
        Percent: 10
    },
    {
        totalPrice: '413،990،000',
        Amount: "0.5",
        Count: "413،990،000",
        Percent: 15
    },
    {
        totalPrice: '413،990،000',
        Amount: "0.00",
        Count: "413،990،000",
        Percent: 25
    },
    {
        totalPrice: '413،990،000',
        Amount: "0.00",
        Count: "413،990،000",
        Percent: 26
    },

    {
        totalPrice: '413،990،000',
        Amount: "0.01",
        Count: "413،990،000",
        Percent: 28
    },
    {
        totalPrice: '413،990،000',
        Amount: "0.5",
        Count: "413،990،000",
        Percent: 30
    },
    {
        totalPrice: '413،990،000',
        Amount: "0.00",
        Count: "413،990،000",
        Percent: 38
    },
    {
        totalPrice: '413،990،000',
        Amount: "0.00",
        Count: "413،990،000",
        Percent: 45
    }, {
        totalPrice: '413،990،000',
        Amount: "0.01",
        Count: "413،990،000",
        Percent: 47
    },
    {
        totalPrice: '413،990،000',
        Amount: "0.5",
        Count: "413،990،000",
        Percent: 50
    },
    {
        totalPrice: '413،990،000',
        Amount: "0.00",
        Count: "413،990،000",
        Percent: 55
    },
    {
        totalPrice: '413،990،000',
        Amount: "0.00",
        Count: "413،990،000",
        Percent: 54
    }, {
        totalPrice: '413،990،000',
        Amount: "0.01",
        Count: "413،990،000",
        Percent: 56
    },
    {
        totalPrice: '413،990،000',
        Amount: "0.5",
        Count: "413،990،000",
        Percent: 60
    },
    {
        totalPrice: '413،990،000',
        Amount: "0.00",
        Count: "413،990،000",
        Percent: 20
    },
    {
        totalPrice: '413،990،000',
        Amount: "0.00",
        Count: "413،990،000",
        Percent: 42
    }, {
        totalPrice: '413،990،000',
        Amount: "0.01",
        Count: "413،990،000",
        Percent: 5
    },
    {
        totalPrice: '413،990،000',
        Amount: "0.5",
        Count: "413،990،000",
        Percent: 10
    },
    {
        totalPrice: '413،990،000',
        Amount: "0.00",
        Count: "413،990،000",
        Percent: 20
    },
    {
        totalPrice: '413،990،000',
        Amount: "0.00",
        Count: "413،990،000",
        Percent: 42
    }, {
        totalPrice: '413،990،000',
        Amount: "0.01",
        Count: "413،990،000",
        Percent: 5
    },
    {
        totalPrice: '413،990،000',
        Amount: "0.5",
        Count: "413،990،000",
        Percent: 10
    },
    {
        totalPrice: '413،990،000',
        Amount: "0.00",
        Count: "413،990،000",
        Percent: 20
    },
    {
        totalPrice: '413،990،000',
        Amount: "0.00",
        Count: "413،990،000",
        Percent: 42
    }, {
        totalPrice: '413،990،000',
        Amount: "0.01",
        Count: "413،990،000",
        Percent: 5
    },
    {
        totalPrice: '413،990،000',
        Amount: "0.5",
        Count: "413،990،000",
        Percent: 10
    },
    {
        totalPrice: '413،990،000',
        Amount: "0.00",
        Count: "413،990،000",
        Percent: 20
    },
    {
        totalPrice: '413،990،000',
        Amount: "0.00",
        Count: "413،990،000",
        Percent: 42
    }, {
        totalPrice: '413،990،000',
        Amount: "0.01",
        Count: "413،990،000",
        Percent: 5
    },
    {
        totalPrice: '413،990،000',
        Amount: "0.5",
        Count: "413،990،000",
        Percent: 10
    },
    {
        totalPrice: '413،990،000',
        Amount: "0.00",
        Count: "413،990،000",
        Percent: 20
    },
    {
        totalPrice: '413،990،000',
        Amount: "0.00",
        Count: "413،990،000",
        Percent: 42
    },
];


export const lastTradesData = () => {
    const data = [];
    for (let i = 0; i < 100; i++) {
        data.push({
            id: Faker.random.number,
            timestamp: Faker.date.between('2020-01-01', '2021-02-05'),
            AmountBTC: Faker.random.number({'min': 0, 'max': 1,precision: 0.0001}),
            CountIRRT: Faker.random.number({'min': 413990000, 'max': 613990000}),
            totalPrice: Faker.random.number({'min': 13990000, 'max': 413990000}),
            Type: Faker.random.arrayElement(['buy', 'sell'])
        });
    }

    return data;
}


