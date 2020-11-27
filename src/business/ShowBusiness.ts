import { ShowInput, Show, WeekDay } from "../model/Show";
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
    input: ShowInput,
    token: string,
    validator: (input: any) => ValidationOutput
  ) {
    try {
      const resultValidation = validator(input);
      if (!resultValidation.isValid) {
        throw new ParameterError("Missing properties", 422);
      }

      const id = this.idGenerator.generate();
      const tokenData: AuthenticationData = this.authenticator.getData(token);

      if (tokenData.role !== "ADMIN") {
        throw new Error("Only admin can create new show");
      }

      if (
        input.startTime > input.endTime ||
        input.startTime < 8 ||
        input.endTime > 23 ||
        !Number.isInteger(input.startTime) ||
        !Number.isInteger(input.endTime)
      ) {
        throw new Error("Selected time is invalid");
      }

      const showSchedule = await this.showDataBase.getShowByDate(
        input.weekDay,
        input.startTime,
        input.endTime
      );

      if (showSchedule.length > 0) {
        throw new Error("There's a show at this moment");
      }

      const newShow = new Show(
        id,
        Show.stringToWeekDay(input.weekDay),
        input.startTime,
        input.endTime,
        input.bandId
      );
      await this.showDataBase.createShow(newShow);
    } catch (error) {
      throw new ParameterError(error.message, error.code);
    }
  }

  public async getByDay(day: string): Promise<any> {
    try {
      if (!day) {
        throw new Error("Invalid day");
      }
      const showSchedule = await this.showDataBase.getShowByDay(
        Show.stringToWeekDay(day)
      );

      console.log({ showSchedule });

      return showSchedule;
    } catch (error) {
      throw new ParameterError(error.message, error.code);
    }
  }
}

export default new ShowBusiness(authenticator, idGenerator, showDatabase);
