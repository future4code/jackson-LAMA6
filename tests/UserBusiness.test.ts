import { UserBusiness } from "../src/business/UserBusiness"
import { LoginInput, UserInput } from "../src/model/User"
import { getUserByEmailMock, 
    getUserByEmailUndefinedMock, 
    toUserInvalidRole, 
    toUserRoleNormal, 
    validatorMockFalsy, 
    validatorMockTrue,
    compareTrue,
    compareFalse
} from "./globals"

describe("signup", () =>{
    const idGenerator = { generate: jest.fn() } as any
    const hashManager = { hash: jest.fn() } as any
    const authenticator = { generateToken: jest.fn() } as any
    const userDatabase = { signup: jest.fn() } as any

    test("Error when 'name' is empty", async () =>{
        expect.assertions(2)

        const userBusiness: UserBusiness = new UserBusiness(
            idGenerator,
            hashManager,
            authenticator,
            userDatabase
        )
        
        const validatorMock = validatorMockFalsy
        const toRole = toUserRoleNormal
        const input: UserInput = {
            name: "",
            email: "test@email.com",
            password: "testando123",
            role: "normal"
        }

        try {
            await userBusiness.signup(
                input,
                validatorMock,
                toRole
            )

        } catch (error) {
            expect(error.message).toBe("Missing properties")
            expect(error.code).toBe(422)
        }
    })

    test("Error when 'email' is empty", async () =>{
        expect.assertions(2)

        const userBusiness: UserBusiness = new UserBusiness(
            idGenerator,
            hashManager,
            authenticator,
            userDatabase
        )
        
        const validatorMock = validatorMockFalsy
        const toRole = toUserRoleNormal
        const input: UserInput = {
            name: "test",
            email: "",
            password: "testando123",
            role: "normal"
        }

        try {
            await userBusiness.signup(
                input,
                validatorMock,
                toRole
            )

        } catch (error) {
            expect(error.message).toBe("Missing properties")
            expect(error.code).toBe(422)
        }
    })

    test("Error when 'password' is empty", async () =>{
        expect.assertions(2)

        const userBusiness: UserBusiness = new UserBusiness(
            idGenerator,
            hashManager,
            authenticator,
            userDatabase
        )
        
        const validatorMock = validatorMockFalsy
        const toRole = toUserRoleNormal
        const input: UserInput = {
            name: "test",
            email: "test@email.com",
            password: "",
            role: "normal"
        }

        try {
            await userBusiness.signup(
                input,
                validatorMock,
                toRole
            )

        } catch (error) {
            expect(error.message).toBe("Missing properties")
            expect(error.code).toBe(422)
        }
    })

    test("Error when 'role' is empty", async () =>{
        expect.assertions(2)

        const userBusiness: UserBusiness = new UserBusiness(
            idGenerator,
            hashManager,
            authenticator,
            userDatabase
        )
        
        const validatorMock = validatorMockFalsy
        const toRole = toUserRoleNormal
        const input: UserInput = {
            name: "test",
            email: "test@email.com",
            password: "testando123",
            role: ""
        }

        try {
            await userBusiness.signup(
                input,
                validatorMock,
                toRole
            )

        } catch (error) {
            expect(error.message).toBe("Missing properties")
            expect(error.code).toBe(422)
        }
    })
    
    test("Error when email is invalid", async () =>{
        expect.assertions(2)

        const userBusiness: UserBusiness = new UserBusiness(
            idGenerator,
            hashManager,
            authenticator,
            userDatabase
        )
        
        const validatorMock = validatorMockTrue
        const toRole = toUserRoleNormal
        const input: UserInput = {
            name: "test",
            email: "testemail.com",
            password: "testando123",
            role: "normal"
        }

        try {
            await userBusiness.signup(
                input,
                validatorMock,
                toRole
            )

        } catch (error) {
            expect(error.message).toBe("Invalid email")
            expect(error.code).toBe(422)
        }
    })

    test("Error when password is invalid", async () =>{
        expect.assertions(2)

        const userBusiness: UserBusiness = new UserBusiness(
            idGenerator,
            hashManager,
            authenticator,
            userDatabase
        )
        
        const validatorMock = validatorMockTrue
        const toRole = toUserRoleNormal
        const input: UserInput = {
            name: "test",
            email: "test@email.com",
            password: "test",
            role: "normal"
        }

        try {
            await userBusiness.signup(
                input,
                validatorMock,
                toRole
            )

        } catch (error) {
            expect(error.message).toBe("Invalid password")
            expect(error.code).toBe(422)
        }
    })

    test("Error when role is invalid", async () =>{
        expect.assertions(2)

        const userBusiness: UserBusiness = new UserBusiness(
            idGenerator,
            hashManager,
            authenticator,
            userDatabase
        )
        
        const validatorMock = validatorMockTrue
        const toRole = toUserInvalidRole
        const input: UserInput = {
            name: "test",
            email: "test@email.com",
            password: "testando123",
            role: "test"
        }

        try {
            await userBusiness.signup(
                input,
                validatorMock,
                toRole
            )

        } catch (error) {
            expect(error.message).toBe("Invalid role")
            expect(error.code).toBe(422)
        }
    })

    test("Success case", async () =>{
        expect.assertions(2)

        const userBusiness: UserBusiness = new UserBusiness(
            idGenerator,
            hashManager,
            authenticator,
            userDatabase
        )
        
        const validatorMock = validatorMockTrue
        const toRole = toUserRoleNormal
        const input: UserInput = {
            name: "test",
            email: "test@email.com",
            password: "testando123",
            role: "normal"
        }

        try {
            await userBusiness.signup(input, validatorMock, toRole)

            expect(userDatabase.signup).toHaveBeenCalled()
            expect(userDatabase.signup).toHaveBeenCalledWith(input)
        } catch (error) {
            
        }
    })
})

