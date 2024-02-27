import {  sequelize } from '@db'
import { DataTypes } from 'sequelize'
import { MarkValueModel } from '../MarkValue'
import { SubjectModel } from '../Subject'
import { IModelPrototypeNoId } from '../types'
import { DiaryUserModel } from '../DiaryUser'

export type FinalMarkModelType = {
  subjectId: number
  diaryUserId: number
  markValueId: number
}

export type IFinalMarkModel = IModelPrototypeNoId<FinalMarkModelType>

export const FinalMarkModel = sequelize.define<IFinalMarkModel>(
  'finalMark',
  {
    subjectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: SubjectModel,
        key: 'id'
      }
    },
    diaryUserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: DiaryUserModel,
        key: 'id'
      }
    },
    markValueId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: MarkValueModel,
        key: 'id'
      }
    }
  },
  {
    freezeTableName: true,
    timestamps: false,
    createdAt: false,
    updatedAt: false
  }
)