/*
  Warnings:

  - Added the required column `time_remaining` to the `task_user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time_spent` to the `task_user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time_total` to the `task_user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `task_user` ADD COLUMN `time_remaining` DATETIME(3) NOT NULL,
    ADD COLUMN `time_spent` DATETIME(3) NOT NULL,
    ADD COLUMN `time_total` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `tasks` ADD COLUMN `task_priority_id` INTEGER NOT NULL DEFAULT 1;

-- CreateTable
CREATE TABLE `task_priorities` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `task_task_priority_id_fkey` ON `tasks`(`task_priority_id`);

-- AddForeignKey
ALTER TABLE `tasks` ADD CONSTRAINT `tasks_task_priority_id_fkey` FOREIGN KEY (`task_priority_id`) REFERENCES `task_priorities`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- RedefineIndex
CREATE INDEX `task_user_user_id_task_id_fkey` ON `task_user`(`user_id`, `task_id`);
DROP INDEX `task_user_user_id_fkey` ON `task_user`;
