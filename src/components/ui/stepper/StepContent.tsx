import { FC } from "react";
import { useStepContext } from "./Step";

type IStepContent = {};

const StepContent: FC<IStepContent> = () => {
  const { step } = useStepContext();

  const Component = step?.component;

  return (
    <div className="shadow sm:rounded-md sm:overflow-hidden">
      {Component && <Component />}
    </div>
  );
};

export default StepContent;
