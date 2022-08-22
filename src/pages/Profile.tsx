import { FC, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";

import Input from "../components/ui/input/Input";
import Loader from "../components/ui/loader/Loader";

import Private from "../components/layout/Private";
import { withLayout } from "../components/layout/utils";
import { userSchema } from "../schema/validation/user";
import { useAuthContext } from "../context/AuthProvider";

type ProfileSchema = {
  email: string;
  userName: string;
  location: string;
};

const Profile: FC = () => {
  const { user, loadUserData, loaded } = useAuthContext();
  const history = useHistory();

  const {
    reset,
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileSchema>({
    resolver: yupResolver(userSchema),
    defaultValues: user,
  });

  useEffect(() => {
    reset(user);
  }, [user]);

  const onSubmitHandler = async (data: any) => {
    const updatedUser = await axios.post("/api/user/edit", data);
    loadUserData();
  };

  return (
    <div className="p-10 bg-white m-5 rounded shadow-lg hover:shadow-2xl shadow-secondary-300">
      <h1 className="text-3xl mb-5">Profile</h1>

      {loaded ? (
        <form
          onSubmit={handleSubmit(onSubmitHandler)}
          className="grid grid-cols-3 gap-8"
        >
          <span>
            <Input
              type="text"
              label="Email"
              placeholder="Email"
              disabled
              {...register("email")}
              error={errors.email?.message}
              appendClass={"cursor-not-allowed"}
            />
          </span>

          <span>
            <Input
              type="text"
              label="User Name"
              placeholder="User Name"
              {...register("userName")}
              error={errors.userName?.message}
              appendClass={" bg-brand-50"}
            />
          </span>

          <span>
            <Input
              type="text"
              label="Location"
              placeholder="Location"
              {...register("location")}
              error={errors.location?.message}
              appendClass={" bg-brand-50"}
            />
          </span>

          <span className="col-start-3 grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => history.push("/all-jobs")}
              className="bg-red-200 text-red-700 rounded h-[38px] hover:bg-red-500 hover:text-white self-end grow"
            >
              Cancel
            </button>

            <button
              type="submit"
              className={`bg-brand-500 text-white rounded h-[38px] hover:bg-brand-700 self-end grow ${
                isSubmitting && "cursor-not-allowed"
              }`}
            >
              {isSubmitting ? "Submitting" : "Submit"}
            </button>
          </span>
        </form>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default withLayout(Profile, Private);
