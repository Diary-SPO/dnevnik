import { Elysia } from 'elysia'

import ads from './ads'
import attestation from './attestation'
import finalMarks from './finalMarks'
import hello from './hello'
import lessons from './lessons'
import login from './login'
import organization from './organization'
import performanceCurrent from './performance.current'
import oauthGitHub from './admin/oauth/github'

import { headersSchema } from '@utils'
import { errorHandler } from './helpers'
import { isValidToken, isAdmin } from '../middlewares'

export const routes = new Elysia()
  /** Роуты с проверкой на наличие secret поля **/
  .guard(
    {
      beforeHandle: headersSchema,
      beforeHandle: isValidToken
    },
    (app) =>
      app
        .use(organization)
        .use(lessons)
        .use(performanceCurrent)
        .use(attestation)
        .use(ads)
        .use(finalMarks)
  )
  /** Роуты без проверки **/
  .use(hello)
  .use(login)
  /** Обработка любых ошибок в кажом роуте **/
  .onError(errorHandler)

export const adminRoutes = new Elysia()
  .guard(
    {
      beforeHandle: headersSchema,
      beforeHandle: isAdmin
    },
    (app) => app.use(oauthGitHub)
  )
  /** Обработка любых ошибок в кажом роуте **/
  .onError(errorHandler)
