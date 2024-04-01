"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { AuthActions } from "@/app/auth/utils";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  IconBrandGithub,
  IconBrandGoogle,
} from "@tabler/icons-react";
import { relative } from "path";

var fn = function () {
  /* do you want */  
}
type FormData = {
  email: string;
  password: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>();

  const router = useRouter();
  
  const { login, storeToken } = AuthActions();
  console.log(login);
  const onSubmit = (data: FormData) => {
    login(data.email, data.password)
      .json((json) => {
        storeToken(json.access, "access");
        storeToken(json.refresh, "refresh");
  
        router.push("dashboard");
      })
      .catch((err) => {
        setError("root", { type: "manual", message: err.json.detail });
      });
    console.log(data);
  };
  
  return (
    <div className="w-full library h-[93vh] py-10 md:py-20">
    
      <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black filter-color">
        
        <div className="flex justify-center flex-shrink-0 items-center space-x-3">
          <img src='/library.svg' alt='logo' className='h-5 w-5' />
          <h1 className='text-lg'>FSUMI-LIB</h1>
        </div>
        
        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
        
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
          Bienvenue à nouveau à FSUMI-LIB
        </h2>
        <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
          Veuillez vous connecter avec votre compte académique pour accéder à la bibliothèque de l'université.
        </p>
  
        <form className="my-10 w-full" onSubmit={handleSubmit(onSubmit)}>
          {/* <LabelInputContainer className="mb-10">
            <Label htmlFor="email">Compte académique</Label>
            <Input id="email" placeholder="exemple@edu.umi.ac.ma" type="email" className="rounded"/>
          </LabelInputContainer> */}
          <LabelInputContainer className="mb-10 w-full">
            <Label htmlFor="CNE">CNE / MASSAR</Label>
            <Input 
              id="CNE"
              placeholder="M123456789"
              type="text"
              {...register("email", { required: true })}
              className="rounded"
            />
            {errors.email && (
              <span className="text-xs text-red-600">Email is required</span>
            )}
          </LabelInputContainer>
          <LabelInputContainer className="mb-8">
            <Label htmlFor="password">Mot de passe</Label>
            <Input
              id="password"
              placeholder="••••••••"
              type="password"
              {...register("password", { required: true })}
              className="rounded"
            />
            {errors.password && (
              <span className="text-xs text-red-600">Password is required</span>
            )}
            <Link
            href="/auth/password/reset-password"
            className="text-sm text-indigo-600 hover:underline"
          >
            Mot de passe oublié?
          </Link>
          </LabelInputContainer>
          
          <button
            className="mb-4 bg-gradient-to-br rounded relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          >
            Se connecter
            <BottomGradient />
          </button>
          {errors.root && (
            <span className="text-sm text-red-600">Aucun compte actif trouvé avec les identifiants fournis</span>
          )}

          {/* <div className="flex flex-col space-y-4">
            <button
              className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
              type="submit"
            >
              <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
              <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                GitHub
              </span>
              <BottomGradient />
            </button>
            <button
              className="relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
              type="submit"
            >
              <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
              <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                Google
              </span>
              <BottomGradient />
            </button>
          </div> */}
        </form>
      </div>
    </div>
    
    
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      
      {children}
    </div>
  );
};

export default Login;