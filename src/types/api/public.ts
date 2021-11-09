import {
  type_page_is_public,
  type_page_public_link,
} from "../../constants/Types";

export interface type_public_query {
  page_public_link?: type_page_public_link;
  page_is_public?: type_page_is_public;
}
