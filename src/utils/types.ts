export type UserInfo = {
  username: string;
  surname: string;
  email: string;
  birthdate: string;
  phoneNumber: string;
};

export type CartItem = {
  name?: string;
  image?: string;
  description?: string;
  option?: string;
  price?: number;
  quantity?: number;
};
