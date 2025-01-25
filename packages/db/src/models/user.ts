class User {
  private __id: number;
  private __name: string;
  private __email: string;
  private __balance: number;
  private __password: string;
  private __created_at: Date;

  constructor(id: number, name: string, email: string, password: string) {
    this.__id = id;
    this.__name = name;
    this.__email = email;
    this.__password = password;
    this.__balance = 1000000;
    this.__created_at = new Date();
  }

  getId() {
    return this.__id;
  }
  getName() {
    return this.__name;
  }
  getEmail() {
    return this.__email;
  }
  getBalance() {
    return this.__balance;
  }
  getCreatedDate() {
    this.__created_at;
  }
  setBalance(balance: number) {
    this.__balance = balance;
  }
  reduceBalance(amount: number) {
    this.__balance -= amount;
  }
  addBalance(amount: number) {
    this.__balance += amount;
  }
}

export default User;
