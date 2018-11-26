import { Project } from "./project.model";
import { Task } from "./task.model";

export interface User{
    id: number;
    employeeId: string;
    firstName: string;
    lastName: string;
    fullName: string;
    
    project?: Project;
    task?: Task;
}