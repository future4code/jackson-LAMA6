import { ShowInput, Show } from "../model/Show";
import idGenerator, { IdGenerator } from "../services/IdGenerator";
import authenticator, {
  Authenticator,
  AuthenticationData
} from "../services/Authenticator";
import showDatabase, { ShowDatabase } from "../data/ShowDatabase";
import { ValidationOutput } from "../utils/validation";
import { ParameterError } from "../error/ParameterError";

export class ShowBusiness {
  constructor(
    private authenticator: Authenticator,
    private idGenerator: IdGenerator,
    private showDataBase: ShowDatabase
  ) {}

  public async createShow(
    show: ShowInput,
    token: string,
    validator: (input: any) => ValidationOutput
  ) {
    try {
      const id = this.idGenerator.generate();
      const tokenData: AuthenticationData = this.authenticator.getData(token);

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

      const showSchedule = await this.showDataBase.getShowByDate(
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
      await this.showDataBase.createShow(newShow);
    } catch (error) {
      throw new ParameterError(error.message, error.code);
    }
  }
}

export default new ShowBusiness(authenticator, idGenerator, showDatabase);
