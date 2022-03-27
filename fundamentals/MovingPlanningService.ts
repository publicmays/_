import { IMovingPlanningService } from "./IMovingPlanningService.interface";

let movingCompanyList:string[] | undefined;

export class MovingPlanningService implements IMovingPlanningService {
    public newApartment: string;
    public mitigationMap: Map<string, string | boolean>;
    public movingCompany: string;

    constructor() {

    }

    async execute(): Promise<void> {
        this.newApartment = await this.signNewApartment(20);
        this.movingCompany = await this.pickMovingCompany();
        const badReviewList = await this.readBadReviews();
        this.mitigationMap = await this.figureOutMitigationsForBadReviewIssues(badReviewList);
        const confirmation = await this.makeAppointmentWithMovingCompany(this.movingCompany);
    }
    
    async figureOutMitigationsForBadReviewIssues(badReviewList: string[]): Promise<Map<string, string>> {
        let mitigationMap: Map<string, string> | undefined;
        badReviewList.forEach(issue => {
            mitigationMap.set(issue, `solution for ${issue}`);
        });

        mitigationMap.set(`Unexpected cancellations`, `Confirm ${await this.communicateWithMovingCompany(1)}`);
        mitigationMap.set(`Unexpected cancellations`, `Confirm ${await this.communicateWithMovingCompany(0,3)}`);
        mitigationMap.set(`Unexpected cancellations`, `Confirm ${await this.communicateWithMovingCompany(0,1)}`);
        mitigationMap.set(`Unexpected cancellations`, `Confirm ${await this.communicateWithMovingCompany(0,0)}`);
        mitigationMap.set(`Doesn't show up`, this.pickBackupMovingCompany());
        return mitigationMap;
    }

    async pickMovingCompany(): Promise<string> {
        const movingCompanyList = await this.researchMovingCompanies();
        movingCompanyList.sort();
        return movingCompanyList.pop();
    }

    async readBadReviews(): Promise<string[]> {
        const source = ["google", "yelp"];
        let badReviewList: string[] | undefined;
        source.forEach(badReview => {
            badReviewList.push(badReview);
        });
        return badReviewList;
    }

    async signNewApartment(daysBeforeCurrentLeaseFinishes: number): Promise<string> {
        throw new Error("Method not implemented.");
    }

    async makeAppointmentWithMovingCompany(movingCompany: string): Promise<string> {
        // Call Moving Company
        const confirmation = await this.getConfirmation();
        return confirmation;
    }
    
    private async communicateWithMovingCompany(weeksBeforeMove?: number, daysBeforeMove?: number): Promise<boolean> {
        return this.hasResponded() ? true : false;
    }

    private async getConfirmation(): Promise<string> {
        throw new Error("Method not implemented");
    }
    
    private getMovingCompany(): string {
        const movingCompany = "";
        // Sort on Yelp by Rating
        return movingCompany;
    }

    private hasResponded(): boolean {
        throw new Error("Method not implemented");
    }

    private pickBackupMovingCompany(): string {
        return movingCompanyList.pop();
    }

    private async researchMovingCompanies(): Promise<string[]> {
        movingCompanyList.push(this.getMovingCompany());
        movingCompanyList.push(this.getMovingCompany());
        movingCompanyList.push(this.getMovingCompany());
        return movingCompanyList;
    }
}