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
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Pink gradient blob in top right */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-pink-400/30 via-pink-300/20 to-transparent rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-2xl mx-auto px-6 py-16">
        {/* Logo */}
        <div className="mb-12">
          <div className="w-8 h-8 bg-pink-500 rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-sm transform rotate-45"></div>
          </div>
        </div>

        {/* Badge */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium">
            <span>🔥</span>
            Amazing Curated AI Tools
          </div>
        </div>

        {/* Main heading */}
        <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight text-balance">
          Join <span className="underline italic">Raine</span> Waiting List for
          Exclusive Access
        </h1>

        {/* Description */}
        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
          You'll gain exclusive access to a curated collection of cutting-edge
          AI tools that will transform the way you work and create. Join the
          waitlist now!
        </p>

        {/* CTA Button with Dialog */}
        <div className="mb-8">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                size="lg"
                className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Join the Waitlist
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Join the Waitlist</DialogTitle>
                <DialogDescription>
                  Get exclusive access to cutting-edge AI tools. We'll notify
                  you when we launch!
                </DialogDescription>
              </DialogHeader>
              <form
                onSubmit={handleSubmit(handleWaitlistSubmission)}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="name">Name (optional)</Label>
                  <Input
                    {...register("name")}
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    className="w-full"
                    disabled={isPending}
                  />
                  {errors.name && (
                    <span className="text-red-500 text-sm">
                      {errors.name.message}
                    </span>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    {...register("email")}
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="w-full"
                    disabled={isPending}
                  />
                  {errors.email && (
                    <span className="text-red-500 text-sm">
                      {errors.email.message}
                    </span>
                  )}
                </div>
                <Button
                  type="submit"
                  className="w-full bg-pink-500 hover:bg-pink-600 text-white"
                  disabled={isPending}
                >
                  {isPending ? "Joining..." : "Join Waitlist"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Social proof */}
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            <Avatar className="w-8 h-8 border-2 border-white">
              <AvatarImage src="/professional-woman-diverse.png" />
              <AvatarFallback className="bg-blue-500 text-white text-xs">
                JD
              </AvatarFallback>
            </Avatar>
            <Avatar className="w-8 h-8 border-2 border-white">
              <AvatarImage src="/professional-man.png" />
              <AvatarFallback className="bg-green-500 text-white text-xs">
                SM
              </AvatarFallback>
            </Avatar>
            <Avatar className="w-8 h-8 border-2 border-white">
              <AvatarImage src="/professional-person.png" />
              <AvatarFallback className="bg-purple-500 text-white text-xs">
                AL
              </AvatarFallback>
            </Avatar>
            <Avatar className="w-8 h-8 border-2 border-white">
              <AvatarImage src="/diverse-business-person.png" />
              <AvatarFallback className="bg-orange-500 text-white text-xs">
                MK
              </AvatarFallback>
            </Avatar>
          </div>
          <span className="text-sm text-gray-600 font-medium">
            {initialStats?.totalEntries || 52} people on the waitlist
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
