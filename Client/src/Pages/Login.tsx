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
import { useDispatch } from "react-redux";
import { Input } from "@/Shadecn/components/ui/input";
import { useLoginMutation } from "@/Redux/slices/api";
import { updateCurrentUser, updateIsLoggedIn } from "@/Redux/slices/appSlice";

const formSchema = z.object({
  userId: z.string(),
  password: z.string(),
});

export default function Login() {
  const [login, { isLoading }] = useLoginMutation();
  const Dispatch = useDispatch();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId: "",
      password: "",
    },
  });

  async function handleLogin(values: z.infer<typeof formSchema>) {
    try {
      const response = await login(values).unwrap();
      Dispatch(updateCurrentUser(response));
      Dispatch(updateIsLoggedIn(true));
      navigate("/");
    } catch (error) {
      handleError(error);
    }
  }

  return (
    <div className="__login grid-bg w-full h-[calc(100dvh-60px)] flex justify-center items-center flex-col gap-3">
      <div className="__form_container bg-black border-[1px] py-8 px-4 flex flex-col gap-5 w-[300px]">
        <div className="">
          <h1 className=" text-4xl font-bold text-center">Login</h1>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleLogin)}
            className="flex flex-col gap-2"
          >
            <FormField
              control={form.control}
              name="userId"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      required
                      disabled={isLoading}
                      placeholder="Username or Email"
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
                      required
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
            <Button loading={isLoading} className="w-full" type="submit">
              Login
            </Button>
          </form>
        </Form>
        <small className="text-xs ">
          Don't have an account?{" "}
          <Link className=" text-blue-500" to="/signup">
            Signup
          </Link>
          .
        </small>
      </div>
    </div>
  );
}
