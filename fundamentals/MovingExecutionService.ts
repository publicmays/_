import { IMovingExecutionService, WrapMediumMaterial } from "./IMovingExecutionService.interface";

export class MovingExecutionService implements IMovingExecutionService {
    wrapPreciousValuables(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    packPreviousValuables(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    wrapItem(wrapMediumMaterial: WrapMediumMaterial): Promise<void> {
        throw new Error("Method not implemented.");
    }
    packItem(wrapMediumMaterial: WrapMediumMaterial): Promise<void> {
        throw new Error("Method not implemented.");
    }
    moveInitialItemsToNewApartment(daysBeforeCurrentLeaseFinishes: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
    setVacationRangeForExpectedMovingPeriod(): Promise<void> {
        throw new Error("Method not implemented.");
    }

}