import { BandBusiness } from "../src/business/BandBusiness"
import { InputBand } from "../src/model/Band"
import { 
    dataTokenRoleAdminMock, 
    dataTokenRoleNormalMock, 
    toUserRoleAdmim, 
    toUserRoleNormal, 
    validatorMockFalsy, 
    validatorMockTrue 
} from "./globals"



describe("Register band", () =>{
    const roleAdmin = { getData: dataTokenRoleAdminMock } as any
    const roleNormal = { getData: dataTokenRoleNormalMock } as any
    const idGenerator = { generate: jest.fn() } as any
    const bandDataBase = { registerBand: jest.fn() } as any


    test("Error when 'name' is empty", async () =>{
        const bandBusiness: BandBusiness = new BandBusiness(
            roleAdmin,
            idGenerator,
            bandDataBase
        )

        const input: InputBand = {
            name: "",
            genre: "Rock",
            responsible: "John Lennon"
        }
        const toRole = toUserRoleAdmim
        const mockValidator = validatorMockFalsy
        expect.assertions(2)

        try {
            await bandBusiness.registerBand(
                input, 
                "tokenTest", 
                mockValidator as any,
                toRole as any
                )

        } catch (error) {
            expect(error.message).toBe("Missing properties")  
            expect(error.code).toBe(422)
        }
    })

    test("Error when 'genre' is empty", async () =>{
        const bandBusiness: BandBusiness = new BandBusiness(
            roleAdmin,
            idGenerator,
            bandDataBase
        )

        const input: InputBand = {
            name: "Beatles",
            genre: "",
            responsible: "John Lennon"
        }
        const toRole = toUserRoleAdmim
        const mockValidator = validatorMockFalsy
        expect.assertions(2)

        try {
            await bandBusiness.registerBand(
                input, 
                "tokenTest", 
                mockValidator as any,
                toRole as any
                )

        } catch (error) {
            expect(error.message).toBe("Missing properties")  
            expect(error.code).toBe(422)
        }
    })

    test("Error when 'responsible' is empty", async () =>{
        const bandBusiness: BandBusiness = new BandBusiness(
            roleAdmin,
            idGenerator,
            bandDataBase
        )

        const input: InputBand = {
            name: "Beatles",
            genre: "Rock",
            responsible: ""
        }
        const toRole = toUserRoleAdmim
        const mockValidator = validatorMockFalsy
        expect.assertions(2)

        try {
            await bandBusiness.registerBand(
                input, 
                "tokenTest", 
                mockValidator as any,
                toRole as any
                )

        } catch (error) {
            expect(error.message).toBe("Missing properties")  
            expect(error.code).toBe(422)
        }
    })

    test("Error when role is 'NORMAL'", async () =>{
        const bandBusiness: BandBusiness = new BandBusiness(
            roleNormal,
            idGenerator,
            bandDataBase
        )

        const input: InputBand = {
            name: "Beatles",
            genre: "Rock",
            responsible: "John Lennon"
        }
        const toRole = toUserRoleNormal
        const mockValidator = validatorMockTrue
        expect.assertions(2)

        try {
            await bandBusiness.registerBand(
                input, 
                "tokenTest", 
                mockValidator as any,
                toRole as any
                )

        } catch (error) {
            expect(error.message).toBe("Not authorized")  
            expect(error.code).toBe(401)
        }
    })

    test("Success case", async () =>{
        const bandBusiness: BandBusiness = new BandBusiness(
            roleAdmin,
            idGenerator,
            bandDataBase
        )

        const input: InputBand = {
            name: "Beatles",
            genre: "Rock",
            responsible: "John Lennon"
        }
        
        const toRole = toUserRoleAdmim
        const mockValidator = validatorMockTrue
        expect.assertions(2)

        try {
            await bandBusiness.registerBand(
                input, 
                "tokenTest", 
                mockValidator as any,
                toRole as any
                )

            expect(bandDataBase.registerBand).toHaveBeenCalled()
            expect(bandDataBase.registerBand).toHaveBeenCalledWith(
                input
            )

        } catch (error) {

        }
    })
})