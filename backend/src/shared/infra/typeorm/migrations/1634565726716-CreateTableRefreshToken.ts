import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableRefreshToken1634565726716
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'refresh_token',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isUnique: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },

          {
            name: 'expiresIn',
            type: 'int',
          },

          {
            name: 'user_id',
            type: 'uuid',
          },

          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },

          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'tokenUser',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['user_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('refresh_token');
  }
}
