import { FC } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import Input from "../components/ui/input/Input";
import SelectControl from "../components/ui/form/Select";

import { jobSchema } from "../schema/validation/job";
import { jobStatusOptions, jobTypeOptions } from "../utils/selectOptions";

type JobSchema = {
  position: string;
  company: string;
  jobLocation: string;
  status: number;
  jobType: number;
};

type defaultValues = {
  position?: string;
  company?: string;
  jobLocation?: string;
  status: number;
  jobType: number;
};

type jobFormSchema = {
  formType: string;
  onSubmitHandler: (data: any) => Promise<void>;
  defaultValues: defaultValues;
};

const JobForm: FC<jobFormSchema> = ({
  formType,
  defaultValues,
  onSubmitHandler,
}) => {
  // const defaultV = useMemo(() => {}, [defaultValues]);
  const {
    reset,
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<JobSchema>({
    resolver: yupResolver(jobSchema),
    defaultValues,
  });

  console.log("Default Value: ", defaultValues);

  return (
    <div className="p-10 bg-white m-5 rounded shadow-lg hover:shadow-2xl shadow-secondary-300">
      <h1 className="text-3xl mb-5">{formType}</h1>

      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className="grid grid-cols-3 gap-8"
      >
        <span>
          <Input
            type="text"
            label="Position"
            placeholder="Enter Job Position"
            {...register("position")}
            error={errors.position?.message}
            appendClass={" bg-brand-50"}
          />
        </span>

        <span>
          <Input
            type="text"
            label="Company"
            placeholder="Company Name"
            {...register("company")}
            error={errors.company?.message}
            appendClass={" bg-brand-50"}
          />
        </span>

        <span>
          <Input
            type="text"
            label="Job Location"
            placeholder="Job Location"
            {...register("jobLocation")}
            error={errors.jobLocation?.message}
            appendClass={" bg-brand-50"}
          />
        </span>

        <SelectControl
          options={jobStatusOptions}
          label="Status"
          control={control}
          name="status"
        />

        <SelectControl
          options={jobTypeOptions}
          label="Job Type"
          control={control}
          name="jobType"
        />

        <span className=" grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => reset(defaultValues)}
            className="bg-red-200 text-red-700 rounded h-[38px] hover:bg-red-700 hover:text-white self-end grow"
          >
            Clear
          </button>

          <button
            type="submit"
            className="bg-brand-500 text-white rounded h-[38px] hover:bg-brand-700 self-end grow"
          >
            Submit
          </button>
        </span>
      </form>
    </div>
  );
};

export default JobForm;
