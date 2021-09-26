import { date_time_EN_GB } from "../constants/Regexes";
import { page_title } from "../constants/Types";

export const isDailyPage = (page_title: page_title): boolean => {
  return date_time_EN_GB.test(page_title);
};
