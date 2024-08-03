// import React from "react";
import "./PagesStyles/grid.css";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/Shadecn/components/ui/form";
import { Button } from "@/Shadecn/components/ui/button";
import { handleError } from "@/utils/handleError";
import { useForm } from "react-hook-form";
import { Input } from "@/Shadecn/components/ui/input";
import { useSignupMutation } from "@/Redux/slices/api";
import { useDispatch } from "react-redux";
import { updateCurrentUser, updateIsLoggedIn } from "@/Redux/slices/appSlice";

const formSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
});

export default function Signup() {
  const [signup, { isLoading }] = useSignupMutation();
  const Dispatch = useDispatch();
  const Navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

   async function handleSignup(values: z.infer<typeof formSchema>) {
    try {
      const response = await signup(values).unwrap();
      Dispatch(updateCurrentUser(response));
      Dispatch(updateIsLoggedIn(true));
      Navigate("/");
    } catch (error) {
      handleError(error);
    }
  }
  return (
    <div className="__signup grid-bg w-full h-[calc(100dvh-60px)] flex justify-center items-center flex-col gap-3">
      <div className="__form_container bg-black border-[1px] py-8 px-4 flex flex-col gap-5 w-[300px]">
        <div className="">
          <h1 className="text-4xl font-bold text-center">Signup</h1>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSignup)}
            className="flex flex-col gap-2"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Username"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      type="email"
                      placeholder="Email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      type="password"
                      placeholder="Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">
              Signup
            </Button>
          </form>
        </Form>
        <small className="text-xs font-mono">
          Already have an account?{" "}
          <Link className=" text-blue-500" to="/login">
            Login
          </Link>
          .
        </small>
      </div>
    </div>
  );
}
