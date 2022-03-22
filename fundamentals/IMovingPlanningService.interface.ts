export interface IMovingPlanningService {
    
    researchMovingCompanies(): Promise<void>;

    readBadReviews(): Promise<void>;

    figureOutMitigationsForBadReviewIssues(): Promise<void>;

    pickMovingCompany(): Promise<void>;

    pickBackupMovingCompany(): Promise<void>;

    makeAppointmentWithMovingCompany(): Promise<void>;

    communicateWithMovingCompany(weeksBeforeMove?: number, daysBeforeMove?: number): Promise<void>;

    signNewApartment(daysBeforeCurrentLeaseFinishes: number): Promise<void>;
}
