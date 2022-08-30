import { FC } from 'react'

export enum StepStatus {
  Complete = 1,
  Current,
  Upcoming,
}
export type IStep = { name: string; description?: string; status: StepStatus; component: FC }
export type IUseStepper = { steps: IStep[]; stepIndex: number; setStepIndex?: (stepIndex: number) => void }
