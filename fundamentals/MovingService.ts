import { IMovingExecutionService } from "./IMovingExecutionService.interface"
import { IMovingPlanningService } from "./IMovingPlanningService.interface";
import { MovingExecutionService } from "./MovingExecutionService";
import { MovingPlanningService } from "./MovingPlanningService";



class IMovingService {
    private movingPlanningService: IMovingPlanningService;
    private movingExecutionService: IMovingExecutionService;

    constructor() {
        this.movingPlanningService = new MovingPlanningService();
        this.movingExecutionService = new MovingExecutionService();
    }    

}