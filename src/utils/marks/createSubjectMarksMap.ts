import { AbsenceType, PerformanceCurrent, TextMark } from 'diary-shared'

export interface SubjectMarksMap {
  [subjectName: string]: {
    date: string
    marks: TextMark[]
    absenceType?: AbsenceType
  }[]
}

/**
 * Функция createSubjectMarksMap предназначена для создания карты (коллекции) оценок по предметам.
 * Принимает объект marksForSubject, содержащий информацию об оценках и пропусках по предметам.
 *
 * @param {PerformanceCurrent} marksForSubject - Объект с информацией об оценках и пропусках по предметам.
 * @returns {SubjectMarksMap} - Возвращает объект, в котором ключами являются названия предметов,
 * а значениями - массивы объектов с данными оценок, отметок и типов пропусков по соответствующему предмету.
 *
 * Пример получаемых данных:
 * daysWithMarksForSubject: [
 *     {
 *       subjectName: "Элементы высшей математики",
 *       daysWithMarks: [
 *         {
 *           day: "2023-09-06T00:00:00.0000000",
 *           markValues: ["Five", "Five"],
 *         },
 *         {
 *           day: "2023-06-06T00:00:00.0000000",
 *           markValues: ["Five", "Five"],
 *         }
 *       ],
 *       averageMark: "Five"
 *     },
 *     {
 *       subjectName: "Физическая культура",
 *       daysWithMarks: [
 *         {
 *           day: "2023-07-09T00:00:00.0000000",
 *           markValues: ["Five"],
 *         }
 *       ],
 *       averageMark: "Five"
 *     }
 * ]
 *
 * Пример ожидаемых преобразованных данных:
 *  "Элементы высшей математики": [
 *     {
 *       date: "06.09.2023",
 *       marks: ["Five", "Five"],
 *       absenceType: undefined // Если не опоздал и был на паре
 *     },
 *     {
 *       date: "09.09.2023",
 *       marks: ["Five", "Five"],
 *       absenceType: undefined // Если не опоздал и был на паре
 *     }
 *   ],
 *   "Физическая культура": [
 *     {
 *       date: "07.09.2023",
 *       marks: ["Five"],
 *       absenceType: undefined // Если не опоздал и был на паре
 *     }
 *   ]
 */

export const createSubjectMarksMap = (
  marksForSubject: PerformanceCurrent
): SubjectMarksMap => {
  const subjectMarksMap: SubjectMarksMap = {}

  marksForSubject.daysWithMarksForSubject.forEach((subject) => {
    const { subjectName, daysWithMarks } = subject

    if (!subjectMarksMap[subjectName]) {
      subjectMarksMap[subjectName] = []
    }

    subjectMarksMap[subjectName].push(
      ...(daysWithMarks?.map((dayWithMark) => ({
        date: new Date(dayWithMark.day).toLocaleDateString(),
        marks: dayWithMark.markValues,
        absenceType: dayWithMark.absenceType,
      })) ?? [])
    )
  })

  return subjectMarksMap
}