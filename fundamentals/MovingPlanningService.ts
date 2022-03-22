import { IMovingPlanningService } from "./IMovingPlanningService.interface";

export class MovingPlanningService implements IMovingPlanningService {
    researchMovingCompanies(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    readBadReviews(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    figureOutMitigationsForBadReviewIssues(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    pickMovingCompany(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    pickBackupMovingCompany(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    makeAppointmentWithMovingCompany(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    communicateWithMovingCompany(weeksBeforeMove?: number, daysBeforeMove?: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
    signNewApartment(daysBeforeCurrentLeaseFinishes: number): Promise<void> {
        throw new Error("Method not implemented.");
    }

}