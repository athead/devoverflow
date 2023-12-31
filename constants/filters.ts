import { FilterType } from "@/types";

export const AnswerFilters: FilterType[] = [
  { name: "С высокой оценкой", value: "highestUpvotes" },
  { name: "С низкой оценкой", value: "lowestUpvotes" },
  { name: "Новые", value: "recent" },
  { name: "Старые", value: "old" },
];

export const UserFilters: FilterType[] = [
  { name: "Новые участники", value: "new_users" },
  { name: "Старые участники", value: "old_users" },
  { name: "Лучшие пользователи", value: "top_contributors" },
];

export const QuestionFilters: FilterType[] = [
  { name: "Самые новые", value: "most_recent" },
  { name: "Старые", value: "oldest" },
  { name: "По голосам", value: "most_voted" },
  { name: "По просмотрам", value: "most_viewed" },
  { name: "По ответам", value: "most_answered" },
];

export const TagFilters: FilterType[] = [
  { name: "Популярные", value: "popular" },
  { name: "Новые", value: "recent" },
  { name: "По имени", value: "name" },
  { name: "Старые", value: "old" },
];

export const HomePageFilters: FilterType[] = [
  { name: "Новые", value: "newest" },
  { name: "Рекомендуемые", value: "recommended" },
  { name: "Популярные", value: "frequent" },
  { name: "Неотвеченные", value: "unanswered" },
];

export const GlobalSearchFilters: FilterType[] = [
  { name: "Вопрос", value: "question" },
  { name: "Ответ", value: "answer" },
  { name: "Пользователь", value: "user" },
  { name: "Тег", value: "tag" },
];

export const JobPageFilters: FilterType[] = [
  { name: "Полный день", value: "fulltime" },
  { name: "Подработка", value: "parttime" },
  { name: "Подрядчик", value: "contractor" },
  { name: "Стажировка", value: "intern" },
];

// export const AnswerFilters = [
//     { name: "Highest Upvotes", value: "highestUpvotes" },
//     { name: "Lowest Upvotes", value: "lowestUpvotes" },
//     { name: "Most Recent", value: "recent" },
//     { name: "Oldest", value: "old" },
//   ];

//   export const UserFilters = [
//     { name: "New Users", value: "new_users" },
//     { name: "Old Users", value: "old_users" },
//     { name: "Top Contributors", value: "top_contributors" },
//   ];

//   export const QuestionFilters = [
//     { name: "Most Recent", value: "most_recent" },
//     { name: "Oldest", value: "oldest" },
//     { name: "Most Voted", value: "most_voted" },
//     { name: "Most Viewed", value: "most_viewed" },
//     { name: "Most Answered", value: "most_answered" },
//   ];

//   export const TagFilters = [
//     { name: "Popular", value: "popular" },
//     { name: "Recent", value: "recent" },
//     { name: "Name", value: "name" },
//     { name: "Old", value: "old" },
//   ];

//   export const HomePageFilters = [
//     { name: "Newest", value: "newest" },
//     { name: "Recommended", value: "recommended" },
//     { name: "Frequent", value: "frequent" },
//     { name: "Unanswered", value: "unanswered" },
//   ];

//   export const GlobalSearchFilters = [
//     { name: "Question", value: "question" },
//     { name: "Answer", value: "answer" },
//     { name: "User", value: "user" },
//     { name: "Tag", value: "tag" },
//   ];
