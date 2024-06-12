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
	`created_at` integer NOT NULL,
	`year` integer NOT NULL,
	`sequence` integer NOT NULL,
	`project_name` text DEFAULT '' NOT NULL,
	`offer_number` text DEFAULT '' NOT NULL,
	`offer_date` integer NOT NULL,
	`offer_place` text DEFAULT '' NOT NULL,
	`validity` integer DEFAULT 30 NOT NULL,
	`production_time` integer DEFAULT 1 NOT NULL,
	`currency` text DEFAULT 'HUF' NOT NULL,
	`tax_rate` real DEFAULT 27 NOT NULL,
	`status` text DEFAULT 'created' NOT NULL,
	`partner_id` text,
	`items` text,
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
--> statement-breakpoint
CREATE INDEX `year_idx` ON `offers` (`year`);--> statement-breakpoint
CREATE UNIQUE INDEX `sequence_idx` ON `offers` (`sequence`,`year`);