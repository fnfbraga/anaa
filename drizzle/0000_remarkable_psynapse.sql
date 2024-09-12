DO $$ BEGIN
 CREATE TYPE "public"."types" AS ENUM('login', 'note');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "items" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"type" "types" NOT NULL,
	"url" text,
	"username" text,
	"password" text,
	"note" text,
	"favorite" text DEFAULT 'false',
	"tags" text[]
);
