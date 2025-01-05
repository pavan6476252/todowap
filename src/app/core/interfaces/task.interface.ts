import { IList } from "./list.interface";
import { ITag } from "./tag.interface";


export interface ISubTask {
    _id?: string;
    title: String,
    completed: Boolean,
    created_date: Date,
    completed_date?: Date;
}

export interface ITask {
    _id: string;
    title: String;
    desc: String;
    list: IList,
    expiry_date: Date,
    tags: ITag[],
    sub_tasks: ISubTask[],
    created_date: Date,
    completed: Boolean,
    completed_date?: Date;
}

export interface ICreateTask {
    _id?: string;
    title: String;
    desc: String;
    list: string,
    tags: string[],
    sub_tasks: ISubTask[],
    created_date: Date,
    completed: Boolean,
    completed_date?: Date;
    expiry_date: Date,
}