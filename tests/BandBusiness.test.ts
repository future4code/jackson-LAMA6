import { BandBusiness } from "../src/business/BandBusiness"
import { InputBand } from "../src/model/Band"
import { UserRole } from "../src/model/User"

export const validatorMockFalsy = jest.fn((input: any): any =>{
    return {isValid: false}
})

export const validatorMockTrue = jest.fn((input: any): any =>{
    return {isValid: true}
})

export const dataTokenRoleNormalMock = jest.fn((token: any): any =>{
    return {
        id:"id",
        role: "NORMAL"
    }
})

export const dataTokenRoleAdminMock = jest.fn((token: any): any =>{
    return {
        id:"id",
        role: "ADMIN"
    }
})

export const dataTokenRoleNonMock = jest.fn((token: any): any =>{
    return {
        id:"id",
        role: "TEST"
    }
})

export const toUserRoleNormal = jest.fn((role: any): any =>{
    return UserRole.NORMAL
})

export const toUserRoleAdmim = jest.fn((role: any): any =>{
    return UserRole.ADMIN
})


describe("Register band", () =>{
    const roleAdmin = { getData: dataTokenRoleAdminMock } as any
    const roleNormal = { getData: dataTokenRoleNormalMock } as any
    const nonRole = { getData: dataTokenRoleNonMock } as any
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
            roleAdmin,
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