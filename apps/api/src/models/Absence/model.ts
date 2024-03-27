import { cache, enableCache, sequelize } from '@db'
import { DataTypes } from 'sequelize'
import { AbsenceTypeModel } from '../AbsenceType'
import { DiaryUserModel } from '../DiaryUser'
import { ScheduleModel } from '../Schedule'
import { IModelPrototype } from '../types'

export type AbsenceModelType = {
  id: number
  absenceTypeId: number
  scheduleId: number
  diaryUserId: number
}

export type IAbsenceModel = IModelPrototype<AbsenceModelType, 'id'>

const absenceModel = sequelize.define<IAbsenceModel>('absence', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  absenceTypeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: AbsenceTypeModel
    }
  },
  scheduleId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: ScheduleModel
    }
  },
  diaryUserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: DiaryUserModel
    }
  }
})

export const AbsenceModel = enableCache
  ? cache.init<IAbsenceModel>(absenceModel)
  : absenceModel