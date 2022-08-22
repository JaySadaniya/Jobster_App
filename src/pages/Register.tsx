import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";

import Icon from "../components/ui/icon/Icon";
import Button from "../components/ui/button/Button";
import Input from "../components/ui/input/Input";
import Image from "../components/ui/image/Image";
import { userSchema } from "../schema/validation/user";

type UserSchema = {
  userName: string;
  email: string;
  password: string;
};

const Register = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const updateShowPassword = (value: boolean) => setShowPassword(value);

  const userSchema = yup.object().shape({
    userName: yup.string().trim().required(),
    email: yup.string().email().trim().required(),
    password: yup.string().required(),
  });

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserSchema>({
    resolver: yupResolver(userSchema),
  });
  return (
    <div className="pt-10">
      <form
        //   onSubmit={handleSubmit(onSubmit)}
        className="px-4 py-5 bg-white space-y-6 sm:px-6 sm:p-6 w-2/6 border-t-4 border-brand-500 rounded mx-auto shadow-lg hover:shadow-2xl shadow-secondary-300"
      >
        <div className="flex flex-col items-center">
          <Image
            className="logo w-[180px] h-[50px] mb-10"
            url="	https://redux-toolkit-jobster.netlify.app/static/media/logo.35bb8e1d9b5745af32ff148cbee51dfa.svg"
            alt="jobster logo"
          />

          <h1 className="text-3xl">Register</h1>
        </div>
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-3 sm:col-span-3">
            <Input
              id="name"
              type="text"
              label="Name"
              placeholder="Name"
              {...register("userName")}
              error={errors.userName?.message}
              appendClass={" bg-brand-50"}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-3 sm:col-span-3">
            <Input
              id="email"
              type="text"
              label="Email"
              placeholder="Email"
              {...register("email")}
              error={errors.email?.message}
              //   readOnly={user?.id ? true : false}
              appendClass={" bg-brand-50"}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-3 sm:col-span-3">
            <Input
              id="password"
              label="Password"
              placeholder="Password"
              {...register("password")}
              error={errors.password?.message}
              appendClass={" bg-brand-50"}
              type={`${showPassword ? "text" : "password"}`}
              Icon={
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 z-10">
                  <Icon
                    removeClass="fill-current"
                    appendClass="hover:text-gray-700 transition-all"
                  >
                    {showPassword ? (
                      <EyeOffIcon onClick={() => updateShowPassword(false)} />
                    ) : (
                      <EyeIcon onClick={() => updateShowPassword(true)} />
                    )}
                  </Icon>
                </div>
              }
            />
          </div>
        </div>

        <div className="flex flex-col gap-4 items-center">
          <Button
            type="submit"
            appendClass="w-full text-lg "
            isLoading={isSubmitting}
          >
            Register
          </Button>

          <p>
            Already a member?
            <Link to="/login" className="text-brand-500 p-1">
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;