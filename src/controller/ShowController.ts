import { Request, Response } from "express";
import { ShowInput, WeekDay } from "../model/Show";
import showBusiness, { ShowBusiness } from "../business/ShowBusiness";
import { validation } from "../utils/validation";

export class ShowController {
  constructor(private showBusiness: ShowBusiness) {}

  public createShow = async (req: Request, res: Response): Promise<void> => {
    try {
      const input: ShowInput = {
        bandId: req.body.bandId,
        weekDay: req.body.weekDay,
        startTime: req.body.startTime,
        endTime: req.body.endTime
      };

      const token: string = req.headers.authorization as string;

      await this.showBusiness.createShow(input, token, validation);

      res.status(200).send({ message: "Show created" });
    } catch (error) {
      const { statusCode, message } = error;
      res.status(statusCode || 400).send({ message });
    }
  };

  public getByDay = async (req: Request, res: Response): Promise<void> => {
    try {
      const day = String(req.query.day).toUpperCase();
      const result = await this.showBusiness.getByDay(day);

      res.status(200).send({ result });
    } catch (error) {
      const { statusCode, message } = error;
      res.status(statusCode || 400).send({ message });
    }
  };
}

export default new ShowController(showBusiness);
