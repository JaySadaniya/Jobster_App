import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useState, useEffect, FC } from "react";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";

import Input from "../components/ui/input/Input";
import Loader from "../components/ui/loader/Loader";
import Button from "../components/ui/button/Button";
import SelectControl from "../components/ui/form/Select";
import DatePickerControl from "../components/ui/form/DatePicker";

import { searchSchema } from "../schema/validation/search";
import { IJob } from "../types/models/IJob";
import Private from "../components/layout/Private";
import { withLayout } from "../components/layout/utils";
import JobDetail from "../components/JobDetail";
import {
  statusOptions,
  sortOptions,
  typeOptions,
} from "../utils/selectOptions";

type SearchSchema = {
  searchText?: string;
  status?: number;
  type?: number;
  sort?: number;
  from_date?: Date;
  to_date?: Date;
};

const All_Jobs: FC = () => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [jobs, setJobs] = useState<IJob[]>([]);

  const defaultValues = { status: 1, type: 1, sort: 1, searchText: "" };

  const {
    reset,
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<SearchSchema>({
    resolver: yupResolver(searchSchema),
    defaultValues,
  });

  // const getAllJobs = async () => {
  //   const { data } = await axios.get("/api/jobs/all");

  //   setJobs(data);
  // };

  const searchHandler = async (data: any) => {
    setLoaded(false);

    data.status = statusOptions.find((item) => item.id === data.status)!.name;
    data.type = typeOptions.find((item) => item.id === data.type)!.name;
    data.sort = sortOptions.find((item) => item.id === data.sort)!.name;

    const response = await axios.post("/api/jobs/search", data);

    setJobs(response.data);
    setLoaded(true);
  };

  const clearFiltersHandler = () => {
    reset(defaultValues);
    searchHandler(defaultValues);
  };

  useEffect(() => {
    searchHandler(defaultValues);
    // getAllJobs();
    // setLoaded(true);
  }, []);

  return (
    <div>
      <div className="p-10 bg-white m-5 rounded shadow-lg hover:shadow-2xl shadow-secondary-300">
        <span className="flex justify-between items-start mb-5">
          <h1 className="text-3xl">Search Job</h1>
          <Link to="/add-job">
            <button className="bg-brand-500 text-white rounded h-[38px] hover:bg-brand-700 self-end px-5">
              Add a new job
            </button>
          </Link>
        </span>
        <form
          onSubmit={handleSubmit(searchHandler)}
          className="grid grid-cols-3 gap-8"
        >
          <span>
            <Input
              type="text"
              label="Search"
              placeholder="Search text here.."
              {...register("searchText")}
              error={errors.searchText?.message}
              appendClass={" bg-brand-50"}
            />
          </span>

          <SelectControl
            options={statusOptions}
            label="Status"
            control={control}
            name="status"
          />

          <SelectControl
            options={typeOptions}
            label="Type"
            control={control}
            name="type"
          />

          <SelectControl
            options={sortOptions}
            label="Sort"
            control={control}
            name="sort"
          />

          <span>
            <h1 className="block text-sm font-medium text-gray-700 mb-3">
              From Date
            </h1>

            <DatePickerControl
              name="from_date"
              label=""
              control={control}
              dropdownMode="select"
              dateFormat="dd/MM/yyyy"
              placeholderText="Select Date"
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-secondary-300 placeholder-secondary-500 text-secondary-900 focus:outline-none focus:ring-brand-500 focus:border-brand-500 focus:z-10 sm:text-sm bg-brand-50"
            />
          </span>

          <span>
            <h1 className="block text-sm font-medium text-gray-700 mb-3">
              To Date
            </h1>

            <DatePickerControl
              name="to_date"
              label=""
              control={control}
              // minDate={}
              dropdownMode="select"
              dateFormat="dd/MM/yyyy"
              placeholderText="Select Date"
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-secondary-300 placeholder-secondary-500 text-secondary-900 focus:outline-none focus:ring-brand-500 focus:border-brand-500 focus:z-10 sm:text-sm bg-brand-50"
            />
          </span>

          <span className="col-start-3 grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={clearFiltersHandler}
              className="bg-red-200 text-red-700 rounded h-[38px] hover:bg-red-700 hover:text-white self-end grow"
            >
              Clear Filters
            </button>

            <button
              type="submit"
              className="bg-brand-500 text-white rounded h-[38px] hover:bg-brand-700 self-end grow"
            >
              Search
            </button>
          </span>
        </form>
      </div>

      {!loaded ? (
        <div className="mt-24">
          <Loader message="Loading data" />
        </div>
      ) : (
        <>
          <div className="mx-5 mt-14 mb-5 text-2xl font-semibold">
            {jobs.length} Jobs found
          </div>

          <div className="mx-5 grid grid-cols-2 gap-4">
            {jobs.map((job, index) => (
              <JobDetail {...job} key={index} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default withLayout(All_Jobs, Private);
