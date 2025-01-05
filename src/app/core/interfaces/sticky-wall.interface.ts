
export interface IStickyWall {
    _id?:string,
    title: string;
    desc: string;
    color:string;
    expiry_date?: Date,
    created_date: Date,
    completed: Boolean,
    completed_date?: Date;
}