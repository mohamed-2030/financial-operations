const date = new Date();
const currentDay = +date.getDate() + 1;
const currentMonth = +date.getMonth();
const currentYear = +date.getFullYear();
const weekOnMs = 7 * 24 * 60 * 60 * 1000;
const currentDayDate = new Date(currentYear, currentMonth, currentDay);
const currentDayDateMs = currentDayDate.getTime();
const firstDayInCurrentWeek = currentDayDateMs - weekOnMs;
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const classementOfCurrentDay = (array) => {
  const beforCurrentDay = [];
  const afterCurrentDay = [];
  array.forEach((item, index) => {
    index <= date.getDay()
      ? beforCurrentDay.push(item)
      : afterCurrentDay.push(item);
  });
  return [...afterCurrentDay, ...beforCurrentDay];
};

export const currentWeek = classementOfCurrentDay(days);

const getDayNumberInWeek = (dayData) => {
  const dayDate = new Date(dayData.year, dayData.month, dayData.day);

  return +dayDate.getDay();
};

const checkIsDayinCurrentWeekRange = (dayData) => {
  const dayDate = new Date(dayData.year, dayData.month, dayData.day);
  const dayDateMs = dayDate.getTime();

  return dayDateMs >= firstDayInCurrentWeek && dayDateMs < currentDayDateMs;
};

export const totalOperationsPerDayinWeek = (operationsData) => {
  const totalPriceEachDayInWeek = [0, 0, 0, 0, 0, 0, 0];
  operationsData.forEach((operation) => {
    if (!checkIsDayinCurrentWeekRange(operation.operationDate)) return;

    const weekDay = getDayNumberInWeek(operation.operationDate);
    totalPriceEachDayInWeek[weekDay] =
      totalPriceEachDayInWeek[weekDay] + operation.price;
  });
  return classementOfCurrentDay(totalPriceEachDayInWeek);
};

export const totalOperationsPerMonthInYear = (operationsData) => {
  const totalPriceEachMonthInYear = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  operationsData.forEach((operation) => {
    if (operation.operationDate.year !== currentYear) return;

    const targetMonth = operation.operationDate.month;
    totalPriceEachMonthInYear[targetMonth] =
      totalPriceEachMonthInYear[targetMonth] + operation.price;
  });
  return totalPriceEachMonthInYear;
};

export const operationsTypePerDayinWeek = (operationsData) => {
  const meTypeEachDayInWeek = [0, 0, 0, 0, 0, 0, 0];
  const houseTypeEachDayInWeek = [0, 0, 0, 0, 0, 0, 0];
  const elseTypeEachDayInWeek = [0, 0, 0, 0, 0, 0, 0];
  operationsData.forEach((operation) => {
    if (!checkIsDayinCurrentWeekRange(operation.operationDate)) return;
    const weekDay = getDayNumberInWeek(operation.operationDate);
    if (operation.type === "House") {
      houseTypeEachDayInWeek[weekDay] =
        houseTypeEachDayInWeek[weekDay] + operation.price;
    } else if (operation.type === "Me") {
      meTypeEachDayInWeek[weekDay] =
        meTypeEachDayInWeek[weekDay] + operation.price;
    } else {
      elseTypeEachDayInWeek[weekDay] =
        elseTypeEachDayInWeek[weekDay] + operation.price;
    }
  });
  return [
    classementOfCurrentDay(meTypeEachDayInWeek),
    classementOfCurrentDay(houseTypeEachDayInWeek),
    classementOfCurrentDay(elseTypeEachDayInWeek),
  ];
};

export const operationsTypePerMonthinYear = (operationsData) => {
  const meTypeEachMonthInYear = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const houseTypeEachMonthInYear = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const elseTypeEachMonthInYear = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  operationsData.forEach((operation) => {
    if (operation.operationDate.year !== currentYear) return;

    const targetMonth = operation.operationDate.month;
    if (operation.type === "House") {
      houseTypeEachMonthInYear[targetMonth] =
        houseTypeEachMonthInYear[targetMonth] + operation.price;
    } else if (operation.type === "Me") {
      meTypeEachMonthInYear[targetMonth] =
        meTypeEachMonthInYear[targetMonth] + operation.price;
    } else {
      elseTypeEachMonthInYear[targetMonth] =
        elseTypeEachMonthInYear[targetMonth] + operation.price;
    }
  });
  return [
    meTypeEachMonthInYear,
    houseTypeEachMonthInYear,
    elseTypeEachMonthInYear,
  ];
};
