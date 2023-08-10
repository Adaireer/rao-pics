import type { MigrationInterface, QueryRunner } from "typeorm";

export class Sqlite1691657288550 implements MigrationInterface {
  name = "Sqlite1691657288550";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "fails" ("path" varchar PRIMARY KEY NOT NULL, "libraryId" integer NOT NULL, "type" varchar NOT NULL)`,
    );
    await queryRunner.query(
      `CREATE TABLE "pendings" ("path" varchar PRIMARY KEY NOT NULL, "type" varchar NOT NULL, "libraryId" integer NOT NULL)`,
    );
    await queryRunner.query(
      `CREATE TABLE "tags" ("name" varchar PRIMARY KEY NOT NULL, "libraryId" integer NOT NULL)`,
    );
    await queryRunner.query(
      `CREATE TABLE "libraries" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "dir" varchar NOT NULL, "type" varchar NOT NULL, "lastSyncTime" datetime, CONSTRAINT "UQ_cb2f03568ee87b6b5b43844fc70" UNIQUE ("dir"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "folders" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "libraryId" integer, CONSTRAINT "UQ_276815e9fa9e4ddac7810288bf9" UNIQUE ("name"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "images" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "path" varchar NOT NULL, "thumbnailPath" varchar, "name" varchar NOT NULL, "size" integer NOT NULL, "createTime" datetime NOT NULL, "lastTime" datetime NOT NULL, "ext" varchar NOT NULL, "width" integer NOT NULL, "height" integer NOT NULL, "duration" integer, "libraryId" integer)`,
    );
    await queryRunner.query(
      `CREATE TABLE "colors" ("rgb" integer PRIMARY KEY NOT NULL)`,
    );
    await queryRunner.query(
      `CREATE TABLE "configs" ("id" varchar PRIMARY KEY NOT NULL, "webPort" integer NOT NULL, "assetsPort" integer NOT NULL, "ip" varchar NOT NULL)`,
    );
    await queryRunner.query(
      `CREATE TABLE "images_folders_folders" ("imagesId" integer NOT NULL, "foldersId" varchar NOT NULL, PRIMARY KEY ("imagesId", "foldersId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_dc6b5f50681e36ce18196f54a1" ON "images_folders_folders" ("imagesId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_1205e3e8e83a9ad159904ee3f7" ON "images_folders_folders" ("foldersId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "images_tags_tags" ("imagesId" integer NOT NULL, "tagsName" varchar NOT NULL, PRIMARY KEY ("imagesId", "tagsName"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_1e0784771af32246b3057b574b" ON "images_tags_tags" ("imagesId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_de1875e0fffceba9a737933e03" ON "images_tags_tags" ("tagsName") `,
    );
    await queryRunner.query(
      `CREATE TABLE "images_colors_colors" ("imagesId" integer NOT NULL, "colorsRgb" integer NOT NULL, PRIMARY KEY ("imagesId", "colorsRgb"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d6ecc512d05a70cd48ba09d25b" ON "images_colors_colors" ("imagesId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a1a23b574c0d2319b8327aef2c" ON "images_colors_colors" ("colorsRgb") `,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_fails" ("path" varchar PRIMARY KEY NOT NULL, "libraryId" integer NOT NULL, "type" varchar NOT NULL, CONSTRAINT "FK_ca4ed262329fcf6d213e1fe9485" FOREIGN KEY ("libraryId") REFERENCES "libraries" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_fails"("path", "libraryId", "type") SELECT "path", "libraryId", "type" FROM "fails"`,
    );
    await queryRunner.query(`DROP TABLE "fails"`);
    await queryRunner.query(`ALTER TABLE "temporary_fails" RENAME TO "fails"`);
    await queryRunner.query(
      `CREATE TABLE "temporary_pendings" ("path" varchar PRIMARY KEY NOT NULL, "type" varchar NOT NULL, "libraryId" integer NOT NULL, CONSTRAINT "FK_8e8e97a8a534d8e02cb8b34eb0d" FOREIGN KEY ("libraryId") REFERENCES "libraries" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_pendings"("path", "type", "libraryId") SELECT "path", "type", "libraryId" FROM "pendings"`,
    );
    await queryRunner.query(`DROP TABLE "pendings"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_pendings" RENAME TO "pendings"`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_tags" ("name" varchar PRIMARY KEY NOT NULL, "libraryId" integer NOT NULL, CONSTRAINT "FK_fe921447b05cbd8ee9f27c4a054" FOREIGN KEY ("libraryId") REFERENCES "libraries" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_tags"("name", "libraryId") SELECT "name", "libraryId" FROM "tags"`,
    );
    await queryRunner.query(`DROP TABLE "tags"`);
    await queryRunner.query(`ALTER TABLE "temporary_tags" RENAME TO "tags"`);
    await queryRunner.query(
      `CREATE TABLE "temporary_folders" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "libraryId" integer, CONSTRAINT "UQ_276815e9fa9e4ddac7810288bf9" UNIQUE ("name"), CONSTRAINT "FK_70f68fc320fcc5e9a011df62e85" FOREIGN KEY ("libraryId") REFERENCES "libraries" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_folders"("id", "name", "libraryId") SELECT "id", "name", "libraryId" FROM "folders"`,
    );
    await queryRunner.query(`DROP TABLE "folders"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_folders" RENAME TO "folders"`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_images" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "path" varchar NOT NULL, "thumbnailPath" varchar, "name" varchar NOT NULL, "size" integer NOT NULL, "createTime" datetime NOT NULL, "lastTime" datetime NOT NULL, "ext" varchar NOT NULL, "width" integer NOT NULL, "height" integer NOT NULL, "duration" integer, "libraryId" integer, CONSTRAINT "FK_79dfee28a88730583e6039649c0" FOREIGN KEY ("libraryId") REFERENCES "libraries" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_images"("id", "path", "thumbnailPath", "name", "size", "createTime", "lastTime", "ext", "width", "height", "duration", "libraryId") SELECT "id", "path", "thumbnailPath", "name", "size", "createTime", "lastTime", "ext", "width", "height", "duration", "libraryId" FROM "images"`,
    );
    await queryRunner.query(`DROP TABLE "images"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_images" RENAME TO "images"`,
    );
    await queryRunner.query(`DROP INDEX "IDX_dc6b5f50681e36ce18196f54a1"`);
    await queryRunner.query(`DROP INDEX "IDX_1205e3e8e83a9ad159904ee3f7"`);
    await queryRunner.query(
      `CREATE TABLE "temporary_images_folders_folders" ("imagesId" integer NOT NULL, "foldersId" varchar NOT NULL, CONSTRAINT "FK_dc6b5f50681e36ce18196f54a14" FOREIGN KEY ("imagesId") REFERENCES "images" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_1205e3e8e83a9ad159904ee3f7c" FOREIGN KEY ("foldersId") REFERENCES "folders" ("id") ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY ("imagesId", "foldersId"))`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_images_folders_folders"("imagesId", "foldersId") SELECT "imagesId", "foldersId" FROM "images_folders_folders"`,
    );
    await queryRunner.query(`DROP TABLE "images_folders_folders"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_images_folders_folders" RENAME TO "images_folders_folders"`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_dc6b5f50681e36ce18196f54a1" ON "images_folders_folders" ("imagesId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_1205e3e8e83a9ad159904ee3f7" ON "images_folders_folders" ("foldersId") `,
    );
    await queryRunner.query(`DROP INDEX "IDX_1e0784771af32246b3057b574b"`);
    await queryRunner.query(`DROP INDEX "IDX_de1875e0fffceba9a737933e03"`);
    await queryRunner.query(
      `CREATE TABLE "temporary_images_tags_tags" ("imagesId" integer NOT NULL, "tagsName" varchar NOT NULL, CONSTRAINT "FK_1e0784771af32246b3057b574b0" FOREIGN KEY ("imagesId") REFERENCES "images" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_de1875e0fffceba9a737933e032" FOREIGN KEY ("tagsName") REFERENCES "tags" ("name") ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY ("imagesId", "tagsName"))`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_images_tags_tags"("imagesId", "tagsName") SELECT "imagesId", "tagsName" FROM "images_tags_tags"`,
    );
    await queryRunner.query(`DROP TABLE "images_tags_tags"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_images_tags_tags" RENAME TO "images_tags_tags"`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_1e0784771af32246b3057b574b" ON "images_tags_tags" ("imagesId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_de1875e0fffceba9a737933e03" ON "images_tags_tags" ("tagsName") `,
    );
    await queryRunner.query(`DROP INDEX "IDX_d6ecc512d05a70cd48ba09d25b"`);
    await queryRunner.query(`DROP INDEX "IDX_a1a23b574c0d2319b8327aef2c"`);
    await queryRunner.query(
      `CREATE TABLE "temporary_images_colors_colors" ("imagesId" integer NOT NULL, "colorsRgb" integer NOT NULL, CONSTRAINT "FK_d6ecc512d05a70cd48ba09d25b5" FOREIGN KEY ("imagesId") REFERENCES "images" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_a1a23b574c0d2319b8327aef2c3" FOREIGN KEY ("colorsRgb") REFERENCES "colors" ("rgb") ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY ("imagesId", "colorsRgb"))`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_images_colors_colors"("imagesId", "colorsRgb") SELECT "imagesId", "colorsRgb" FROM "images_colors_colors"`,
    );
    await queryRunner.query(`DROP TABLE "images_colors_colors"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_images_colors_colors" RENAME TO "images_colors_colors"`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d6ecc512d05a70cd48ba09d25b" ON "images_colors_colors" ("imagesId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a1a23b574c0d2319b8327aef2c" ON "images_colors_colors" ("colorsRgb") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_a1a23b574c0d2319b8327aef2c"`);
    await queryRunner.query(`DROP INDEX "IDX_d6ecc512d05a70cd48ba09d25b"`);
    await queryRunner.query(
      `ALTER TABLE "images_colors_colors" RENAME TO "temporary_images_colors_colors"`,
    );
    await queryRunner.query(
      `CREATE TABLE "images_colors_colors" ("imagesId" integer NOT NULL, "colorsRgb" integer NOT NULL, PRIMARY KEY ("imagesId", "colorsRgb"))`,
    );
    await queryRunner.query(
      `INSERT INTO "images_colors_colors"("imagesId", "colorsRgb") SELECT "imagesId", "colorsRgb" FROM "temporary_images_colors_colors"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_images_colors_colors"`);
    await queryRunner.query(
      `CREATE INDEX "IDX_a1a23b574c0d2319b8327aef2c" ON "images_colors_colors" ("colorsRgb") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d6ecc512d05a70cd48ba09d25b" ON "images_colors_colors" ("imagesId") `,
    );
    await queryRunner.query(`DROP INDEX "IDX_de1875e0fffceba9a737933e03"`);
    await queryRunner.query(`DROP INDEX "IDX_1e0784771af32246b3057b574b"`);
    await queryRunner.query(
      `ALTER TABLE "images_tags_tags" RENAME TO "temporary_images_tags_tags"`,
    );
    await queryRunner.query(
      `CREATE TABLE "images_tags_tags" ("imagesId" integer NOT NULL, "tagsName" varchar NOT NULL, PRIMARY KEY ("imagesId", "tagsName"))`,
    );
    await queryRunner.query(
      `INSERT INTO "images_tags_tags"("imagesId", "tagsName") SELECT "imagesId", "tagsName" FROM "temporary_images_tags_tags"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_images_tags_tags"`);
    await queryRunner.query(
      `CREATE INDEX "IDX_de1875e0fffceba9a737933e03" ON "images_tags_tags" ("tagsName") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_1e0784771af32246b3057b574b" ON "images_tags_tags" ("imagesId") `,
    );
    await queryRunner.query(`DROP INDEX "IDX_1205e3e8e83a9ad159904ee3f7"`);
    await queryRunner.query(`DROP INDEX "IDX_dc6b5f50681e36ce18196f54a1"`);
    await queryRunner.query(
      `ALTER TABLE "images_folders_folders" RENAME TO "temporary_images_folders_folders"`,
    );
    await queryRunner.query(
      `CREATE TABLE "images_folders_folders" ("imagesId" integer NOT NULL, "foldersId" varchar NOT NULL, PRIMARY KEY ("imagesId", "foldersId"))`,
    );
    await queryRunner.query(
      `INSERT INTO "images_folders_folders"("imagesId", "foldersId") SELECT "imagesId", "foldersId" FROM "temporary_images_folders_folders"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_images_folders_folders"`);
    await queryRunner.query(
      `CREATE INDEX "IDX_1205e3e8e83a9ad159904ee3f7" ON "images_folders_folders" ("foldersId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_dc6b5f50681e36ce18196f54a1" ON "images_folders_folders" ("imagesId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "images" RENAME TO "temporary_images"`,
    );
    await queryRunner.query(
      `CREATE TABLE "images" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "path" varchar NOT NULL, "thumbnailPath" varchar, "name" varchar NOT NULL, "size" integer NOT NULL, "createTime" datetime NOT NULL, "lastTime" datetime NOT NULL, "ext" varchar NOT NULL, "width" integer NOT NULL, "height" integer NOT NULL, "duration" integer, "libraryId" integer)`,
    );
    await queryRunner.query(
      `INSERT INTO "images"("id", "path", "thumbnailPath", "name", "size", "createTime", "lastTime", "ext", "width", "height", "duration", "libraryId") SELECT "id", "path", "thumbnailPath", "name", "size", "createTime", "lastTime", "ext", "width", "height", "duration", "libraryId" FROM "temporary_images"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_images"`);
    await queryRunner.query(
      `ALTER TABLE "folders" RENAME TO "temporary_folders"`,
    );
    await queryRunner.query(
      `CREATE TABLE "folders" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "libraryId" integer, CONSTRAINT "UQ_276815e9fa9e4ddac7810288bf9" UNIQUE ("name"))`,
    );
    await queryRunner.query(
      `INSERT INTO "folders"("id", "name", "libraryId") SELECT "id", "name", "libraryId" FROM "temporary_folders"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_folders"`);
    await queryRunner.query(`ALTER TABLE "tags" RENAME TO "temporary_tags"`);
    await queryRunner.query(
      `CREATE TABLE "tags" ("name" varchar PRIMARY KEY NOT NULL, "libraryId" integer NOT NULL)`,
    );
    await queryRunner.query(
      `INSERT INTO "tags"("name", "libraryId") SELECT "name", "libraryId" FROM "temporary_tags"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_tags"`);
    await queryRunner.query(
      `ALTER TABLE "pendings" RENAME TO "temporary_pendings"`,
    );
    await queryRunner.query(
      `CREATE TABLE "pendings" ("path" varchar PRIMARY KEY NOT NULL, "type" varchar NOT NULL, "libraryId" integer NOT NULL)`,
    );
    await queryRunner.query(
      `INSERT INTO "pendings"("path", "type", "libraryId") SELECT "path", "type", "libraryId" FROM "temporary_pendings"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_pendings"`);
    await queryRunner.query(`ALTER TABLE "fails" RENAME TO "temporary_fails"`);
    await queryRunner.query(
      `CREATE TABLE "fails" ("path" varchar PRIMARY KEY NOT NULL, "libraryId" integer NOT NULL, "type" varchar NOT NULL)`,
    );
    await queryRunner.query(
      `INSERT INTO "fails"("path", "libraryId", "type") SELECT "path", "libraryId", "type" FROM "temporary_fails"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_fails"`);
    await queryRunner.query(`DROP INDEX "IDX_a1a23b574c0d2319b8327aef2c"`);
    await queryRunner.query(`DROP INDEX "IDX_d6ecc512d05a70cd48ba09d25b"`);
    await queryRunner.query(`DROP TABLE "images_colors_colors"`);
    await queryRunner.query(`DROP INDEX "IDX_de1875e0fffceba9a737933e03"`);
    await queryRunner.query(`DROP INDEX "IDX_1e0784771af32246b3057b574b"`);
    await queryRunner.query(`DROP TABLE "images_tags_tags"`);
    await queryRunner.query(`DROP INDEX "IDX_1205e3e8e83a9ad159904ee3f7"`);
    await queryRunner.query(`DROP INDEX "IDX_dc6b5f50681e36ce18196f54a1"`);
    await queryRunner.query(`DROP TABLE "images_folders_folders"`);
    await queryRunner.query(`DROP TABLE "configs"`);
    await queryRunner.query(`DROP TABLE "colors"`);
    await queryRunner.query(`DROP TABLE "images"`);
    await queryRunner.query(`DROP TABLE "folders"`);
    await queryRunner.query(`DROP TABLE "libraries"`);
    await queryRunner.query(`DROP TABLE "tags"`);
    await queryRunner.query(`DROP TABLE "pendings"`);
    await queryRunner.query(`DROP TABLE "fails"`);
  }
}
