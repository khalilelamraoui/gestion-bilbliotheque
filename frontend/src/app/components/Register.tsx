import React from "react";
import { useForm } from "react-hook-form";
import { AuthActions } from "@/app/auth/utils";
import { useRouter } from "next/navigation";

type FormData = {
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  password: string;
};

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>();

  const router = useRouter();

  const { register: registerUser } = AuthActions(); // Note: Renamed to avoid naming conflict with useForm's register

  const onSubmit = (data: FormData) => {
    registerUser(data.email, data.username, data.password, data.first_name, data.last_name)
      .json(() => {
        router.push("/");
      })
      .catch((err) => {
        setError("root", {
          type: "manual",
          message: err.json.detail,
        });
      });
  };
    
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg w-2/3">
            <h3 className="text-2xl font-semibold text-black">Register your account</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
              <div>
                <label className="block text-black" htmlFor="email">
                  Email
                </label>
                <input
                  type="text"
                  placeholder="Email"
                  {...register("email", { required: "Email is required" })}
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
                {errors.email && (
                  <span className="text-xs text-red-600">
                    {errors.email.message}
                  </span>
                )}
              </div>
              <div className="mt-4">
                <label className="block text-black" htmlFor="username">
                  Username
                </label>
                <input
                  type="text"
                  placeholder="Username"
                  {...register("username", { required: "Username is required" })}
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
                {errors.username && (
                  <span className="text-xs text-red-600">
                    {errors.username.message}
                  </span>
                )}
              </div>
              <div className="mt-4">
                <label className="block text-black" htmlFor="first_name">
                  first_name
                </label>
                <input
                  type="text"
                  placeholder="first_name"
                  {...register("first_name", { required: "first name is required" })}
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
                {errors.first_name && (
                  <span className="text-xs text-red-600">
                    {errors.first_name.message}
                  </span>
                )}
              </div>
              <div className="mt-4">
                <label className="block text-black" htmlFor="last_name">
                  last_name
                </label>
                <input
                  type="text"
                  placeholder="last_name"
                  {...register("last_name", { required: "last_name is required" })}
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
                {errors.last_name && (
                  <span className="text-xs text-red-600">
                    {errors.last_name.message}
                  </span>
                )}
              </div>
              <div className="mt-4">
                <label className="block text-black" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Password"
                  {...register("password", { required: "Password is required" })}
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
                {errors.password && (
                  <span className="text-xs text-red-600">
                    {errors.password.message}
                  </span>
                )}
              </div>
              <div className="flex items-center justify-between mt-4">
                <button className="px-12 py-2 leading-5 text-white transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700">
                  Register
                </button>
              </div>
              {errors.root && (
                <span className="text-xs text-red-600">{errors.root.message}</span>
              )}
            </form>
          </div>
        </div>
    );
};

export default Register;