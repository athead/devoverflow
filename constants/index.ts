import { SidebarLink, ThemeType } from "@/types";
import { PATHS } from "./paths";

export const themes: ThemeType[] = [
  { value: "light", label: "Светлая", icon: "/assets/icons/sun.svg" },
  { value: "dark", label: "Темная", icon: "/assets/icons/moon.svg" },
  // { value: "system", label: "Системная", icon: "/assets/icons/computer.svg" },
];

export const sidebarLinks: SidebarLink[] = [
  {
    imgURL: "/assets/icons/home.svg",
    route: PATHS.HOME,
    label: "Главная",
  },
  {
    imgURL: "/assets/icons/users.svg",
    route: PATHS.COMMUNITY,
    label: "Сообщество",
  },
  {
    imgURL: "/assets/icons/star.svg",
    route: PATHS.COLLECTION,
    label: "Избранное",
  },
  {
    imgURL: "/assets/icons/suitcase.svg",
    route: PATHS.JOBS,
    label: "Работа",
  },
  {
    imgURL: "/assets/icons/tag.svg",
    route: PATHS.TAGS,
    label: "Теги",
  },
  {
    imgURL: "/assets/icons/user.svg",
    route: PATHS.PROFILE,
    label: "Профиль",
  },
  {
    imgURL: "/assets/icons/question.svg",
    route: PATHS.ASK_QUESTION,
    label: "Задать вопрос",
  },
];

export const BADGE_CRITERIA = {
  QUESTION_COUNT: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  ANSWER_COUNT: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  QUESTION_UPVOTES: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  ANSWER_UPVOTES: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  TOTAL_VIEWS: {
    BRONZE: 1000,
    SILVER: 10000,
    GOLD: 100000,
  },
};
