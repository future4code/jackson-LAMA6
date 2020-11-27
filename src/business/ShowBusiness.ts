import { ShowInput, Show } from "../model/Show";
import { IdGenerator } from "../services/IdGenerator";
import { Authenticator, AuthenticationData } from "../services/Authenticator";
import ShowDatabase from "../data/ShowDatabase";

export class ShowBusiness {
  async createShow(show: ShowInput, token: string) {
    const idGenerator = new IdGenerator();
    const id = idGenerator.generate();

    const authenticator = new Authenticator();
    const tokenData: AuthenticationData = authenticator.getData(token);

    if (tokenData.role !== "ADMIN") {
      throw new Error("Only admin can create new show");
    }

    if (
      show.startTime > show.endTime ||
      show.startTime < 8 ||
      show.endTime > 23 ||
      !Number.isInteger(show.startTime) ||
      !Number.isInteger(show.endTime)
    ) {
      throw new Error("Selected time is invalid");
    }

    const showSchedule = await ShowDatabase.getShowByDate(
      show.weekDay,
      show.startTime,
      show.endTime
    );

    if (showSchedule.length > 0) {
      throw new Error("There's a show at this moment");
    }

    const newShow = new Show(
      id,
      Show.stringToWeekDay(show.weekDay),
      show.startTime,
      show.endTime,
      show.bandId
    );
    await ShowDatabase.createShow(newShow);
  }
}

export default new ShowBusiness();
