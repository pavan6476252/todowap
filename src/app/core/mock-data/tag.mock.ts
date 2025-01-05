import { ITag } from "../interfaces/tag.interface";

export const MOCK_TAGS: ITag[] = [
  {
    _id: '1',
    label: "Urgent",
    date: new Date("2024-06-14"),
    color: "#FF0000", // Red
  },
  {
    _id: '2',

    label: "Optional",
    date: new Date("2024-06-12"),
    color: "#FFC300", // Yellow
  },
  {
    _id: '3',

    label: "Home",
    date: new Date("2024-06-10"),
    color: "#4CAF50", // Green
  },
  {
    _id: '4',

    label: "Office",
    date: new Date("2024-06-11"),
    color: "#2196F3", // Blue
  },
];
