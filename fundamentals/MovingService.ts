import { IMovingExecutionService } from "./IMovingExecutionService.interface"
import { IMovingPlanningService } from "./IMovingPlanningService.interface";
import { IMovingService } from "./IMovingService.interface";
import { MovingExecutionService } from "./MovingExecutionService";
import { MovingPlanningService } from "./MovingPlanningService";



class MovingService implements IMovingService {
    public movingPlanningService: IMovingPlanningService = new MovingPlanningService();
    public movingExecutionService: IMovingExecutionService = new MovingExecutionService();
    
    constructor() {

    }

    async execute(): Promise<void> {
        await this.movingPlanningService.execute();
        await this.movingExecutionService.execute();
    }
}

const movingService = new MovingService();
movingService.execute();