import { TableDataClass } from '../classes';
import { colorArray } from '../enums';
import { tableData, userInput } from '../interfaces';

export const generateRandomData = (index: number = 20): tableData[] => {
  let dataArray: tableData[] = [];
  for (let i = 0; i < index; i++) {
    let data: tableData = {
      id: (i + 1).toString(),
      int: getInt(),
      color: getRandomColor(),
      float: getFloat(),
      child: {
        id: (Math.floor(Math.random() * i * index) + 1).toString(),
        color: getRandomColor()
      }
    };
    dataArray.push(data);
  }
  return dataArray;
};

export const filterLatestElements = (
  tableData: TableDataClass[],
  userInputData: userInput
): TableDataClass[] => {
  const idArray = userInputData.arrayIds;
  if (idArray.length === 0) {
    tableData = tableData.slice(-10);
  } else {
    let selectedElements = tableData.filter(
      (elem) => idArray.indexOf(elem.id) > -1
    );
    tableData =
      selectedElements.length === 10
        ? selectedElements
        : [
            ...selectedElements,
            ...tableData.splice(-(10 - selectedElements.length))
          ];
  }
  return tableData;
};

const getRandomColor = () => {
  return Object.keys(colorArray)[
    Math.floor(Math.random() * Object.keys(colorArray).length)
  ];
};

const getFloat = () => {
  return +(Math.random() * (100 - 1) + 1).toFixed(18);
};

const getInt = () => {
  return Math.floor(Math.random() * 100000) + 1;
};
