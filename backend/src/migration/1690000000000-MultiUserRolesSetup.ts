import { MigrationInterface, QueryRunner } from 'typeorm';

export class MultiUserRolesSetup1690000000000 implements MigrationInterface {
  name = 'MultiUserRolesSetup1690000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    try {
      await queryRunner.query(`
        CREATE TABLE users_new (
           id INTEGER PRIMARY KEY AUTOINCREMENT,
           username TEXT NOT NULL UNIQUE,
           roles TEXT NOT NULL DEFAULT '["regular_user"]',
           status TEXT NOT NULL DEFAULT 'Enabled' CHECK (status IN ('Enabled', 'Disabled', 'Deleted'))
        )
      `);

      await queryRunner.query(`
        INSERT INTO users_new (id, username, roles, status)
        SELECT
          id,
          username,
          CASE
            WHEN role = 'Admin' THEN '["admin_user"]'
            WHEN role = 'Editor' THEN '["editor_user"]'
            ELSE '["regular_user"]'
            END as roles,
          CASE
            WHEN status = 1 THEN 'Enabled'
            WHEN status = 0 THEN 'Disabled'
            ELSE 'Deleted'
            END as status
        FROM users
      `);

      await queryRunner.query(`DROP TABLE users`);
      await queryRunner.query(`ALTER TABLE users_new RENAME TO users`);

    } catch (error) {
      console.error('Migration up error:', error);
      throw error;
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    try {
      await queryRunner.query(`
        CREATE TABLE users_old (
           id INTEGER PRIMARY KEY AUTOINCREMENT,
           username TEXT NOT NULL UNIQUE,
           role TEXT NOT NULL DEFAULT 'User',
           status INTEGER NULL
        )
      `);

      await queryRunner.query(`
        INSERT INTO users_old (id, username, role, status)
        SELECT 
          id,
          username,
          CASE 
            WHEN roles LIKE '%"admin_user"%' THEN 'Admin'
            WHEN roles LIKE '%"editor_user"%' THEN 'Editor'
            ELSE 'User'
          END as role,
          CASE 
            WHEN status = 'Enabled' THEN 1
            WHEN status = 'Disabled' THEN 0
            ELSE NULL
          END as status
        FROM users
      `);

      await queryRunner.query(`DROP TABLE users`);
      await queryRunner.query(`ALTER TABLE users_old RENAME TO users`);

    } catch (error) {
      console.error('Migration down error:', error);
      throw error;
    }
  }
}