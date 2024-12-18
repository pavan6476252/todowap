import { IList } from "./list.interface";
import { ITag } from "./tag.interface";

 
export interface ISubTask {
    title: String,
    completed: Boolean,
    created_date: Date,
    completed_date?: Date;
}

export interface ITask {
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