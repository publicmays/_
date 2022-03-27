export interface IMovingPlanningService {

    readBadReviews(): Promise<string[]>;

    figureOutMitigationsForBadReviewIssues(badReviewList: string[]): Promise<Map<string, string>>;

    pickMovingCompany(): Promise<string>;

    makeAppointmentWithMovingCompany(movingCompany: string): Promise<string>;

    signNewApartment(daysBeforeCurrentLeaseFinishes: number): Promise<string>;

    execute(): Promise<void>;
}
