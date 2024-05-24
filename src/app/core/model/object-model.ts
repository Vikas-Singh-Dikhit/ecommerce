export class User {
  name!: string;
  password!: string;
  uploadPhoto!: string;
  role!: string;
  mobNumber!: string;
  address!: Address;
  gender!: string;
  language!: string;
  email!: string;
  dob!: string;
  aggretc!: boolean;
  age!: number;
  aboutYou!: string;
  desc!: string;
}

export class Address {
  id!: number;
  addLine1!: string;
  addLine2!: string;
  city!: string;
  state!: string;
  zipcode!: number;
}

export class Product {
  id!: number;
  name!: string;
  uploadPhoto!: string;
  uploadDesc!: string;
  mrp!: number;
  dp!: number;
  status!: string;
}

export class Order {
  id!: number;
  userId!: number;
  sellerId!: number;
  product!: Product;
  deliveryAddress!: Address;
  contact!: number;
  dataTime!: string;
}
