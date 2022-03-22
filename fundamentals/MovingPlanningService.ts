import { IMovingPlanningService } from "./IMovingPlanningService.interface";

export class MovingPlanningService implements IMovingPlanningService {

    constructor() {

    }
    async execute(): Promise<void> {
        const movingCompanyList = await this.researchMovingCompanies();
    }

    async researchMovingCompanies(): Promise<string[]> {
        let movingCompanyList:string[] | undefined;
        movingCompanyList.push(this.getMovingCompany());
        movingCompanyList.push(this.getMovingCompany());
        movingCompanyList.push(this.getMovingCompany());
        return movingCompanyList;
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

    private getMovingCompany(): string {
        const _googleSearchResult = "";
        return _googleSearchResult;
    }
    


}