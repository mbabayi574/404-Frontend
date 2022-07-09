import { faker } from "@faker-js/faker";
import { useState } from "react";
import useAPI from "useAPI";

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
  const api = useAPI();
  const [reportData, setReportData] = useState([]);

  const getReportData = (startDate, endDate, precision) => {
    let loading = false;
    const getReportDataPart = (startDate, endDate) => {
      let revenue = 0;
      loading = true;
      api({
        method: "get",
        url: `FinReport/main/cahrt/${formatDate(startDate)}/${formatDate(endDate)}`,
      }).then(response => {
        revenue = saveReportDataPart(response);
        loading = false;
      }).catch(error => {
        console.log(error);
      });
      console.log(revenue);
      return revenue;
    }
    const saveReportDataPart = (response) => {
      let revenue = 0;
      response.data.forEach(item => {
        revenue += item.amount;
      });
      return revenue;
    }

    let data = [];
    let totalRevenue = 0;
    for (let date = new Date(startDate); date.valueOf() < endDate.valueOf(); date = increaseDate(date, precision)) {
      let revenue = getReportDataPart(date, endDate);
      while (loading) {

      }
      totalRevenue += revenue;
      const item = {
        date: date.toLocaleDateString(),
        revenue: revenue,
        total_revenue: parseFloat(totalRevenue.toFixed(2)),
      };
      console.log(item);
      data.push(item);
    }
    setReportData(data);
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
  const formatDate = (date) => {
    let d = new Date(date);
    let month = (d.getMonth() + 1).toString();
    let day = d.getDate().toString();
    let year = d.getFullYear();
    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }
    return [year, month, day].join('-');
  }
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