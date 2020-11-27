import bandBusiness, { BandBusiness } from "../business/BandBusiness";
import { ClassBand, InputBand } from "../model/Band";
import { Request, Response } from "express";
import { validation } from "../utils/validation";
import { BaseDatabase } from "../data/BaseDatabase";
import { stringToUserRole } from "../model/User";

export class BandController {
  constructor(private bandBusiness: BandBusiness) {}

  public registerBand = async (req: Request, res: Response): Promise<void> => {
    try {
      const input: InputBand = {
        name: req.body.name,
        genre: req.body.genre,
        responsible: req.body.responsible
      };

      const token: string = req.headers.authorization as string;

      await this.bandBusiness.registerBand(input, token, validation, stringToUserRole);

      res.status(200).send("Band registered with success");
    } catch (error) {
      const { code, message } = error;
      res.status(code || 400).send({ message });
    }
    await BaseDatabase.destroyConnection();
  };

  public getBand = async (req: Request, res: Response): Promise<void> =>{
    try {
      const info = req.query.name || req.query.id

      const result: ClassBand = await this.bandBusiness.getBand(
        String(info), 
        validation
        )

        res.status(200)
        .send(result)

    } catch (error) {
      const { code, message } = error;
      res.status(code || 400).send({ message });
    }
    await BaseDatabase.destroyConnection();
  }
}

export default new BandController(bandBusiness);
