import React from "react";
import { useAddonState, useChannel, useStorybookState } from "@storybook/api";
import { AddonPanel } from "@storybook/components";
import { ADDON_ID, EVENTS } from "./constants";
import { PanelContent } from "./components/PanelContent";


interface PanelProps {
  active: boolean;
}

export const Panel: React.FC<PanelProps> = (props) => {
  // https://storybook.js.org/docs/react/addons/addons-api#useaddonstate
  const [results, setState] = useAddonState(ADDON_ID, {
    danger: [],
    warning: [],
  });

  // https://storybook.js.org/docs/react/addons/addons-api#usechannel
  const emit = useChannel({
    [EVENTS.RESULT]: (newResults) => setState(newResults),
  });

  const { storyId } = useStorybookState();
  

  return (
    <AddonPanel {...props}>
      <PanelContent
        results={results}
        runMe={
          (storyId: any) => {
            emit(EVENTS.RUN, storyId);
          }
        }
        fetchData={() => {
          emit(EVENTS.REQUEST);
        }}
        clearData={() => {
          emit(EVENTS.CLEAR);
        }}
      />
    </AddonPanel>
  );
};
