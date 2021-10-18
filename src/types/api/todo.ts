import { type_page_id, type_todo_id } from "../../constants/Types";

export interface type_todo_query {
  todo_id?: type_todo_id;
  old_page_id?: type_page_id;
  new_page_id?: type_page_id;
}
