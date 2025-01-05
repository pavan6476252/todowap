import { IList } from "../interfaces/list.interface";

export const MOCK_LISTS: IList[] = [
  {
    _id: '1',
    label: "Personal",
    date: new Date("2024-06-15"),
    color: "#FF5733", // Red
  },
  {
    _id: '2',

    label: "Work",
    date: new Date("2024-06-14"),
    color: "#33B5FF", // Blue
  },
  {
    _id: '3',

    label: "Shopping",
    date: new Date("2024-06-16"),
    color: "#33FF57", // Green
  },
];
