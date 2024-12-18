import { ITask } from "../interfaces/task.interface";
import { MOCK_LISTS } from "./list.mock";
import { MOCK_TAGS } from "./tag.mock";

 
export const MOCK_TASKS: ITask[] = [
  {
    title: "Prepare Meeting Notes",
    desc: "Prepare notes for the upcoming client meeting.",
    list: MOCK_LISTS[1], // Work
    expiry_date: new Date("2024-06-20"),
    tags: [MOCK_TAGS[0], MOCK_TAGS[3]], // Urgent, Office
    sub_tasks: [
      {
        title: "Summarize last meeting",
        completed: true,
        created_date: new Date("2024-06-10"),
        completed_date: new Date("2024-06-12"),
      },
      {
        title: "Create agenda",
        completed: false,
        created_date: new Date("2024-06-11"),
      },
    ],
    created_date: new Date("2024-06-10"),
    completed: false,
  },
  {
    title: "Buy Groceries",
    desc: "Buy items for the weekend dinner.",
    list: MOCK_TAGS[2], // Shopping
    expiry_date: new Date("2024-06-17"),
    tags: [MOCK_TAGS[2]], // Home
    sub_tasks: [
      {
        title: "Make a list of groceries",
        completed: true,
        created_date: new Date("2024-06-12"),
        completed_date: new Date("2024-06-13"),
      },
      {
        title: "Visit supermarket",
        completed: false,
        created_date: new Date("2024-06-13"),
      },
    ],
    created_date: new Date("2024-06-12"),
    completed: false,
  },
  {
    title: "Complete Project Report",
    desc: "Finalize and submit the project report.",
    list: MOCK_TAGS[1], // Work
    expiry_date: new Date("2024-06-25"),
    tags: [MOCK_TAGS[0]], // Urgent
    sub_tasks: [
      {
        title: "Draft report",
        completed: true,
        created_date: new Date("2024-06-14"),
        completed_date: new Date("2024-06-15"),
      },
      {
        title: "Review report",
        completed: false,
        created_date: new Date("2024-06-15"),
      },
    ],
    created_date: new Date("2024-06-14"),
    completed: false,
  },
];
