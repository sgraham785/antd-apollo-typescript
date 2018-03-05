const basicGoods = [
  {
    id: "1234561",
    name: "mineral water 550ml",
    barcode: "12421432143214321",
    price: "2.00",
    num: "1",
    amount: "2.00"
  },
  {
    id: "1234562",
    name: "herbal tea 300ml",
    barcode: "12421432143214322",
    price: "3.00",
    num: "2",
    amount: "6.00"
  },
  {
    id: "1234563",
    name: "delicious potato chips",
    barcode: "12421432143214323",
    price: "7.00",
    num: "4",
    amount: "28 .00 "
  },
  {
    id: "1234564",
    name: "special delicious egg roll",
    barcode: "12421432143214324",
    price: "8.50",
    num: "3",
    amount: "25 .50 "
  }
];

const basicProgress = [
  {
    key: "1",
    time: "2017-10-01 14:10",
    rate: "contact customer",
    status: "processing",
    operator: "Pickup ID1234",
    cost: "5mins"
  },
  {
    key: "2",
    time: "2017-10-01 14:05",
    rate: "pick-up departure",
    status: "success",
    operator: "Pickup ID1234",
    cost: "1h"
  },
  {
    key: "3",
    time: "2017-10-01 13:05",
    rate: "pick up orders",
    status: "success",
    operator: "Pickup ID1234",
    cost: "5mins"
  },
  {
    key: "4",
    time: "2017-10-01 13:00",
    rate: "approval application",
    status: "success",
    operator: "system",
    cost: "1h"
  },
  {
    key: "5",
    time: "2017-10-01 12:00",
    rate: "Initiate Return Request",
    status: "success",
    operator: "user",
    cost: "5mins"
  }
];

const advancedOperation1 = [
  {
    key: "op1",
    type: "order relationship effective",
    name: "Qu Lili",
    status: "agree",
    updatedAt: "2017-10-03 19:23:12",
    memo: "-"
  },
  {
    key: "op2",
    type: "Financial Review",
    name: "Pay small",
    status: "reject",
    updatedAt: "2017-10-03 19:23:12",
    memo: "do not pass the reason"
  },
  {
    key: "op3",
    type: "department first instance",
    name: "Week fur",
    status: "agree",
    updatedAt: "2017-10-03 19:23:12",
    memo: "-"
  },
  {
    key: "op4",
    type: "submit order",
    name: "Lin Dongdong",
    status: "agree",
    updatedAt: "2017-10-03 19:23:12",
    memo: "great"
  },
  {
    key: "op5",
    type: "create order",
    name: "Khan teeth",
    status: "agree",
    updatedAt: "2017-10-03 19:23:12",
    memo: "-"
  }
];

const advancedOperation2 = [
  {
    key: "op1",
    type: "order relationship effective",
    name: "Qu Lili",
    status: "agree",
    updatedAt: "2017-10-03 19:23:12",
    memo: "-"
  }
];

const advancedOperation3 = [
  {
    key: "op1",
    type: "create order",
    name: "Khan teeth",
    status: "agree",
    updatedAt: "2017-10-03 19:23:12",
    memo: "-"
  }
];

export const getProfileBasicData = {
  basicGoods,
  basicProgress
};

export const getProfileAdvancedData = {
  advancedOperation1,
  advancedOperation2,
  advancedOperation3
};

export default {
  getProfileBasicData,
  getProfileAdvancedData
};
