import { Task } from "../models/task.model";
import { Project } from "../models/project.model";
import { User } from "../models/user.model";

export const TASKS: Task[] = [
    {
        id: 1,
        title: "Plan",
        priority: 10,
        parentTaskId: null,
        isParentTask: false,
        parentTask: null,
        startDate: new Date(2018, 12, 12),
        endDate: new Date(2018, 12, 12),
        isCompleted: false,
        projectId: 1,
        project: null
    },
    {
        id: 2,
        title: "Test",
        priority: 17,
        parentTaskId: null,
        isParentTask: false,
        parentTask: null,
        startDate: new Date(2018, 12, 12),
        endDate: new Date(2018, 12, 12),
        isCompleted: false,
        projectId: 1,
        project: null
    }];

export const PROJECTS: Project[] = [
    {
        id: 1,
        title: "Test project",
        priority: 10,
        startDate: new Date(2018, 1, 1),
        endDate: new Date(2018, 1, 1),
        manager: null,
        tasks: null,
        tasksCompleted: 0
    },
    {
        id: 2,
        title: "Test project1",
        priority: 2,
        startDate: new Date(2019, 1, 1),
        endDate: new Date(2020, 1, 1),
        manager: null,
        tasks: null,
        tasksCompleted: 1
    }
];

export const USERS: User[] = [
    {
        id: 1,
        firstName: "first name",
        lastName: "last name",
        employeeId: "12345",
        fullName: "first name last name"
    },
    {
        id: 2,
        firstName: "first name1",
        lastName: "last name1",
        employeeId: "456789",
        fullName: "first name1 last name1"
    }];