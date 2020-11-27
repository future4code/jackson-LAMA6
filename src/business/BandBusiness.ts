import { ParameterError } from "../error/ParameterError";
import { ClassBand, InputBand } from "../model/Band";
import { ValidationOutput } from "../utils/validation";
import authenticator, { Authenticator, AuthenticationData } from '../services/Authenticator'
import { UserRole } from "../model/User";
import bandDataBase, { BandDataBase } from '../data/BandDataBase'
import idGenerator, { IdGenerator } from "../services/IdGenerator";

export class BandBusiness {

    constructor(
        private authenticator: Authenticator,
        private idGenerator: IdGenerator,
        private bandDataBase: BandDataBase
     ){}
    
    public registerBand = async (
        input: InputBand,
        token: string,
        validator: (input: any) => ValidationOutput
        ): Promise<void> =>{
        try {
            const resultValidation = validator(input)

            if(!resultValidation.isValid){
                throw new ParameterError("Missing properties", 422)
            }
            
            if(!token){
                throw new ParameterError("Missing properties", 422)
            }

            const tokenData: AuthenticationData = this.authenticator.getData(token)

            if(tokenData.role === UserRole.NORMAL){
                throw new ParameterError("Not authorized", 401)
            }

            const id: string = this.idGenerator.generate()

            await this.bandDataBase.registerBand(new ClassBand(id, input.name, input.genre, input.responsible))

        } catch (error) {
            throw new ParameterError(error.message, error.code)
        }
    }
}

export default new BandBusiness(authenticator, idGenerator, bandDataBase)