import { faker } from "@faker-js/faker";
import { useState } from "react";

export const dummyEvents = [];

const eventTypes = [
  "income",
  "expense",
];

const eventPeriods = [
  "daily",
  "weekly",
  "monthly",
  "annual",
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

Array.from({ length: 12 }).forEach(() => {
  dummyEvents.push(createRandomEvent());
});

export const useReportData = () => {
  const [reportData, setReportData] = useState([]);
  const getReportData = (startDate, endDate, precision) => {
    let tempData = [];
    let totalRevenue = 0;
    const step = getDateStep(precision);
    for (let date = new Date(startDate); date.valueOf() < endDate.valueOf(); date = increaseDate(date, precision)) {
      const item = addRandomDataItem(date, totalRevenue);
      tempData.push(item);
      totalRevenue = item.total_revenue;
    }
    setReportData(tempData);
  };
  const increaseDate = (date, precision) => {
    const step = getDateStep(precision);
    date.setDate(date.getDate() + step);
    return date;
  }
  const addRandomDataItem = (date, totalRevenue) => {
    const currentRevenue = faker.datatype.float({ min: -1000, max: 1000 });
    return {
      id: faker.random.numeric(10),
      date: date.toLocaleDateString(),
      revenue: currentRevenue,
      total_revenue: parseFloat((totalRevenue + currentRevenue).toFixed(2)),
    };
  };
  const getDateStep = (precision) => {
    switch (precision) {
      case 'daily':
        return 1;
      case 'weekly':
        return 7;
      case 'monthly':
        return 30;
      case 'annual':
        return 365;
    }
  };
  return {
    reportData,
    getReportData
  };
}