class Order {
  private __id: number;
  private __price: number;
  private __userId: number;
  private __quantity: number;
  private __type: "BUY" | "SELL";
  private __orderType: "LIMIT" | "MARKET";
  private __market: string;

  constructor(
    id: number,
    userId: number,
    type: "BUY" | "SELL",
    orderType: "LIMIT" | "MARKET",
    quantity: number,
    price: number,
    market: string
  ) {
    this.__id = id;
    this.__userId = userId;
    this.__type = type;
    this.__orderType = orderType;
    this.__quantity = quantity;
    this.__price = price;
    this.__market = market;
  }

  getId() {
    return this.__id;
  }
  getPrice() {
    return this.__price;
  }
  getUserId() {
    return this.__userId;
  }
  getQuantity() {
    return this.__quantity;
  }
  getType() {
    return this.__type;
  }
  getOrderType() {
    return this.__orderType;
  }

  getMarket() {
    return this.__market;
  }
}

export default Order;
