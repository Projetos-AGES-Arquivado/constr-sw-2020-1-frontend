export interface Lesson {
    id: string,
    date: string,
    description: string,
    class_id: {
        id: string
    },
    createdAt: string,
    updatedAt: string,
}