import { FC, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

import { Type } from "../components/ui/toast/Toast";
import Loader from "../components/ui/loader/Loader";

import { useToast } from "../context/ToastProvider";
import Private from "../components/layout/Private";
import JobForm from "../components/JobForm";
import { withLayout } from "../components/layout/utils";
import { jobStatusOptions, jobTypeOptions } from "../utils/selectOptions";

type defaultValues = {
  id?: string;
  position?: string;
  company?: string;
  jobLocation?: string;
  status: number;
  jobType: number;
};

const Edit_Job: FC = () => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [defaultValues, setDefaultValues] = useState<defaultValues>({
    status: 1,
    jobType: 1,
  });
  const { jobId } = useParams();
  const history = useHistory();
  const toast = useToast();

  const getTheJob = async () => {
    const { data } = await axios.get(`/api/jobs/get/${jobId}`);

    data.status = jobStatusOptions.find(
      (item) => item.name === data.status
    )!.id;
    data.jobType = jobTypeOptions.find(
      (item) => item.name === data.jobType
    )!.id;

    setDefaultValues(data);
    setLoaded(true);
  };

  useEffect(() => {
    getTheJob();
  }, []);

  const onSubmitHandler = async (data: any) => {
    try {
      data.status = jobStatusOptions.find(
        (item) => item.id === data.status
      )!.name;
      data.jobType = jobTypeOptions.find(
        (item) => item.id === data.jobType
      )!.name;

      const response = await axios.post("/api/jobs/edit", data);
      toast.show({ type: Type.success, message: "Job is edited successfully" });
      history.push("/all-jobs");
    } catch (error: any) {
      toast.show({ type: Type.error, message: error.message });
    }
  };

  if (!loaded)
    return (
      <div className="mt-20">
        <Loader />;
      </div>
    );

  return (
    <JobForm
      onSubmitHandler={onSubmitHandler}
      defaultValues={defaultValues}
      formType="Edit Job"
    />
  );
};

export default withLayout(Edit_Job, Private);
