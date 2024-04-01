CREATE TABLE `contacts` (
	`id` text PRIMARY KEY NOT NULL,
	`person` text NOT NULL,
	`title` text NOT NULL,
	`subtitle` text NOT NULL,
	`phone` text NOT NULL,
	`email` text NOT NULL,
	`address` text NOT NULL,
	`company_number` text NOT NULL,
	`tax_number` text NOT NULL,
	`bank_account_number` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `offers` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` integer,
	`year` integer NOT NULL,
	`sequence` integer NOT NULL,
	`project_name` text NOT NULL,
	`offer_number` text NOT NULL,
	`offer_date` integer,
	`offer_place` text NOT NULL,
	`validity` integer NOT NULL,
	`production_time` integer NOT NULL,
	`currency` text DEFAULT 'HUF' NOT NULL,
	`tax_rate` real DEFAULT 27 NOT NULL,
	`status` text DEFAULT 'created' NOT NULL,
	`partner_id` text,
	`items` text NOT NULL,
	FOREIGN KEY (`partner_id`) REFERENCES `partners`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE TABLE `partners` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`address` text NOT NULL,
	`company_number` text NOT NULL,
	`tax_number` text NOT NULL
);
