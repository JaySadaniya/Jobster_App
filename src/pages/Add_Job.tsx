import { FC } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import { Type } from "../components/ui/toast/Toast";

import Private from "../components/layout/Private";
import JobForm from "../components/JobForm";
import { withLayout } from "../components/layout/utils";
import { useToast } from "../context/ToastProvider";
import { jobStatusOptions, jobTypeOptions } from "../utils/selectOptions";

const Add_Job: FC = () => {
  const toast = useToast();
  const history = useHistory();
  const defaultValues = { status: 1, jobType: 1 };

  const onSubmitHandler = async (data: any) => {
    try {
      data.status = jobStatusOptions.find((item) => item.id === data.status)!.name;
      data.jobType = jobTypeOptions.find((item) => item.id === data.jobType)!.name;

      await axios.post("/api/jobs/add", data);
      toast.show({ type: Type.success, message: "Job is added successfully" });
      history.push("/all-jobs");
    } catch (error: any) {
      toast.show({ type: Type.error, message: error.message });
    }
  };

  return <JobForm onSubmitHandler={onSubmitHandler} defaultValues={defaultValues} formType="Add Job" />;
};

export default withLayout(Add_Job, Private);
