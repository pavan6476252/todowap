
export interface IStickyWall {
    title: String;
    desc: String;
    expiry_date?: Date,
    created_date: Date,
    completed: Boolean,
    completed_date?: Date;
}