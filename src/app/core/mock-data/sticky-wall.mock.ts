import { IStickyWall } from '../interfaces/sticky-wall.interface';

export const MOCK_STICKY_WALLS: IStickyWall[] = [
  {
    title: 'Project Deadline',
    desc: 'Finalize the project deliverables and submit by the end of the month.',
    expiry_date: new Date('2024-07-31'),
    created_date: new Date('2024-06-15'),
    completed: false,
  },
  {
    title: 'Team Meeting',
    desc: 'Prepare slides for the team review meeting scheduled for next week.',
    expiry_date: new Date('2024-07-10'),
    created_date: new Date('2024-06-20'),
    completed: false,
  },
  {
    title: 'Grocery Shopping',
    desc: 'Buy essentials: fruits, vegetables, and snacks for the week.',
    created_date: new Date('2024-06-25'),
    completed: true,
    completed_date: new Date('2024-06-25'),
  },
  {
    title: 'Call with Client',
    desc: 'Discuss the proposal and clarify all client requirements.',
    expiry_date: new Date('2024-07-05'),
    created_date: new Date('2024-06-22'),
    completed: false,
  },
  {
    title: 'Book Reading',
    desc: 'Finish reading "Atomic Habits" and summarize the key takeaways.',
    created_date: new Date('2024-06-10'),
    completed: true,
    completed_date: new Date('2024-06-18'),
  },
  {
    title: 'Health Checkup',
    desc: 'Annual medical checkup scheduled at the clinic.',
    expiry_date: new Date('2024-07-15'),
    created_date: new Date('2024-06-27'),
    completed: false,
  },
  {
    title: 'Code Refactoring',
    desc: 'Refactor old code and improve overall application performance.',
    created_date: new Date('2024-06-12'),
    completed: false,
  },
  {
    title: 'Workout Routine',
    desc: 'Follow the new workout plan for the next 30 days.',
    created_date: new Date('2024-06-05'),
    expiry_date: new Date('2024-07-05'),
    completed: true,
    completed_date: new Date('2024-07-04'),
  },
  {
    title: 'Vacation Planning',
    desc: 'Plan the itinerary and book hotels for the upcoming vacation.',
    created_date: new Date('2024-06-23'),
    completed: false,
  },
  {
    title: 'Presentation Prep',
    desc: 'Prepare the presentation slides for the Q2 performance review.',
    expiry_date: new Date('2024-07-12'),
    created_date: new Date('2024-06-29'),
    completed: false,
  },
];
