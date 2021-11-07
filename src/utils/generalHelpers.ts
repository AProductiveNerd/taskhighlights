import { date_time_EN_GB } from "../constants/Regexes";
import { type_page_title } from "../constants/Types";

export const isDailyPage = (page_title: type_page_title): boolean => {
  return date_time_EN_GB.test(page_title);
};

// Custom user code runner. Like roam/js
export const attach_user_js = (
  code_string: string,
  isAsync: boolean | false,
  code_id: string
) => {
  const prev_code = document.getElementById(code_id);

  if (!prev_code) {
    const user_code = document.createElement("script");

    user_code.textContent = code_string;
    user_code.async = isAsync;
    user_code.id = code_id;
    user_code.type = "text/javascript";

    document.getElementsByTagName("head")[0].appendChild(user_code);
  }
};

export const make_json_string = (data: any): string => {
  return JSON.stringify(data);
};

export const are_args_same = (...args: any[]) => {
  let works = true;

  for (let i = 0; i < args.length; i++) {
    const base = args[i];
    for (let j = i; j < args.length; j++) {
      const curr = args[j];
      if (make_json_string(base) !== make_json_string(curr)) {
        works = false;
      }
    }
  }

  return works;
};
