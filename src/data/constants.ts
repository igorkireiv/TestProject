import { UserInfo } from '@types';

export const logInFormTitle = 'Вхід до особистого кабінету';

export const userInfo: UserInfo = {
  username: process.env.USER_NAME,
  surname: process.env.SURNAME,
  email: process.env.EMAIL,
  birthdate: process.env.BIRTHDATE,
  phoneNumber: process.env.PHONE,
};

export enum ProductCategory {
  PERFUMERY = 'Парфумерія',
  MAKE_UP = 'Макіяж',
  FACE = 'Обличчя',
  HAIR = 'Волосся',
  BODY = 'Тіло',
  HEALTH_CARE = "Здоров'я і догляд",
  ACCESSORIES_AND_EQUIPMENT = 'Аксесуари і техніка',
  CLOTHING = 'Одяг',
  MEN = 'Чоловікам',
  GIFTS = 'Подарунки',
  BRANDS = 'Бренди',
}

export enum Filter {
  BRAND = 'Бренд',
  PRODUCT_GROUP = 'Група товару',
  VOLUME = "Об'єм"
}
