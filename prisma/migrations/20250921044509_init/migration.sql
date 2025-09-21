-- CreateTable
CREATE TABLE "public"."waitlist_entries" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "appSlug" TEXT NOT NULL,
    "position" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "waitlist_entries_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "waitlist_entries_appSlug_position_idx" ON "public"."waitlist_entries"("appSlug", "position");

-- CreateIndex
CREATE UNIQUE INDEX "waitlist_entries_email_appSlug_key" ON "public"."waitlist_entries"("email", "appSlug");
