import { ClassBand } from "../model/Band";
import { BaseDatabase } from "./BaseDatabase";
import Migrations from "./Migrations";

export class BandDataBase extends BaseDatabase {
  public registerBand = async (band: ClassBand): Promise<void> => {
    try {
      await this.getConnection().raw(`
                INSERT INTO ${Migrations.getTableBands()}
                VALUES (
                    "${band.getId()}",
                    "${band.getName()}",
                    "${band.getGenre()}",
                    "${band.getResponsible()}"
                );
            `);
    } catch (error) {
      throw new Error(error.sqlmessage || error.message);
    }
  };
}

export default new BandDataBase();
