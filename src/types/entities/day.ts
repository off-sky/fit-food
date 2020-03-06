import { DayMenu } from "./day-menu";

export interface Day {
    timestampUTC: number;
    displayDate: string;
    menu: DayMenu;
}