import { createServer, Model } from "miragejs";
import moment from "moment";

import jobs from "./seeds/job";
import users from "./seeds/user";

export const makeServer = ({ environment = "development" } = {}) => {
  const server = createServer({
    routes() {
      // user
      this.post("/api/user/login", (schema, request) => {
        const { email, password } = JSON.parse(request.requestBody);
        const user = schema.db.users.findBy({ email, password });
        return user;
      });

      this.post("/api/user/register", (schema, request) => {
        const payload = JSON.parse(request.requestBody);
        payload.id = Date.now();

        const newUser = schema.db.users.insert(payload);

        return newUser;
      });

      this.get("/api/user/:id", async (schema, request) => {
        const user = await schema.db.users.find(request.params.id);
        return user;
      });

      this.post("/api/user/edit", async (schema, request) => {
        const payload = JSON.parse(request.requestBody);
        const updatedUser = await schema.db.users.update(payload.id, payload);

        return updatedUser;
      });

      // jobs
      this.get("/api/jobs/all", (schema, request) => {
        const { models } = schema.all("job");
        return models;
      });

      this.get("/api/jobs/statusCount", async (schema) => {
        const pendingData = await schema.db.jobs.where({ status: "pending" });
        const scheduledData = await schema.db.jobs.where({
          status: "scheduled",
        });
        const declinedData = await schema.db.jobs.where({ status: "declined" });

        return {
          pendingJobs: pendingData.length,
          scheduledJobs: scheduledData.length,
          declinedJobs: declinedData.length,
        };
      });

      this.post("/api/jobs/add", async (schema, request) => {
        const payload = JSON.parse(request.requestBody);
        payload.id = Date.now();
        payload.jobPostingDate = moment().utc().format();

        const newData = await schema.db.jobs.insert(payload);

        return newData;
      });

      this.post("/api/jobs/edit", async (schema, request) => {
        const payload = JSON.parse(request.requestBody);

        const updatedData = await schema.db.jobs.update(payload.id, payload);

        return updatedData;
      });

      this.get("/api/jobs/get/:jobId", async (schema, request) => {
        const job = await schema.db.jobs.find(request.params.jobId);
        return job;
      });

      this.delete("/api/jobs/delete/:jobId", async (schema, request) => {
        await schema.db.jobs.remove(request.params.jobId);
      });

      this.post("/api/jobs/search", (schema, request) => {
        const payload = JSON.parse(request.requestBody);
        const { searchText, status, type, sort, from_date, to_date } = payload;
        const lowerCaseSearchText = searchText.toLowerCase();

        const jobs = schema.db.jobs.filter((job) => {
          const filterBySearchText = !searchText
            ? true
            : job.position.includes(lowerCaseSearchText) ||
              job.company.includes(lowerCaseSearchText) ||
              job.jobLocation.includes(lowerCaseSearchText);

          const filterByStatus =
            status === "all" ? true : job.status === status;

          const filterByType = type === "all" ? true : job.jobType === type;

          const filterByStartDate = !from_date
            ? true
            : new Date(job.jobPostingDate) >= new Date(from_date);

          const filterByEndDate = !to_date
            ? true
            : new Date(job.jobPostingDate) <= new Date(to_date);

          return (
            filterBySearchText &&
            filterByStatus &&
            filterByType &&
            filterByStartDate &&
            filterByEndDate
          );
        });

        switch (sort) {
          case "latest":
            jobs.sort((a, b) => {
              if (a.jobPostingDate > b.jobPostingDate) return -1;
              if (a.jobPostingDate < b.jobPostingDate) return 1;
              return 0;
            });
            break;

          case "oldest":
            jobs.sort((a, b) => {
              if (a.jobPostingDate < b.jobPostingDate) return -1;
              if (a.jobPostingDate > b.jobPostingDate) return 1;
              return 0;
            });
            break;

          case "a-z":
            jobs.sort((a, b) => {
              if (a.position < b.position) return -1;
              if (a.position > b.position) return 1;
              return 0;
            });
            break;

          case "z-a":
            jobs.sort((a, b) => {
              if (a.position > b.position) return -1;
              if (a.position < b.position) return 1;
              return 0;
            });
            break;
        }

        return jobs;
      });
    },
    models: {
      job: Model,
      user: Model,
    },
    environment,
    seeds(server) {
      server.db.loadData({
        users,
        jobs,
      });
    },
  });

  return server;
};
