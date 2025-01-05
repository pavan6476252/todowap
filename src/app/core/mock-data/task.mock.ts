import { ITask } from "../interfaces/task.interface";
import { MOCK_LISTS } from "./list.mock";
import { MOCK_TAGS } from "./tag.mock";

// Current date
const currentDate = new Date();

// Calculate future and past dates
const upcomingDate = new Date();
upcomingDate.setDate(currentDate.getDate() + 7);

const previousDate = new Date();
previousDate.setDate(currentDate.getDate() - 7);

export const MOCK_TASKS: ITask[] = [
  {
    _id: "1",
    title: "Prepare Meeting Notes",
    desc: "Prepare notes for the upcoming client meeting.",
    list: MOCK_LISTS[1], // Work
    expiry_date: upcomingDate, // Task expiry in 7 days
    tags: [MOCK_TAGS[0], MOCK_TAGS[3]], // Urgent, Office
    sub_tasks: [
      {
        _id: '1',
        title: "Summarize last meeting",
        completed: true,
        created_date: previousDate,
        completed_date: new Date(currentDate.setDate(currentDate.getDate() - 5)),
      },
      {
        _id: '2',
        title: "Create agenda",
        completed: false,
        created_date: currentDate,
      },
    ],
    created_date: currentDate,
    completed: false,
  },
  {
    _id: "2",
    title: "Buy Groceries",
    desc: "Buy items for the weekend dinner.",
    list: MOCK_TAGS[2], // Shopping
    expiry_date: currentDate,
    tags: [MOCK_TAGS[2]], // Home
    sub_tasks: [
      {
        _id: '1',
        title: "Make a list of groceries",
        completed: true,
        created_date: previousDate,
        completed_date: new Date(currentDate.setDate(currentDate.getDate() - 2)),
      },
      {
        _id: '2',
        title: "Visit supermarket",
        completed: false,
        created_date: currentDate,
      },
    ],
    created_date: new Date(),
    completed: false,
  },
  {
    _id: "3",
    title: "Complete Project Report",
    desc: "Finalize and submit the project report.",
    list: MOCK_TAGS[1], // Work
    expiry_date: upcomingDate,
    tags: [MOCK_TAGS[0]], // Urgent
    sub_tasks: [
      {
        _id: '1',
        title: "Draft report",
        completed: true,
        created_date: new Date(currentDate.setDate(currentDate.getDate() - 5)),
        completed_date: new Date(currentDate.setDate(currentDate.getDate() - 4)),
      },
      {
        _id: '2',
        title: "Review report",
        completed: false,
        created_date: new Date(currentDate.setDate(currentDate.getDate() - 3)),
      },
    ],
    created_date: new Date(currentDate.setDate(currentDate.getDate() - 5)),
    completed: false,
  },
  {
    _id: "4",
    title: "Call Mom",
    desc: "Call mom to check on her.",
    list: MOCK_LISTS[0], // Personal
    expiry_date: currentDate,
    tags: [MOCK_TAGS[1]], // Family
    sub_tasks: [
      {
        _id: '1',
        title: "Dial her number",
        completed: true,
        created_date: new Date(currentDate.setDate(currentDate.getDate() - 1)),
        completed_date: new Date(currentDate.setDate(currentDate.getDate() - 1)),
      },
      {
        _id: '2',
        title: "Talk about family news",
        completed: false,
        created_date: currentDate,
      },
    ],
    created_date: new Date(),
    completed: false,
  },
  {
    _id: "5",
    title: "Submit Tax Documents",
    desc: "Prepare and submit tax documents before the deadline.",
    list: MOCK_LISTS[1], // Work
    expiry_date: new Date(currentDate.setMonth(currentDate.getMonth() + 1)),
    tags: [MOCK_TAGS[0]], // Urgent
    sub_tasks: [
      {
        _id: '1',
        title: "Organize receipts",
        completed: true,
        created_date: new Date(currentDate.setDate(currentDate.getDate() - 3)),
        completed_date: new Date(currentDate.setDate(currentDate.getDate() - 2)),
      },
      {
        _id: '2',
        title: "Fill tax forms",
        completed: false,
        created_date: currentDate,
      },
    ],
    created_date: new Date(currentDate.setDate(currentDate.getDate() - 3)),
    completed: false,
  },
  {
    _id: "6",
    title: "Finish Reading Book",
    desc: "Read 'The Great Gatsby' and complete notes.",
    list: MOCK_LISTS[0], // Personal
    expiry_date: new Date(currentDate.setDate(currentDate.getDate() + 14)), // 14 days from today
    tags: [MOCK_TAGS[3]], // Literature
    sub_tasks: [
      {
        _id: '1',
        title: "Read chapters 1-3",
        completed: true,
        created_date: new Date(currentDate.setDate(currentDate.getDate() - 7)),
        completed_date: new Date(currentDate.setDate(currentDate.getDate() - 6)),
      },
      {
        _id: '2',
        title: "Make notes for chapters 4-6",
        completed: false,
        created_date: currentDate,
      },
    ],
    created_date: new Date(currentDate.setDate(currentDate.getDate() - 7)),
    completed: false,
  },
  {
    _id: "7",
    title: "Schedule Doctor Appointment",
    desc: "Book an appointment with the doctor for routine checkup.",
    list: MOCK_LISTS[0], // Personal
    expiry_date: new Date(currentDate.setDate(currentDate.getDate() + 3)), // 3 days from today
    tags: [MOCK_TAGS[1]], // Health
    sub_tasks: [
      {
        _id: '1',
        title: "Call the clinic",
        completed: false,
        created_date: currentDate,
      },
      {
        _id: '2',
        title: "Choose appointment date",
        completed: false,
        created_date: new Date(currentDate.setDate(currentDate.getDate() + 1)),
      },
    ],
    created_date: currentDate,
    completed: false,
  },
  {
    _id: "8",
    title: "Organize Workspace",
    desc: "Clean and organize the home office space.",
    list: MOCK_LISTS[1], // Work
    expiry_date: currentDate,
    tags: [MOCK_TAGS[2]], // Home
    sub_tasks: [
      {
        _id: '1',
        title: "Clear desk clutter",
        completed: true,
        created_date: new Date(currentDate.setDate(currentDate.getDate() - 2)),
        completed_date: new Date(currentDate.setDate(currentDate.getDate() - 1)),
      },
      {
        _id: '2',
        title: "Sort through papers",
        completed: false,
        created_date: currentDate,
      },
    ],
    created_date: new Date(currentDate.setDate(currentDate.getDate() - 2)),
    completed: false,
  },
  {
    _id: "9",
    title: "Attend Networking Event",
    desc: "Go to the local business networking event.",
    list: MOCK_LISTS[1], // Work
    expiry_date: upcomingDate,
    tags: [MOCK_TAGS[3]], // Networking
    sub_tasks: [
      {
        _id: '1',
        title: "Prepare business cards",
        completed: true,
        created_date: previousDate,
        completed_date: new Date(currentDate.setDate(currentDate.getDate() - 6)),
      },
      {
        _id: '2',
        title: "Research event details",
        completed: false,
        created_date: currentDate,
      },
    ],
    created_date: new Date(),
    completed: false,
  },
  {
    _id: "10",
    title: "Plan Weekend Trip",
    desc: "Book travel and accommodations for the weekend trip.",
    list: MOCK_LISTS[0], // Personal
    expiry_date: upcomingDate,
    tags: [MOCK_TAGS[1]], // Travel
    sub_tasks: [
      {
        _id: '1',
        title: "Select destination",
        completed: true,
        created_date: new Date(currentDate.setDate(currentDate.getDate() - 4)),
        completed_date: new Date(currentDate.setDate(currentDate.getDate() - 3)),
      },
      {
        _id: '2',
        title: "Book flight",
        completed: false,
        created_date: currentDate,
      },
    ],
    created_date: new Date(currentDate.setDate(currentDate.getDate() - 4)),
    completed: false,
  },
  {
    _id: "11",
    title: "Update Resume",
    desc: "Update the resume with recent job experiences.",
    list: MOCK_LISTS[1], // Work
    expiry_date: new Date(currentDate.setMonth(currentDate.getMonth() + 1)),
    tags: [MOCK_TAGS[0]], // Urgent
    sub_tasks: [
      {
        _id: '1',
        title: "Add new job experiences",
        completed: true,
        created_date: new Date(currentDate.setDate(currentDate.getDate() - 6)),
        completed_date: new Date(currentDate.setDate(currentDate.getDate() - 5)),
      },
      {
        _id: '2',
        title: "Update skills section",
        completed: false,
        created_date: currentDate,
      },
    ],
    created_date: new Date(),
    completed: false,
  },
  {
    _id: "12",
    title: "Clean House",
    desc: "Complete a thorough cleaning of the house.",
    list: MOCK_LISTS[0], // Personal
    expiry_date: currentDate,
    tags: [MOCK_TAGS[2]], // Home
    sub_tasks: [
      {
        _id: '1',
        title: "Vacuum floors",
        completed: true,
        created_date: previousDate,
        completed_date: new Date(currentDate.setDate(currentDate.getDate() - 3)),
      },
      {
        _id: '2',
        title: "Dust surfaces",
        completed: false,
        created_date: currentDate,
      },
    ],
    created_date: previousDate,
    completed: false,
  },
  {
    _id: "13",
    title: "Complete Online Course",
    desc: "Finish the online course for project management.",
    list: MOCK_LISTS[1], // Work
    expiry_date: upcomingDate,
    tags: [MOCK_TAGS[3]], // Education
    sub_tasks: [
      {
        _id: '1',
        title: "Watch videos for modules 1-3",
        completed: true,
        created_date: new Date(currentDate.setDate(currentDate.getDate() - 7)),
        completed_date: new Date(currentDate.setDate(currentDate.getDate() - 6)),
      },
      {
        _id: '2',
        title: "Complete assignments for modules 4-6",
        completed: false,
        created_date: currentDate,
      },
    ],
    created_date: new Date(currentDate.setDate(currentDate.getDate() - 7)),
    completed: false,
  },
  {
    _id: "14",
    title: "Review Monthly Budget",
    desc: "Check and update the monthly financial budget.",
    list: MOCK_LISTS[0], // Personal
    expiry_date: new Date(currentDate.setDate(currentDate.getDate() + 2)),
    tags: [MOCK_TAGS[1]], // Financial
    sub_tasks: [
      {
        _id: '1',
        title: "Check income and expenses",
        completed: true,
        created_date: new Date(currentDate.setDate(currentDate.getDate() - 1)),
        completed_date: new Date(currentDate.setDate(currentDate.getDate() - 1)),
      },
      {
        _id: '2',
        title: "Adjust savings",
        completed: false,
        created_date: currentDate,
      },
    ],
    created_date: new Date(currentDate.setDate(currentDate.getDate() - 1)),
    completed: false,
  },
  {
    _id: "15",
    title: "Prepare Presentation",
    desc: "Create slides and rehearse for the upcoming client presentation.",
    list: MOCK_LISTS[1], // Work
    expiry_date: upcomingDate,
    tags: [MOCK_TAGS[0]], // Urgent
    sub_tasks: [
      {
        _id: '1',
        title: "Create slides for introduction",
        completed: true,
        created_date: new Date(currentDate.setDate(currentDate.getDate() - 4)),
        completed_date: new Date(currentDate.setDate(currentDate.getDate() - 3)),
      },
      {
        _id: '2',
        title: "Prepare conclusion slides",
        completed: false,
        created_date: currentDate,
      },
    ],
    created_date: new Date(currentDate.setDate(currentDate.getDate() - 4)),
    completed: false,
  },
  {
    _id: "16",
    title: "Clean Out Email Inbox",
    desc: "Delete old emails and organize the inbox.",
    list: MOCK_LISTS[0], // Personal
    expiry_date: currentDate,
    tags: [MOCK_TAGS[2]], // Home
    sub_tasks: [
      {
        _id: '1',
        title: "Delete old spam emails",
        completed: true,
        created_date: new Date(currentDate.setDate(currentDate.getDate() - 5)),
        completed_date: new Date(currentDate.setDate(currentDate.getDate() - 4)),
      },
      {
        _id: '2',
        title: "Organize important emails",
        completed: false,
        created_date: currentDate,
      },
    ],
    created_date: new Date(currentDate.setDate(currentDate.getDate() - 5)),
    completed: false,
  },
  {
    _id: "17",
    title: "Plan Summer Vacation",
    desc: "Start planning the family summer vacation for next year.",
    list: MOCK_LISTS[0], // Personal
    expiry_date: upcomingDate,
    tags: [MOCK_TAGS[1]], // Travel
    sub_tasks: [
      {
        _id: '1',
        title: "Research potential destinations",
        completed: false,
        created_date: currentDate,
      },
      {
        _id: '2',
        title: "Estimate budget for trip",
        completed: false,
        created_date: new Date(currentDate.setDate(currentDate.getDate() + 1)),
      },
    ],
    created_date: currentDate,
    completed: false,
  },
  {
    _id: "18",
    title: "Organize Files",
    desc: "Organize and archive digital files on computer.",
    list: MOCK_LISTS[1], // Work
    expiry_date: upcomingDate,
    tags: [MOCK_TAGS[2]], // Home
    sub_tasks: [
      {
        _id: '1',
        title: "Create folders for project files",
        completed: true,
        created_date: new Date(currentDate.setDate(currentDate.getDate() - 6)),
        completed_date: new Date(currentDate.setDate(currentDate.getDate() - 5)),
      },
      {
        _id: '2',
        title: "Move old files to archive",
        completed: false,
        created_date: currentDate,
      },
    ],
    created_date: new Date(currentDate.setDate(currentDate.getDate() - 6)),
    completed: false,
  },
  {
    _id: "19",
    title: "Prepare Monthly Newsletter",
    desc: "Draft and prepare the newsletter for the end of the month.",
    list: MOCK_LISTS[1], // Work
    expiry_date: upcomingDate,
    tags: [MOCK_TAGS[3]], // Office
    sub_tasks: [
      {
        _id: '1',
        title: "Draft introduction paragraph",
        completed: true,
        created_date: new Date(currentDate.setDate(currentDate.getDate() - 3)),
        completed_date: new Date(currentDate.setDate(currentDate.getDate() - 2)),
      },
      {
        _id: '2',
        title: "Finalize content",
        completed: false,
        created_date: currentDate,
      },
    ],
    created_date: new Date(currentDate.setDate(currentDate.getDate() - 3)),
    completed: false,
  },
  {
    _id: "20",
    title: "Follow Up with Clients",
    desc: "Send follow-up emails to recent clients.",
    list: MOCK_LISTS[1], // Work
    expiry_date: upcomingDate,
    tags: [MOCK_TAGS[0]], // Urgent
    sub_tasks: [
      {
        _id: '1',
        title: "Send follow-up email to client A",
        completed: true,
        created_date: new Date(currentDate.setDate(currentDate.getDate() - 2)),
        completed_date: new Date(currentDate.setDate(currentDate.getDate() - 1)),
      },
      {
        _id: '2',
        title: "Send follow-up email to client B",
        completed: false,
        created_date: currentDate,
      },
    ],
    created_date: new Date(currentDate.setDate(currentDate.getDate() - 2)),
    completed: false,
  }
];
