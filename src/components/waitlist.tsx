"use client";

import React, { useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createWaitlistEntryAction } from "@/actions/waitlist";
import { toast } from "sonner";
import Image from "next/image";
import Link from "next/link";

const waitListSchema = z.object({
  name: z.string().optional(),
  email: z
    .string({ message: "Email is required." })
    .email({ message: "Please enter a valid email address" }),
});

type WaitListFormData = z.infer<typeof waitListSchema>;

interface WaitlistPageProps {
  initialStats?: {
    totalEntries: number;
    recentEntries: number;
  };
}

export default function WaitlistPage({ initialStats }: WaitlistPageProps) {
  const [isPending, startTransition] = useTransition();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [_, setSubmitResult] = useState<{
    success: boolean;
    message: string;
    position?: number;
  } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<WaitListFormData>({
    resolver: zodResolver(waitListSchema),
  });

  const handleWaitlistSubmission = async (formData: WaitListFormData) => {
    startTransition(async () => {
      try {
        const formDataToSubmit = new FormData();
        formDataToSubmit.append("name", formData.name || "");
        formDataToSubmit.append("email", formData.email);

        const result = await createWaitlistEntryAction(formDataToSubmit);

        setSubmitResult(result);

        if (result.success) {
          toast.success(result.message);
          reset();
          setIsDialogOpen(false);
        } else {
          toast.error(result.message);
        }
      } catch (error) {
        console.error("Form submission error:", error);
        toast.error("Something went wrong. Please try again.");
      }
    });
  };
  return (
    <div className="min-h-screen flex justify-center items-center relative overflow-hidden">
      <div className="relative z-10 max-w-2xl mx-auto px-6 py-12 sm:py-16">
        {/* Logo */}
        <div className="mb-6">
          {/* <div className="flex items-center justify-center"> */}
          <Image
            className="rounded-md"
            src={"/raine-new.png"}
            alt="raine-logo"
            width={48}
            height={48}
          />
          {/* </div> */}
        </div>

        {/* Badge */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-blue-700 dark:bg-blue-500 px-4 py-2 rounded-full text-xs font-medium">
            <span>🌧️</span>
            Introducing Raine
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold  mb-6 leading-tight text-balance">
          Get early access to <span className="underline italic">Raine</span>
          —your new way to stay on top of tasks.{" "}
        </h1>

        <p className="text-base  mb-8 leading-relaxed">
          Be among the first to experience Raine – the simple, powerful to-do
          app designed to help you organize your tasks, boost your productivity,
          and stay focused. Join the waitlist now for early access!
        </p>
        <p className="text-base  mb-8 leading-relaxed">
          For more information, you can visit the about{" "}
          <Link href="/about" className="underline">
            page
          </Link>
          .
        </p>

        <div className="mb-8">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                size="lg"
                className="px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-200 w-full sm:w-auto cursor-pointer"
              >
                Join the Waitlist
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md mx-4">
              <DialogHeader>
                <DialogTitle className="text-base">
                  Join the Waitlist
                </DialogTitle>
                <DialogDescription className="text-xs">
                  Get exclusive access to cutting-edge AI tools. We'll notify
                  you when we launch!
                </DialogDescription>
              </DialogHeader>
              <form
                onSubmit={handleSubmit(handleWaitlistSubmission)}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-xs">
                    Name (optional)
                  </Label>
                  <Input
                    {...register("name")}
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    className="w-full text-xs py-5"
                    disabled={isPending}
                  />
                  {errors.name && (
                    <span className="text-red-500 text-xs">
                      {errors.name.message}
                    </span>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-xs">
                    Email *
                  </Label>
                  <Input
                    {...register("email")}
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="w-full text-xs py-5"
                    disabled={isPending}
                  />
                  {errors.email && (
                    <span className="text-red-500 text-xs">
                      {errors.email.message}
                    </span>
                  )}
                </div>
                <Button
                  type="submit"
                  className="w-full text-xs py-5"
                  disabled={isPending}
                >
                  {isPending ? "Joining..." : "Join Waitlist"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Social proof */}
        <div className="flex items-center gap-3 mt-12">
          <div className="flex -space-x-2">
            <Avatar className="w-8 h-8 border-2 border-white">
              <AvatarImage src="/professional-woman-diverse.png" />
              <AvatarFallback className="bg-blue-500 text-white text-xs font-semibold">
                JD
              </AvatarFallback>
            </Avatar>
            <Avatar className="w-8 h-8 border-2 border-white">
              <AvatarImage src="/professional-man.png" />
              <AvatarFallback className="bg-green-500 text-white text-xs font-semibold">
                SM
              </AvatarFallback>
            </Avatar>
            <Avatar className="w-8 h-8 border-2 border-white">
              <AvatarImage src="/professional-person.png" />
              <AvatarFallback className="bg-purple-500 text-white text-xs font-semibold">
                AL
              </AvatarFallback>
            </Avatar>
            <Avatar className="w-8 h-8 border-2 border-white">
              <AvatarImage src="/diverse-business-person.png" />
              <AvatarFallback className="bg-orange-500 text-white text-xs font-semibold">
                MK
              </AvatarFallback>
            </Avatar>
          </div>
          <span className="text-xs text-gray-600 font-medium">
            100+ people on the waitlist
            {/* {initialStats?.totalEntries || } people on the waitlist */}
            {/* {initialStats?.recentEntries && initialStats.recentEntries > 0 && ( */}
            {/*   <span className="block text-xs text-gray-500"> */}
            {/*     {initialStats.recentEntries} joined in the last 24 hours */}
            {/*   </span> */}
            {/* )} */}
          </span>
        </div>
      </div>
    </div>
  );
}
