// import { Dialog, Transition } from "@headlessui/react";
// import { Fragment, useState } from "react";
// import {
//   type_Useful_Todo,
//   type_page_title,
//   type_todo_description,
//   type_todo_highlight,
//   type_user_id,
// } from "../../constants/Types";

// import { PlusCircleIcon } from "@heroicons/react/outline";
// import { fetch_createTodo } from "../../utils/fetchHelpers";

// interface AddTask_Props {
//   page: type_page_title;
//   user: type_user_id;
//   count: number;
//   stateReload: VoidFunction;
//   highlight: type_Useful_Todo;
// }

// export const AddTask = ({
//   page,
//   user,
//   stateReload,
//   count,
//   highlight,
// }: AddTask_Props): JSX.Element => {
//   const [isOpen, setIsOpen] = useState<boolean>(false);
//   const [task, setTask] = useState<type_todo_description>("");
//   const [should_highlight, setShouldHighlight] =
//     useState<type_todo_highlight>(false);

//   const taskCreator = async () => {
//     if (task !== "") {
//       await fetch_createTodo({
//         page_id: page,
//         todo_description: task,
//         user_id: user,
//         todo_highlight: should_highlight,
//         task: "create",
//       });
//       setTask("");
//       setShouldHighlight(false);
//       stateReload();
//     }
//   };

//   return (
//     <div>
//       <div className="flex items-center justify-center">
//         <button
//           type="button"
//           aria-label="Add a task!"
//           title="Add a task!"
//           onClick={() => setIsOpen(true)}
//           className="
//             inline-flex justify-center
//             w-full px-3.5 py-3.5
//             text-sm font-medium
//             rounded-md
//             bg-black bg-opacity-30 filter backdrop-blur-3xl
//             hover:bg-opacity-40 focus:outline-none focus-visible:ring-2
//             focus-visible:ring-white focus-visible:ring-opacity-75
//           "
//         >
//           <PlusCircleIcon className="w-5 h-5 text-theme-blueGray-50" />
//         </button>
//       </div>

//       <Transition appear show={isOpen} as={Fragment}>
//         <Dialog
//           as="div"
//           className="fixed inset-0 z-10 overflow-y-auto"
//           onClose={() => setIsOpen(false)}
//         >
//           <div className="min-h-screen px-4 text-center">
//             <Transition.Child
//               as={Fragment}
//               enter="ease-out duration-300"
//               enterFrom="opacity-0"
//               enterTo="opacity-100"
//               leave="ease-in duration-200"
//               leaveFrom="opacity-100"
//               leaveTo="opacity-0"
//             >
//               <Dialog.Overlay className="fixed inset-0" />
//             </Transition.Child>

//             <span
//               className="inline-block h-screen align-middle"
//               aria-hidden="true"
//             >
//               &#8203;
//             </span>
//             <Transition.Child
//               as={Fragment}
//               enter="ease-out duration-300"
//               enterFrom="opacity-0 scale-95"
//               enterTo="opacity-100 scale-100"
//               leave="ease-in duration-200"
//               leaveFrom="opacity-100 scale-100"
//               leaveTo="opacity-0 scale-95"
//             >
//               <div
//                 className="
//                   inline-block w-full
//                   max-w-md p-6 my-8
//                   overflow-hidden align-middle
//                   transition-all transform
//                   bg-theme-blueGray-800 shadow-lg
//                   border-theme-primary-500
//                   border-2 rounded-lg space-y-5
//                   justify-center items-center flex-col
//                   filter backdrop-blur-3xl bg-opacity-40
//                 "
//               >
//                 {count <= 10 ? (
//                   <>
//                     <Dialog.Title
//                       as="h3"
//                       className="text-2xl font-medium leading-6 text-theme-blueGray-300 selection:bg-theme-primary-500/60"
//                     >
//                       Add a task
//                     </Dialog.Title>
//                     <div className="mt-2">
//                       <input
//                         className="text-xl w-full p-2 selection:bg-theme-primary-500/60"
//                         onKeyDown={(event) => {
//                           if (event.key === "Enter" && task !== "") {
//                             taskCreator();
//                           } else if (event.key === "Escape") {
//                             setIsOpen(false);
//                           }
//                         }}
//                         onChange={({ target }) => setTask(target.value)}
//                         value={task}
//                       />
//                     </div>

//                     {!highlight && (
//                       <span className="flex items-center justify-center space-x-2 text-theme-blueGray-300">
//                         <label htmlFor="should_highlight">
//                           {`Make it a Highlight? `}
//                         </label>

//                         <input
//                           type="checkbox"
//                           id="should_highlight"
//                           defaultChecked={should_highlight}
//                           onClick={() => setShouldHighlight(!should_highlight)}
//                         />
//                       </span>
//                     )}

//                     <div className="mt-4 flex justify-center space-x-6 text-theme-blueGray-300 selection:bg-theme-primary-500/60">
//                       <button
//                         type="button"
//                         aria-label="Close add tasks popup"
//                         className="inline-flex justify-center px-4 py-2 text-sm font-medium bg-theme-primary-500/60 border border-transparent rounded-md hover:bg-theme-primary-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 text-theme-blueGray-50"
//                         onClick={() => {
//                           setIsOpen(false);
//                         }}
//                       >
//                         Cancel
//                       </button>

//                       <button
//                         type="button"
//                         aria-label="Close add tasks popup"
//                         className="inline-flex justify-center px-4 py-2 text-sm font-medium bg-theme-primary-500/60 border border-transparent rounded-md hover:bg-theme-primary-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
//                         onClick={() => {
//                           taskCreator();
//                         }}
//                       >
//                         Submit
//                       </button>
//                     </div>
//                   </>
//                 ) : (
//                   <>
//                     <Dialog.Title
//                       as="h3"
//                       className="text-2xl font-medium leading-6 text-theme-blueGray-300"
//                     >
//                       {`Don't overload yourself! You already have 10 tasks`}
//                     </Dialog.Title>

//                     <div className="mt-4">
//                       <button
//                         type="button"
//                         aria-label="Close add tasks popup"
//                         className="inline-flex justify-center px-4 py-2 text-sm font-medium bg-theme-primary-500/60 border border-transparent rounded-md hover:bg-theme-primary-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
//                         onClick={() => {
//                           setIsOpen(false);
//                         }}
//                       >
//                         Cancel
//                       </button>
//                     </div>
//                   </>
//                 )}
//               </div>
//             </Transition.Child>
//           </div>
//         </Dialog>
//       </Transition>
//     </div>
//   );
// };

// export default AddTask;
export {};
