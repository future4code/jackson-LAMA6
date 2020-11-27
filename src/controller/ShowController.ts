import { Request, Response } from "express";
import { ShowInput } from "../model/Show";
import ShowBusiness from "../business/ShowBusiness";

export class ShowController {
  async createShow(req: Request, res: Response) {
    try {
      const token: string = req.headers.authorization as string;

      const input: ShowInput = {
        bandId: req.body.bandId,
        weekDay: req.body.weekDay,
        startTime: req.body.startTime,
        endTime: req.body.endTime
      };

      await ShowBusiness.createShow(input, token);
      res.status(200).send({ message: "Show created" });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }
}

export default new ShowController();
