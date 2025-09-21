"use server";

import { prisma } from "@/lib/prisma";
import {
  waitlistEntrySchema,
  type WaitlistEntryFormData,
  type WaitlistActionResult,
} from "@/lib/waitlist-types";
import { getClientIP, checkRateLimit } from "@/lib/rate-limit";
import { z } from "zod";

export async function createWaitlistEntryAction(
  formData: FormData,
): Promise<WaitlistActionResult> {
  try {
    // Get client IP for rate limiting
    const clientIP = getClientIP();
    
    // Check rate limit (5 submissions per IP per day)
    const rateLimitResult = checkRateLimit(clientIP, 5, 24 * 60 * 60 * 1000);
    
    if (!rateLimitResult.allowed) {
      const resetTime = new Date(rateLimitResult.resetTime);
      return {
        success: false,
        message: `Too many waitlist submissions. You can try again after ${resetTime.toLocaleDateString()} at ${resetTime.toLocaleTimeString()}.`,
      };
    }

    // Parse and validate form data
    const rawData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      appSlug: process.env.NEXT_PUBLIC_APP_SLUG || "raine",
    };

    const validatedData = waitlistEntrySchema.parse(rawData);

    // Check if email already exists for this app
    const existingEntry = await prisma.waitlistEntry.findUnique({
      where: {
        email_appSlug: {
          email: validatedData.email,
          appSlug: validatedData.appSlug,
        },
      },
    });

    if (existingEntry) {
      return {
        success: false,
        message:
          "You're already on the waitlist! We'll notify you when we launch.",
        position: existingEntry.position,
      };
    }

    // Get current count to determine position
    const currentCount = await prisma.waitlistEntry.count({
      where: { appSlug: validatedData.appSlug },
    });

    // Create new waitlist entry
    const newEntry = await prisma.waitlistEntry.create({
      data: {
        name: validatedData.name || "",
        email: validatedData.email,
        appSlug: validatedData.appSlug,
        position: currentCount + 1,
      },
    });

    // Get updated total count
    const totalEntries = await prisma.waitlistEntry.count({
      where: { appSlug: validatedData.appSlug },
    });

    return {
      success: true,
      message: `Welcome to the waitlist! We'll notify you when we launch. (${rateLimitResult.remaining} submissions remaining today)`,
      position: newEntry.position,
      totalEntries,
    };
  } catch (error) {
    console.error("Waitlist entry error:", error);

    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: "Please check your input and try again.",
        errors: error.flatten().fieldErrors,
      };
    }

    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    };
  }
}

export async function getWaitlistStatsAction(appSlug: string): Promise<{
  totalEntries: number;
  recentEntries: number;
}> {
  try {
    const totalEntries = await prisma.waitlistEntry.count({
      where: { appSlug },
    });

    const oneDayAgo = new Date();
    oneDayAgo.setDate(oneDayAgo.getDate() - 1);

    const recentEntries = await prisma.waitlistEntry.count({
      where: {
        appSlug,
        createdAt: {
          gte: oneDayAgo,
        },
      },
    });

    return {
      totalEntries,
      recentEntries,
    };
  } catch (error) {
    console.error("Error fetching waitlist stats:", error);
    return {
      totalEntries: 0,
      recentEntries: 0,
    };
  }
}
