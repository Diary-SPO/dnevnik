import { AcademicRecord, Nullable } from '@diary-spo/shared'
import { Group, Placeholder } from '@vkontakte/vkui'
import { FunctionalComponent } from 'preact'
import { StateUpdater, useEffect, useState } from 'preact/hooks'

import { getFinalMarks } from '@api'
import { THIRD_SEC } from '@config'
import { useRateLimitExceeded } from '@hooks'
import { handleResponse, isApiError } from '@utils'

import { Table } from './Table'

import './index.css'

interface Props {
  setIsError: StateUpdater<boolean>
  setIsLoading: StateUpdater<boolean>
  isLoading: boolean
}

const FinalMarks: FunctionalComponent<Props> = ({
  setIsError,
  setIsLoading,
  isLoading
}) => {
  const [finalMarksData, setFinalMarksData] =
    useState<Nullable<AcademicRecord>>(null)

  useEffect(() => {
    const data = localStorage.getItem('finalMarksData')
    const lastFetchingTime = localStorage.getItem('finalMarksData_time')

    if (data && Date.now() - Number(lastFetchingTime) <= THIRD_SEC) {
      setFinalMarksData(JSON.parse(data))
      return
    }

    const fetchData = async () => {
      setIsLoading(true)
      setIsError(false)
      try {
        const finalMarks = await getFinalMarks()

        handleResponse(
          finalMarks,
          () => setIsError(true),
          useRateLimitExceeded,
          setIsLoading
        )

        if (isApiError(finalMarks)) {
          setIsError(true)
          return
        }

        setFinalMarksData(finalMarks)
        localStorage.setItem('finalMarksData', JSON.stringify(finalMarks))
        localStorage.setItem('finalMarksData_time', JSON.stringify(Date.now()))
      } catch {
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  if (isLoading) {
    return
  }

  if (!isLoading && !finalMarksData?.subjects?.length) {
    return <Placeholder>Данных нет</Placeholder>
  }

  return (
    <Group className='tableWrapper'>
      <Table data={finalMarksData} />
    </Group>
  )
}

export default FinalMarks
