import { IMovingExecutionService } from "./IMovingExecutionService.interface";
import { IMovingPlanningService } from "./IMovingPlanningService.interface";

export interface IMovingService {
    movingPlanningService: IMovingPlanningService;
    movingExecutionService: IMovingExecutionService;

    execute(): Promise<void>;
}