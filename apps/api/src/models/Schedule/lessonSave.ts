import { Lesson } from '@diary-spo/shared'
import {saveClassroom} from "../Classroom";
import { ScheduleModel } from './model'
import {IUserInfo} from "../DiaryUser";
import {subjectSaveOrGet} from "../Subject/subjectSaveOrGet";

export const LessonSave = async (
    lesson: Lesson,
    user: IUserInfo,
    date: Date
) => {
    if (Object.keys(lesson).length <= 2) {
        return
    }

    // Забираю переменные
    const splitName = lesson.name ? lesson.name.split('/') : null
    const subgroup =
        splitName && splitName.length > 1 ? splitName[splitName.length - 1] : null
    const cr = lesson.timetable.classroom
    const tr = lesson.timetable.teacher

    // Сохраняю в БД
    const subjectId = lesson.name
        ? (await subjectSaveOrGet(lesson.name)).id
        : null // subjectId
    const classroomId =
        (
            await saveClassroom({
                name: cr.name,
                spoId: user.group.spoId,
                building: cr.building,
                idFromDiary: cr.id
            })
        )?.id ?? null
    const teacherId = tr
        ? (
            await TeacherSaveOrGet({
                lastName: tr.lastName,
                firstName: tr.firstName,
                middleName: tr.middleName,
                idFromDiary: tr.id,
                spoId: user.group.spoId
            })
        ).id
        : null

    const groupId = user.group.id
    const subgroupId = subgroup
        ? (
            await SubgroupSaveOrGet({
                groupId: user.group.id,
                name: subgroup
            })
        ).id
        : null

    // TODO: Удалять в воркере не привязанные градебуки, либо как-то обрабатывать
    let gradebookId = null
    if (lesson.gradebook) {
        gradebookId = GradebookSaveOrGet(lesson.gradebook, user).catch((err) => {
            throw new Error(
                `[${new Date().toISOString()}] => Ошибка сохранения в функции GradebookSaveOrGet(). Подробнее:`,
                err
            )
        })
        gradebookId = (await gradebookId).id
    }

    const scheduleWhere = {
        groupId,
        teacherId,
        subjectId,
        classroomId,
        date: new Date(date).toUTCString(), // Т.к. БД обрабатывает даты и приводит к формату гггг-мм-дд, то на вход нужно обработать также
        startTime: lesson.startTime,
        endTime: lesson.endTime
    }

    let schedule = await ScheduleModel.findOne({
        where: {
            ...scheduleWhere
        }
    })

    try {
        if (!schedule) {
            schedule = await ScheduleModel.create({
                ...scheduleWhere,
                gradebookId
            })
        }
    } catch (err) {
        console.error(
            `[${new Date().toUTCString()}] => Ошибка сохранения schedule. Входные данные: ${JSON.stringify(
                { ...scheduleWhere, gradebookId }
            )}. Подробнее:`,
            err
        )
    }

    if (subgroupId && schedule) {
        await ScheduleSubgroupSafeSave(schedule.id, user.id, subgroupId)
    }
}