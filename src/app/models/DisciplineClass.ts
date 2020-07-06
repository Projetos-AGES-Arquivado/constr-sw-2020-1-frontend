export interface DisciplineClass {
    id: string,
    number: number,
    timeSchedule: string,
    teacher: string,
    course: {
        name: string,
        id: string
    },
    createdAt: string,
    updatedAt: string,
}