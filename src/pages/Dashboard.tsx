import { FC, useEffect, useState } from "react";
import axios from "axios";

import Container from "../components/ui/container/Container";
import Loader from "../components/ui/loader/Loader";
import Card from "../components/Card";

import Private from "../components/layout/Private";
import { withLayout } from "../components/layout/utils";

const Dashboard: FC = () => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [pendingJobs, setPendingJobs] = useState<number>(0);
  const [scheduledJobs, setScheduledJobs] = useState<number>(0);
  const [declinedJobs, setDeclinedJobs] = useState<number>(0);

  useEffect(() => {
    const loadData = async () => {
      try {
        const { data } = await axios.get("api/jobs/statusCount");

        const { pendingJobs, scheduledJobs, declinedJobs } = data;

        setPendingJobs(pendingJobs);
        setScheduledJobs(scheduledJobs);
        setDeclinedJobs(declinedJobs);
      } catch (error) {
        console.error(error);
      } finally {
        setLoaded(true);
      }
    };

    loadData();
  }, []);

  if (!loaded)
    return (
      <div className="mt-24" data-testid="dashboard-loading-element">
        <Loader message="Loading data" />
      </div>
    );

  return (
    <div className="flex gap-4" data-testid="dashboard-element">
      <Card theme="pending" totalJobs={pendingJobs} />
      <Card theme="brand" totalJobs={scheduledJobs} />
      <Card theme="declined" totalJobs={declinedJobs} />
    </div>
  );
};

export default withLayout(Dashboard, Private);
