import { BADGE_CRITERIA } from "@/constants";

export interface FilterType {
  name: string;
  value: string;
}

export interface ThemeType {
  value: string;
  label: string;
  icon: string;
}

export interface SidebarLink {
  imgURL: string;
  route: string;
  label: string;
}

export interface Country {
  name: {
    common: string;
  };
}

export interface ParamsProps {
  params: { id: string };
}

export interface SearchParamsProps {
  searchParams: { [key: string]: string | undefined };
}

export interface URLProps {
  params: { id: string };
  searchParams: { [key: string]: string | undefined };
}

export interface BadgeCounts {
  GOLD: number;
  SILVER: number;
  BRONZE: number;
}

export type BadgeCriteriaType = keyof typeof BADGE_CRITERIA;
