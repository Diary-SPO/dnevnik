import fs from 'fs'
import { PARAMS_INIT } from './params'
import checkEnvVariables from './utils'
import { getTimezone } from './getTimeZone'

if (!fs.existsSync('.env')) {
  throw new Error(
    'Configuration file ".env" not found. Read README for instructions on how to create.'
  )
}

checkEnvVariables(PARAMS_INIT)

PARAMS_INIT.TIMEZONE = getTimezone(
  PARAMS_INIT.TIMEZONE === '0' ? null : PARAMS_INIT.TIMEZONE
)

export const {
  SERVER_URL,
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_NAME,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  ENCRYPT_KEY,
  TIMEZONE
} = PARAMS_INIT

export * from './types'
export * from './env'
export * from './constants'
export * from './utils'
