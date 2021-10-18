import {
  type_page_id,
  type_page_title,
  type_user_id,
} from "../../constants/Types";

export interface type_page_query {
  page_id?: type_page_id;
  page_title?: type_page_title;
  page_user_id?: type_user_id;
  today?: type_page_title;
}
