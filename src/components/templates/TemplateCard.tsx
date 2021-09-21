import { useContext, useEffect, useState } from "react";

import { Card } from "../layout/Card";
import { CreateTemplate } from "./CreateTemplate";
import FireUserContext from "../../contexts/FireUserContext";
import { IndividualTemplateItem } from "./IndividualTemplateItem";
import { Template } from "@prisma/client";
import { fetch_getAllUserTemplates } from "../../utils/fetchHelpers";

export const TemplateCard = (): JSX.Element => {
  const fireId = useContext(FireUserContext);
  const [templates, setTemplates] = useState<Template[]>(null);
  const [addedCounter, setAddedCounter] = useState<number>(0);

  useEffect(() => {
    (async () => {
      const fetched_templates: Template[] = await fetch_getAllUserTemplates(
        fireId
      );

      if (JSON.stringify(fetched_templates) !== JSON.stringify(templates)) {
        setTemplates(fetched_templates);
      }
    })();
  }, [templates, addedCounter, fireId]);

  const stateReload = (): void => {
    if (addedCounter < 50) {
      setAddedCounter(addedCounter + 1);
    } else {
      setAddedCounter(0);
    }
  };

  return (
    <Card
      action_component={
        <CreateTemplate stateReload={stateReload} user_id={fireId} />
      }
      spaced_elements={
        <>
          {templates?.map((routine) => (
            <IndividualTemplateItem
              routine={routine}
              key={routine.template_id}
              stateReload={stateReload}
            />
          ))}
        </>
      }
      title="Templates"
    />
  );
};
