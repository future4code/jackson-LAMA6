import { BaseDatabase } from "./BaseDatabase";

class Migrations extends BaseDatabase {
  private static tableBands: string = "lama_bands";
  private static tableShows: string = "lama_shows";
  private static tableUsers: string = "lama_users";

  public getTableBands = (): string => Migrations.tableBands;
  public getTableShosws = (): string => Migrations.tableShows;
  public getTableUsers = (): string => Migrations.tableUsers;

  public createTables = async (): Promise<void> => {
    try {
      await this.getConnection().raw(`CREATE TABLE ${Migrations.tableBands} (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        music_genre VARCHAR(255) NOT NULL,
        responsible VARCHAR(255) UNIQUE NOT NULL
      )`);

      await this.getConnection().raw(`CREATE TABLE ${Migrations.tableShows} (
        id VARCHAR(255) PRIMARY KEY,
        week_day VARCHAR(255) NOT NULL,
        start_time INT NOT NULL,
        end_time INT NOT NULL,
        band_id VARCHAR(255) NOT NULL,
        FOREIGN KEY(band_id) REFERENCES ${Migrations.tableBands}(id)
      )`);

      await this.getConnection().raw(`
        CREATE TABLE ${Migrations.tableUsers} (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(255) NOT NULL DEFAULT "NORMAL"
      )`);
    } catch (error) {
      console.log(error);
    }
  };
}

export default new Migrations();

// const setup = new Migrations();
// setup.createTables();
