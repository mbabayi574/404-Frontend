import { faker } from "@faker-js/faker";

export const dummyEvents = [];

const eventTypes = [
  "income",
  "expense",
];

const eventPeriods = [
  "daily",
  "weekly",
  "monthly",
  "yearly",
  "one-time",
];

export const createRandomEvent = () => {
  return {
    id: faker.random.numeric(10),
    name: faker.random.words(),
    amount: faker.commerce.price(),
    type: faker.helpers.arrayElement(eventTypes),
    period: faker.helpers.arrayElement(eventPeriods),
    date: faker.date.past(),
  };
};

Array.from({length: 10}).forEach(() => {
  dummyEvents.push(createRandomEvent());
});