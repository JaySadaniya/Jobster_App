import React, {
  createContext,
  FC,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { IStep } from "./types";

export type IStepContext = {
  steps: IStep[];
  step: IStep | undefined;
  stepIndex: number;
  formData: any;
  setSteps: React.Dispatch<React.SetStateAction<IStep[]>>;
  setStepIndex: (stepIndex: number) => void;
  setFormData: (data: any) => void;
};
export type IStepProvider = {
  stepList: IStep[];
  defaultStep: number;
  data: any;
  children: ReactNode;
};

export const Step = createContext<IStepContext>({
  steps: [],
  step: undefined,
  stepIndex: 0,
  formData: null,
  setSteps: () => {},
  setStepIndex: () => {},
  setFormData: () => {},
});

export const StepProvider: FC<IStepProvider> = ({
  stepList,
  defaultStep,
  data,
  children,
}) => {
  const [step, setStep] = useState<IStep>();
  const [steps, setSteps] = useState<IStep[]>(stepList);
  const [stepIndex, setStepIndex] = useState<number>(defaultStep);
  const [formData, setFormData] = useState(data);

  useEffect(() => setStep(steps[stepIndex]), [steps, stepIndex]);

  return (
    <Step.Provider
      value={{
        steps,
        setSteps,
        step,
        stepIndex,
        setStepIndex,
        formData,
        setFormData,
      }}
    >
      <>{children}</>
    </Step.Provider>
  );
};

export const useStepContext = () => useContext(Step);
