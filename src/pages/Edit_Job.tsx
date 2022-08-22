import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

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

  const getTheJob = async () => {
    const { data } = await axios.get(`/api/jobs/get/${jobId}`);

    data.status = jobStatusOptions.find(
      (item) => item.name === data.status
    )!.id;
    data.jobType = jobTypeOptions.find(
      (item) => item.name === data.jobType
    )!.id;

    setDefaultValues(data);
  };

  useEffect(() => {
    getTheJob();
    setLoaded(true);
  }, []);

  const onSubmitHandler = async (data: any) => {};

  if (!loaded) return <>Loading...</>;

  return (
    <JobForm
      onSubmitHandler={onSubmitHandler}
      defaultValues={defaultValues}
      formType="Edit Job"
    />
  );
};

export default withLayout(Edit_Job, Private);
