class Customer {
    constructor(id, userId, name, phone, address, address2, city, state, zipcode) {
      this.id = id;
      this.userId = userId;
      this.name = name;
      this.phone = phone;
      this.address = address;
      this.address2 = address2 || null;
      this.city = city;
      this.state = state;
      this.zipcode = zipcode;
    }
  
    static fromRequestBody(body) {
      return new Customer(
        null,
        body.userId,
        body.name,
        body.phone,
        body.address,
        body.address2,
        body.city,
        body.state,
        body.zipcode
      );
    }
  
    toJSON() {
      return {
        id: this.id,
        userId: this.userId,
        name: this.name,
        phone: this.phone,
        address: this.address,
        address2: this.address2,
        city: this.city,
        state: this.state,
        zipcode: this.zipcode
      };
    }
  }
  
  module.exports = Customer;
  