import { BaseDatabase } from "./BaseDatabase";
import Migrations from "./Migrations";
import { Show, WeekDay } from "../model/Show";

export class ShowDatabase extends BaseDatabase {
  public async createShow(show: Show): Promise<void> {
    try {
      await this.getConnection()
        .insert({
          id: show.getId(),
          week_day: show.getWeekDay(),
          start_time: show.getStartTime(),
          end_time: show.getEndTime(),
          band_id: show.getBandId()
        })
        .into(Migrations.getTableShows());
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async getShowByDate(
    weekDay: string,
    startTime: number,
    endTime: number
  ): Promise<any> {
    try {
      const show = await this.getConnection().raw(
        `SELECT * FROM ${Migrations.getTableShows()} WHERE week_day = "${weekDay}" AND start_time BETWEEN ${startTime} AND ${endTime}`
      );
      return show[0];
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async getShowByDay(day: WeekDay): Promise<any> {
    try {
      const show = await this.getConnection().raw(
        `SELECT * FROM ${Migrations.getTableShows()} WHERE week_day = "${day}" ORDER BY start_time`
      );

      return show[0];
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }
}

export default new ShowDatabase();
