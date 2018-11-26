import { Project } from "./project.model";

export interface Task {
    id: number;
    title: string;
    priority: number;
    startDate?: Date;
    endDate?: Date;
    isParentTask: boolean;    
    isCompleted: boolean;
    
    parentTaskId?: number;
    parentTask: Task;
    projectId: number;
    project: Project;
}
