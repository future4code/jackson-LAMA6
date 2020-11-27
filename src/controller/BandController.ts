import bandBusiness, { BandBusiness } from "../business/BandBusiness";
import { InputBand } from "../model/Band";
import { Request, Response } from 'express'
import { validation } from "../utils/validation";

export class BandController {

    constructor(
        private bandBusiness: BandBusiness
    ) {}

    public registerBand = async (req: Request, res: Response): Promise<void> =>{
        try {
            const input: InputBand = {
                name: req.body.name,
                genre: req.body.genre,
                responsible: req.body.responsible
            }

            const token: string = req.headers.authorization as string

            await this.bandBusiness.registerBand(input, token, validation)

            res.status(200)
            .send("Band registered with success")
            
        } catch (error) {
            const { statusCode, message } = error
            res.status(statusCode || 400).send({message})
        }
    }
}

export default new BandController(bandBusiness)