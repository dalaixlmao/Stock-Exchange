import DB from "@repo/db/src";
import { orderInputType } from "@repo/type";

class OrderService {
  private __db: DB;
  constructor() {
    this.__db = DB.getInstance();
  }


  getNewOrderId(){
    return new Date().getTime();
  }
}

export default OrderService;
