import { FilterType } from "@/types";

export const AnswerFilters: FilterType[] = [
  { name: "С высокой оценкой", value: "highestUpvotes" },
  { name: "С низкой оценкой", value: "lowestUpvotes" },
  { name: "Новые", value: "recent" },
  { name: "Старые", value: "old" },
];

export const UserFilters: FilterType[] = [
  { name: "Новые", value: "new_users" },
  { name: "Старые", value: "old_users" },
  { name: "Лучшие", value: "top_contributors" },
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
  { name: "Популярные", value: "frequent" },
  { name: "Неотвеченные", value: "unanswered" },
  { name: "Рекомендуемые", value: "recommended" },
];

export const GlobalSearchFilters: FilterType[] = [
  { name: "Вопрос", value: "question" },
  { name: "Ответ", value: "answer" },
  { name: "Пользователь", value: "user" },
  { name: "Тег", value: "tag" },
];

export const JobScheduleTypeFilters: FilterType[] = [
  { name: "Полный рабочий день", value: "FULL" },
  { name: "Сменный график", value: "TURN" },
  { name: "Гибкий график", value: "FLOAT" },
  { name: "Вахтовый метод", value: "WATCH" },
  { name: "Ненормированный рабочий день", value: "IRREGULAR" },
  { name: "Неполный рабочий день", value: "PART_TIME" },
];

export const JobBusyTypeFilters: FilterType[] = [
  { name: "Полная занятость", value: "FULL" },
  { name: "Частичная занятость", value: "PARTIAL" },
  { name: "Временная", value: "PROJECT" },
  { name: "Стажировка", value: "PROBATION" },
  { name: "Сезонная", value: "SEASONAL" },
  { name: "Удалённая", value: "REMOTE" },
];

export const RegionFilters: FilterType[] = [
  {
    name: "г. Москва",
    value: "77",
  },
  {
    name: "Московская область",
    value: "50",
  },
  {
    name: "г. Санкт-Петербург",
    value: "78",
  },
  {
    name: "Ленинградская область",
    value: "47",
  },
  {
    name: "Алтайский край",
    value: "22",
  },
  {
    name: "Амурская область",
    value: "28",
  },
  {
    name: "Архангельская область",
    value: "29",
  },
  {
    name: "Астраханская область",
    value: "30",
  },
  {
    name: "Белгородская область",
    value: "31",
  },
  {
    name: "Брянская область",
    value: "32",
  },
  {
    name: "Владимирская область",
    value: "33",
  },
  {
    name: "Волгоградская область",
    value: "34",
  },
  {
    name: "Вологодская область",
    value: "35",
  },
  {
    name: "Воронежская область",
    value: "36",
  },
  {
    name: "Донецкая Народная Республика",
    value: "80",
  },
  {
    name: "Еврейская автономная область",
    value: "79",
  },
  {
    name: "Забайкальский край",
    value: "75",
  },
  {
    name: "Запорожская область",
    value: "85",
  },
  {
    name: "Ивановская область",
    value: "37",
  },
  {
    name: "Иркутская область",
    value: "38",
  },
  {
    name: "Кабардино-Балкарская Республика",
    value: "07",
  },
  {
    name: "Калининградская область",
    value: "39",
  },
  {
    name: "Калужская область",
    value: "40",
  },
  {
    name: "Камчатский край",
    value: "41",
  },
  {
    name: "Карачаево-Черкесская Республика",
    value: "09",
  },
  {
    name: "Кемеровская область — Кузбасс",
    value: "42",
  },
  {
    name: "Кировская область",
    value: "43",
  },
  {
    name: "Костромская область",
    value: "44",
  },
  {
    name: "Краснодарский край",
    value: "23",
  },
  {
    name: "Красноярский край",
    value: "24",
  },
  {
    name: "Курганская область",
    value: "45",
  },
  {
    name: "Курская область",
    value: "46",
  },
  {
    name: "Липецкая область",
    value: "48",
  },
  {
    name: "Луганская Народная Республика",
    value: "94",
  },
  {
    name: "Магаданская область",
    value: "49",
  },
  {
    name: "Мурманская область",
    value: "51",
  },
  {
    name: "Ненецкий автономный округ",
    value: "83",
  },
  {
    name: "Нижегородская область",
    value: "52",
  },
  {
    name: "Новгородская область",
    value: "53",
  },
  {
    name: "Новосибирская область",
    value: "54",
  },
  {
    name: "Омская область",
    value: "55",
  },
  {
    name: "Оренбургская область",
    value: "56",
  },
  {
    name: "Орловская область",
    value: "57",
  },
  {
    name: "Пензенская область",
    value: "58",
  },
  {
    name: "Пермский край",
    value: "59",
  },
  {
    name: "Приморский край",
    value: "25",
  },
  {
    name: "Псковская область",
    value: "60",
  },
  {
    name: "Республика Адыгея (Адыгея)",
    value: "01",
  },
  {
    name: "Республика Алтай",
    value: "04",
  },
  {
    name: "Республика Башкортостан",
    value: "02",
  },
  {
    name: "Республика Бурятия",
    value: "03",
  },
  {
    name: "Республика Дагестан",
    value: "05",
  },
  {
    name: "Республика Карелия",
    value: "10",
  },
  {
    name: "Республика Коми",
    value: "11",
  },
  {
    name: "Республика Марий Эл",
    value: "12",
  },
  {
    name: "Республика Мордовия",
    value: "13",
  },
  {
    name: "Республика Саха (Якутия)",
    value: "14",
  },
  {
    name: "Республика Татарстан (Татарстан)",
    value: "16",
  },
  {
    name: "Республика Тыва",
    value: "17",
  },
  {
    name: "Республика Хакасия",
    value: "19",
  },
  {
    name: "Республика Ингушетия",
    value: "06",
  },
  {
    name: "Республика Калмыкия",
    value: "08",
  },
  {
    name: "Республика Крым",
    value: "82",
  },
  {
    name: "Республика Северная Осетия — Алания",
    value: "15",
  },
  {
    name: "Ростовская область",
    value: "61",
  },
  {
    name: "Рязанская область",
    value: "62",
  },
  {
    name: "Самарская область",
    value: "63",
  },
  {
    name: "Саратовская область",
    value: "64",
  },
  {
    name: "Сахалинская область",
    value: "65",
  },
  {
    name: "Свердловская область",
    value: "66",
  },
  {
    name: "Севастополь",
    value: "92",
  },
  {
    name: "Смоленская область",
    value: "67",
  },
  {
    name: "Ставропольский край",
    value: "26",
  },
  {
    name: "Тамбовская область",
    value: "68",
  },
  {
    name: "Тверская область",
    value: "69",
  },
  {
    name: "Томская область",
    value: "70",
  },
  {
    name: "Тульская область",
    value: "71",
  },
  {
    name: "Тюменская область",
    value: "72",
  },
  {
    name: "Удмуртская Республика",
    value: "18",
  },
  {
    name: "Ульяновская область",
    value: "73",
  },
  {
    name: "Хабаровский край",
    value: "27",
  },
  {
    name: "Ханты-Мансийский автономный округ — Югра",
    value: "86",
  },
  {
    name: "Херсонская область",
    value: "84",
  },
  {
    name: "Челябинская область",
    value: "74",
  },
  {
    name: "Чеченская Республика",
    value: "20",
  },
  {
    name: "Чувашская Республика —  Чувашия",
    value: "21",
  },
  {
    name: "Чукотский автономный округ",
    value: "87",
  },
  {
    name: "Ямало-Ненецкий автономный округ",
    value: "89",
  },
  {
    name: "Ярославская область",
    value: "76",
  },
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
