export interface tableData {
  id: string;
  int: number;
  float: number;
  color: string;
  child: childData;
}

export interface childData {
  id: string;
  color: string;
}

export interface userInput {
  timer: number;
  size: number;
  arrayIds: string[];
}
