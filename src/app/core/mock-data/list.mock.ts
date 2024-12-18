import { IList } from "../interfaces/list.interface";

export const MOCK_LISTS: IList[] = [
  {
    lable: "Personal",
    date: new Date("2024-06-15"),
    color: "#FF5733", // Red
  },
  {
    lable: "Work",
    date: new Date("2024-06-14"),
    color: "#33B5FF", // Blue
  },
  {
    lable: "Shopping",
    date: new Date("2024-06-16"),
    color: "#33FF57", // Green
  },
];
