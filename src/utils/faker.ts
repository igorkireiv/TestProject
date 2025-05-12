import { faker } from '@faker-js/faker';

export class Faker {
  static generateFakeUser() {
    return {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      fullName: faker.person.fullName(),
      email: faker.internet.email(),
      // phone: faker.phone.number('+38 0## ### ## ##'),
      address: faker.location.streetAddress(),
      city: faker.location.city(),
      postalCode: faker.location.zipCode(),
    };
  }

  static generateFakeProductName(): string {
    return faker.commerce.productName();
  }

  static generateFakePassword(length = 10): string {
    return faker.internet.password({ length, memorable: true });
  }

  static getRandomNumber(min: number, max: number): number {
    return faker.number.int({ min, max });
  }

  static getRandomFloat(min: number, max: number, decimals = 2): number {
    const factor = Math.pow(10, decimals);
    return Math.round(faker.number.float({ min, max }) * factor) / factor;
  }
}
