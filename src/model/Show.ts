export class Show {
  constructor(
    private id: string,
    private weekDay: WeekDay,
    private startTime: number,
    private endTime: number,
    private bandId: string
  ) {}

  public getId = (): string => this.id;
  public getWeekDay = (): WeekDay => this.weekDay;
  public getStartTime = (): number => this.startTime;
  public getEndTime = (): number => this.endTime;
  public getBandId = (): string => this.bandId;

  static stringToWeekDay(input: string): WeekDay {
    switch (input) {
      case "FRIDAY":
        return WeekDay.FRIDAY;
      case "SATURDAY":
        return WeekDay.SATURDAY;
      case "SUNDAY":
        return WeekDay.SUNDAY;
      default:
        throw new Error("Invalid week day");
    }
  }
}

export interface ShowInput {
  bandId: string;
  weekDay: string;
  startTime: number;
  endTime: number;
}

export enum WeekDay {
  FRIDAY = "FRIDAY",
  SATURDAY = "SATURDAY",
  SUNDAY = "SUNDAY"
}
