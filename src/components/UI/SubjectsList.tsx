import {
  Card,
  CardGrid,
  Div,
  Group,
  Header,
  InfoRow,
  Spinner,
  Subhead,
  Title,
} from '@vkontakte/vkui'
import { ExaminationType, Examinations } from 'diary-shared'
import { FunctionalComponent } from 'preact'

export interface Subject {
  id: string
  name: string
  examinationType: ExaminationType
  marks: Record<string, Record<string, string>>
}

interface SubjectListProps {
  semesters?: Record<string, Subject[]>
  studentName?: string | null
  year?: number | null
  isDataLoading: boolean
}

const SubjectList: FunctionalComponent<SubjectListProps> = ({
  semesters,
  studentName,
  year,
  isDataLoading,
}) => (
  <div>
    {isDataLoading && (
      <Group header={<Header mode="tertiary">Загрузка...</Header>}>
        <Div>
          <Spinner />
        </Div>
      </Group>
    )}
    {Object.keys(semesters).map((semesterKey) => (
      <Group
        key={semesterKey}
        header={
          <Header
            style={{ alignItems: 'center' }}
            mode="tertiary"
            aside={`${studentName}, ${year}`}
          >
            {semesterKey}
          </Header>
        }
      >
        {semesters[semesterKey].map((subject) => (
          <CardGrid key={subject.id} size="l">
            <Card mode="shadow">
              <Div>
                {/*//@ts-ignore типы React не совсем совместимы с Preact*/}
                <Title level="3">{subject.name}</Title>
                <InfoRow header="Тип аттестации">
                  {/*//@ts-ignore типы React не совсем совместимы с Preact*/}
                  <Subhead>{Examinations[subject.examinationType]}</Subhead>
                </InfoRow>
                <InfoRow header="Оценки">
                  {/*//@ts-ignore типы React не совсем совместимы с Preact*/}
                  <Subhead>
                    {subject.marks[subject.id] &&
                    Object.keys(subject.marks[subject.id]).length > 0
                      ? Object.keys(subject.marks[subject.id]).map(
                          (studentId) => (
                            <span key={studentId}>
                              {subject.marks[subject.id][studentId]}
                            </span>
                          )
                        )
                      : 'Оценок нет'}
                  </Subhead>
                </InfoRow>
              </Div>
            </Card>
          </CardGrid>
        ))}
      </Group>
    ))}
  </div>
)

export default SubjectList
