import { MeasurementUnit } from './measurement-unit';

export interface Quantity {
    count: number;
    displayCount: string;
    unit: MeasurementUnit;
}