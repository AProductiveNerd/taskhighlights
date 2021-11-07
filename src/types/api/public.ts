import {
  type_page_title,
  type_user_id,
  type_user_username,
} from "../../constants/Types";

export interface type_public_query {
  page_title?: type_page_title;
  page_user_id?: type_user_id;
  user_username?: type_user_username;
  today?: type_page_title;
}
