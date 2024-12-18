import { ITag } from "../interfaces/tag.interface";

export const MOCK_TAGS: ITag[] = [
  {
    lable: "Urgent",
    date: new Date("2024-06-14"),
    color: "#FF0000", // Red
  },
  {
    lable: "Optional",
    date: new Date("2024-06-12"),
    color: "#FFC300", // Yellow
  },
  {
    lable: "Home",
    date: new Date("2024-06-10"),
    color: "#4CAF50", // Green
  },
  {
    lable: "Office",
    date: new Date("2024-06-11"),
    color: "#2196F3", // Blue
  },
];
