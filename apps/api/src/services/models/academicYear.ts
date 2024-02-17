import { sequelize } from '@db'
import { DataTypes } from 'sequelize'
import { GroupModel } from './group'
import { TermTypeModel } from './termType'
import { IModelPrototype } from './types'

export type AcademicYearModelType = {
  id: number
  termTypeId: number
  number: number
  groupId: number
  idFromDiary: number
}

export type IAcademicYearModel = IModelPrototype<AcademicYearModelType, 'id'>

export const AcademicYearModel = sequelize.define<IAcademicYearModel>(
  'academicYear',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    termTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: TermTypeModel,
        key: 'id'
      }
    },
    number: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: GroupModel,
        key: 'id'
      }
    },
    idFromDiary: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    freezeTableName: true,
    timestamps: false,
    createdAt: false,
    updatedAt: false
  }
)
