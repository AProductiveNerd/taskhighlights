import { Card_Props } from "../../types/layout/Card";

export const Card = ({
  title,
  action_component,
  spaced_elements,
  buttons,
}: Card_Props): JSX.Element => {
  return (
    <div
      className="
      noScrollbar relative mx-auto max-h-[80vh] w-11/12
      space-y-5 overflow-x-hidden overflow-y-scroll rounded-lg
      bg-theme-blueGray-800 bg-opacity-40 py-5 px-[1.6rem]
      shadow-lg filter
      backdrop-blur-3xl sm:max-w-md md:max-w-lg
    "
      id="Card"
    >
      <div className="flex items-center justify-between" id="CardHeader">
        <p className="text-4xl" id="CardTitle">
          {title}
        </p>

        {action_component && (
          <span id="ActionComponent">{action_component}</span>
        )}
      </div>

      <hr className="border-dashed" id="CardDash" />
      <div className="space-y-1" id="ItemList">
        {spaced_elements}
      </div>

      {buttons && (
        <div className="flex justify-between" id="BottomButtons">
          {buttons}
        </div>
      )}
    </div>
  );
};
