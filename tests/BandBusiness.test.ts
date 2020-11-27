import { BandBusiness } from "../src/business/BandBusiness"
import { InputBand } from "../src/model/Band"

export const validatorMockFalsy = jest.fn((input: any): any =>{
    return false
})

export const validatorMockTrue = jest.fn((input: any): any =>{
    return true
})


describe("Register band", () =>{
    const authenticator = { getData: jest.fn() } as any
    const idGenerator = { generate: jest.fn() } as any
    const bandDataBase = { registerBand: jest.fn() } as any

    const bandBusiness: BandBusiness = new BandBusiness(
        authenticator,
        idGenerator,
        bandDataBase
    )

    test("Error when 'name' is empty", async () =>{
        const input: InputBand = {
            name: "",
            genre: "Rock",
            responsible: "John Lennon"
        }
    
        const mockValidator = validatorMockFalsy
        expect.assertions(2)

        try {
            await bandBusiness.registerBand(input, "tokenTest", mockValidator as any)

        } catch (error) {
            expect(error.message).toBe("Missing properties")  
            expect(error.code).toBe(422)
        }
    })

    test("Error when 'genre' is empty", async () =>{
        const input: InputBand = {
            name: "Beatles",
            genre: "",
            responsible: "John Lennon"
        }
    
        const mockValidator = validatorMockFalsy
        expect.assertions(2)

        try {
            await bandBusiness.registerBand(input, "tokenTest", mockValidator as any)

        } catch (error) {
            expect(error.message).toBe("Missing properties")  
            expect(error.code).toBe(422)
        }
    })

    test("Error when 'responsible' is empty", async () =>{
        const input: InputBand = {
            name: "Beatles",
            genre: "Rock",
            responsible: ""
        }
    
        const mockValidator = validatorMockFalsy
        expect.assertions(2)

        try {
            await bandBusiness.registerBand(input, "tokenTest", mockValidator as any)

        } catch (error) {
            expect(error.message).toBe("Missing properties")  
            expect(error.code).toBe(422)
        }
    })

    test("Success case", async () =>{
        const input: InputBand = {
            name: "Beatles",
            genre: "Rock",
            responsible: "John Lennon"
        }
    
        const mockValidator = validatorMockTrue
        expect.assertions(0)

        try {
            await bandBusiness.registerBand(input, "tokenTest", mockValidator as any)

            expect(bandBusiness.registerBand).toHaveBeenCalled()
            expect(bandBusiness.registerBand).toHaveBeenCalledWith(
                input,
                "tokenTest",
                mockValidator
            )

        } catch (error) {

        }
    })
})