import { FC } from 'react'
import { AbsenceTypes, AbsenceTypesKeys, Grade } from 'diary-shared'
import Mark from '../Mark'
import { SubjectMarksMap } from '../../../utils'

interface IMarksList {
  marks: SubjectMarksMap[string]
}

const MarksList: FC<IMarksList> = ({ marks }) => (
  <div style={{ display: 'flex' }}>
    {marks.map(({ date, marks: markValues, absenceType }) => (
      <div key={`${date}_${absenceType}`} style={{ display: 'flex' }}>
        {markValues.length > 0 && !absenceType ? (
          markValues.map((mark, k) => (
            <Mark key={k} mark={Grade[mark]} size="s" />
          ))
        ) : absenceType ? (
          <Mark size="s" mark={AbsenceTypes[absenceType] as AbsenceTypesKeys} />
        ) : null}
      </div>
    ))}
  </div>
)

export default MarksList
