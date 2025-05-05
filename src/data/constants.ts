import { UserInfo } from '../utils/types';

export const userInfo: UserInfo = {
  username: process.env.USER_NAME,
  surname: process.env.SURNAME,
  email: process.env.EMAIL,
  birthdate: process.env.BIRTHDATE,
  phoneNumber: process.env.PHONE,
};
