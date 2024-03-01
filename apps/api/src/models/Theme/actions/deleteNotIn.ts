import { Op } from "sequelize";
import { ThemeModel } from "../model";

export const deleteThemesNotIn = async (themes: string[], scheduleId: number) => ThemeModel.destroy({
    where: {
        [Op.and]: [
            {
                scheduleId
            },
            {
                description: {
                    [Op.notIn] : themes
                }
            }
        ]
    }
})