describe("Login", () =>{
    const idGenerator = { generate: jest.fn() } as any
    const hashManagerTrue = { compare: compareTrue} as any
    const hahsManagerFalse = { compare: compareFalse } as any
    const authenticator = { generateToken: jest.fn() } as any
    const userDatabaseTrue = { getUserByEmail: getUserByEmailMock } as any
    const userDatabaseFalsy = { getUserByEmail: getUserByEmailUndefinedMock } as any

    test("Error when 'email' is empty", async () =>{
        expect.assertions(2)

        const userBusiness: UserBusiness = new UserBusiness(
            idGenerator,
            hashManagerTrue,
            authenticator,
            userDatabaseTrue
        )

        const validatorMock = validatorMockFalsy
        const input: LoginInput = {
            email: "",
            password: "testando123"
        }

        try {
            await userBusiness.login(input, validatorMock)

        } catch (error) {
            expect(error.message).toBe("Missing properties")
            expect(error.code).toBe(422)
        }
    })

    test("Error when 'password' is empty", async () =>{
        expect.assertions(2)

        const userBusiness: UserBusiness = new UserBusiness(
            idGenerator,
            hashManagerTrue,
            authenticator,
            userDatabaseTrue
        )

        const validatorMock = validatorMockFalsy
        const input: LoginInput = {
            email: "test@email.com",
            password: ""
        }

        try {
            await userBusiness.login(input, validatorMock)

        } catch (error) {
            expect(error.message).toBe("Missing properties")
            expect(error.code).toBe(422)
        }
    })

 test("Error when 'email' is invalid", async () =>{
        expect.assertions(2)

        const userBusiness: UserBusiness = new UserBusiness(
            idGenerator,
            hashManagerTrue,
            authenticator,
            userDatabaseTrue
        )

        const validatorMock = validatorMockTrue
        const input: LoginInput = {
            email: "testemail.com",
            password: "testando123"
        }

        try {
            await userBusiness.login(input, validatorMock)

        } catch (error) {
            expect(error.message).toBe("Invalid email")
            expect(error.code).toBe(422)
        }
    })

    test("Error when user not found", async () =>{
        expect.assertions(2)

        const userBusiness: UserBusiness = new UserBusiness(
            idGenerator,
            hashManagerTrue,
            authenticator,
            userDatabaseFalsy
        )

        const validatorMock = validatorMockTrue
        const input: LoginInput = {
            email: "test@email.com",
            password: "testando123"
        }

        try {
            await userBusiness.login(input, validatorMock)

        } catch (error) {
            expect(error.message).toBe("Not found")
            expect(error.code).toBe(404)
        }
    })

    test("Error when password is incorrect", async () =>{
        expect.assertions(2)

        const userBusiness: UserBusiness = new UserBusiness(
            idGenerator,
            hahsManagerFalse,
            authenticator,
            userDatabaseTrue
        )

        const validatorMock = validatorMockTrue
        const input: LoginInput = {
            email: "test@email.com",
            password: "testando123"
        }

        try {
            await userBusiness.login(input, validatorMock)

        } catch (error) {
            expect(error.message).toBe("Password is incorrect")
            expect(error.code).toBe(422)
        }
    })

    test("Success case", async () =>{
        expect.assertions(3)

        const userBusiness: UserBusiness = new UserBusiness(
            idGenerator,
            hashManagerTrue,
            authenticator,
            userDatabaseTrue
        )

        const validatorMock = validatorMockTrue
        const input: LoginInput = {
            email: "test@email.com",
            password: "testando123"
        }

        try {
            await userBusiness.login(input, validatorMock)

            expect(userDatabaseTrue.getUserByEmail).toHaveBeenCalled()
            expect(userDatabaseTrue.getUserByEmail).toHaveBeenCalledWith(input.email)
            expect(userBusiness.login).toHaveReturned()

        } catch (error) {

        }
    })
})