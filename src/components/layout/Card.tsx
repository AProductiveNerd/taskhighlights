interface Card_Props {
  title: string;
  action_component: JSX.Element;
  spaced_elements: JSX.Element;
  buttons?: JSX.Element;
}

export const Card = ({
  title,
  action_component,
  spaced_elements,
  buttons
}: Card_Props): JSX.Element => {
  return (
    <div
      className="
      noScrollbar relative space-y-5 max-h-[80vh] w-11/12
      sm:max-w-md md:max-w-lg py-5 px-[1.6rem]
      bg-theme-blueGray-800 shadow-lg rounded-lg mx-auto
      overflow-y-scroll overflow-x-hidden
      filter backdrop-blur-3xl bg-opacity-40
    "
    >
      <div className="flex justify-between items-center">
        <p className="text-4xl">{title}</p>

        {action_component}
      </div>

      <hr className="border-dashed" />

      <div className="space-y-1">{spaced_elements}</div>

      <div className="flex justify-between">{buttons}</div>
    </div>
  );
};
