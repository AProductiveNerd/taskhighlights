import { page_id, page_title, user_id } from "../../constants/Types";

export interface type_page_query {
  page_id?: page_id;
  page_title?: page_title;
  page_user_id?: user_id;
  today?: page_title;
}
