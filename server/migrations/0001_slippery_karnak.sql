CREATE TABLE `encryption_keys` (
	`user_id` text PRIMARY KEY NOT NULL,
	`salt` text NOT NULL,
	`encrypted_key` text NOT NULL
);
