export type WrapMediumMaterial = "BUBBLEWRAP" | "SARANWRAP" | "NEWSPAPER" | "PAPER" | "CLOTH";

export type PackingMaterial = "TAPE" | "BOX" | "BAGS" | "SUITCASE";

export interface IMovingExecutionService {

    wrapPreciousValuables(): Promise<void>;

    packPreviousValuables(): Promise<void>;

    wrapItem(wrapMediumMaterial: WrapMediumMaterial): Promise<void>;

    packItem(wrapMediumMaterial: WrapMediumMaterial): Promise<void>;

    moveInitialItemsToNewApartment(daysBeforeCurrentLeaseFinishes: number): Promise<void>;

    setVacationRangeForExpectedMovingPeriod(): Promise<void>;

    execute(): Promise<void>;
}
