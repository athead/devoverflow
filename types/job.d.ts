// export interface VacancyRegion {
//   region_code: string;
//   name: string;
// }

// export interface VacancyCompany {
//   companycode: "1023500896869";
//   "hr-agency": false;
//   inn: "3525066529";
//   kpp: "352501001";
//   name: 'АО "Вологдазернопродукт"';
//   ogrn: "1023500896869";
//   phone: "+7(911) 500-00-29";
//   url: "https://trudvsem.ru/company/1023500896869";
// }

export interface VacancyContact {
  "E-mail": string;
  Другое: string;
  Телефон: string;
}

// export interface VacancyAddress {
//   location: string;
//   lng: string;
//   lat: string;
// }

// export interface VacancyRequirement {
//   education: string;
//   qualification?: string;
//   experience: number;
// }

// export interface VacancyCategory {
//   specialisation: string;
// }

// export interface Vacancy {
//   id: string;
//   source: string;
//   region: VacancyRegion;
//   company: VacancyCompany;
//   "creation-date": string;
//   salary: string;
//   salary_min: number;
//   salary_max: number;
//   "job-name": string;
//   vac_url: string;
//   employment: string;
//   schedule: string;
//   duty: string;
//   category: VacancyCategory;
//   requirement: VacancyRequirement;
//   addresses: {
//     address: VacancyAddress[];
//   };
//   social_protected: string;
//   contact_list: VacancyContact[];
//   contact_person: string;
//   work_places: number;
//   code_profession: string;
//   currency: string;
// }

export interface VacancyCompany {
  legalForm: string;
  email: string;
  dateCreate: number;
  fullAddress: string;
  name: string;
  smallIconId: string;
  industry: string;
  emailHidden: boolean;
  inn: string;
  ogrn: string;
}

export interface VacancyIRData {
  ogrn: string;
  inn: string;
  kpp: string;
  companyName: string;
  companySite: string;
  vacancyExternalLink: string;
}
export interface Vacancy {
  id: string;
  companyId: string;
  vacancyName: string;
  accommodationCapability: string;
  accommodationType: string;
  additionalRequirements: string;
  benefits: object[];
  busyType: string;
  contactPerson: string;
  contacts: VacancyContact;
  fullCompanyName: string;
  hardSkills: object;
  softSkills: string[];
  isMobilityProgram: boolean;
  languageKnowledge: object;
  metro: string[];
  positionResponsibilities: string;
  positionRequirements: string;
  profession: string;
  publishedDate: number; // timestamp
  requiredDriveLicense: string[];
  requiredExperience: number;
  retrainingCapability: string;
  salaryMin: number;
  salaryMax: number;
  scheduleType: string;
  socialProtected: string[];
  sourceType: string;
  stateRegion: string;
  stateRegionCode: string;
  transportCompensationType: string;
  fullAddress: string;
  vacancyAddressLatitude: number;
  vacancyAddressLongitude: number;
  workPlaces: number;
  companyDTO: VacancyCompany;
  badFactors: string[];
  videoInterviewingMandatory: boolean;
  contactsFromCZN: boolean;
  originalVacancySource: string;
  isMilitaryReprieve: boolean;
  irdata?: VacancyIRData;
}
// export interface JobApi {
//   status: string;
//   request: {
//     api: string;
//   };
//   meta: { total: number; limit: number };
//   results: {
//     vacancies: [{ vacancy: Vacancy }];
//   };
// }
