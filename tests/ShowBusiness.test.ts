import { ShowInput } from "../src/model/Show";
import { ShowBusiness } from "../src/business/ShowBusiness";

const validatorMockFalse = jest.fn((input: any): any => {
  return { isValid: false, errors: [] };
});

const validatorMockTrue = jest.fn((input: any): any => {
  return { isValid: true, errors: [] };
});

const validatorToken = jest.fn((input: any): any => {
  return { id: "id", role: "ADMIN" };
});

const validatorShowByDate = jest.fn(
  (weekDay: string, startTime: number, endTime: number): any => {
    return [{ show: "show" }];
  }
);

describe("Create show", () => {
  const authenticator = { getData: validatorToken } as any;
  const idGenerator = { generate: jest.fn() } as any;
  const showDataBase = {
    createBand: jest.fn(),
    getShowByDate: validatorShowByDate
  } as any;

  const showBusiness: ShowBusiness = new ShowBusiness(
    authenticator,
    idGenerator,
    showDataBase
  );

  test("Error when invalid date", async () => {
    const input: ShowInput = {
      bandId: "10",
      weekDay: "SATURDAY",
      startTime: 18,
      endTime: 16
    };

    const mockValidator = validatorMockTrue;

    try {
      await showBusiness.createShow(input, "tokenTest", mockValidator as any);
    } catch (error) {
      expect(error.message).toBe("Selected time is invalid");
    }
  });

  test("Error when there's already a show", async () => {
    const input: ShowInput = {
      bandId: "10000",
      weekDay: "SATURDAY",
      startTime: 16,
      endTime: 18
    };

    const mockValidator = validatorMockTrue;

    try {
      await showBusiness.createShow(input, "tokenTest", mockValidator as any);
    } catch (error) {
      expect(error.message).toBe("There's a show at this moment");
    }
  });
});
