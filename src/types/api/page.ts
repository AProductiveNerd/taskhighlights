import {
  type_page_id,
  type_page_title,
  type_user_id,
} from "../../constants/Types";

import { type_page_public_link } from "./../../constants/Types";

export interface type_page_query {
  page_id?: type_page_id;
  page_public_link?: type_page_public_link;
  page_title?: type_page_title;
  page_user_id?: type_user_id;
  today?: type_page_title;
}
