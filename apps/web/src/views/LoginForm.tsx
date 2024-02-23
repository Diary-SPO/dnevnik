import { PanelHeaderWithBack } from '@components'
import { VKUI_RED } from '@config'
import { ResponseLogin } from '@diary-spo/types'
import { useSnackbar } from '@hooks'
import { Hashes } from '@libs'
import { handleResponse } from '@utils'
import {
  Icon28DoorArrowLeftOutline,
  Icon28ErrorCircleOutline
} from '@vkontakte/icons'
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router'
import {
  Button,
  FormItem,
  FormStatus,
  Group,
  Input,
  Panel
} from '@vkontakte/vkui'
import { ChangeEvent, FC } from 'preact/compat'
import { useEffect, useState } from 'preact/hooks'
import { VIEW_SCHEDULE } from '../routes'
import { loginPattern } from '@types'
import { Props } from './types.ts'
import { postLogin } from '../methods'

const LoginForm: FC<Props> = ({ id }) => {
  const routeNavigator = useRouteNavigator()

  const [login, setLogin] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [isDataInvalid, setIsDataInvalid] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [snackbar, showSnackbar] = useSnackbar()

  useEffect(() => {
    const getUserCookie = async () => {
      const storageToken = localStorage.getItem('token')

      if (!storageToken) {
        showSnackbar({
          before: <Icon28ErrorCircleOutline fill={VKUI_RED} />,
          subtitle: 'Заполни форму и войди в дневник',
          title: 'О вас нет данных, ты кто такой?'
        })
      }
    }

    getUserCookie()
  }, [])

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget

    const setStateAction = {
      login: setLogin,
      password: setPassword
    }[name]
    setIsDataInvalid(false)
    setIsLoading(false)

    setStateAction?.(value)
  }

  const handleLogin = async (e: ChangeEvent<HTMLFormElement>) => {
    setIsLoading(true)

    e.preventDefault()
    if (!loginPattern.test(login)) {
      setIsDataInvalid(true)
      setIsLoading(false)
      return
    }

    const passwordHashed = await Hashes.SHA256.b64(password)

    const response = postLogin(login, passwordHashed, true)

    const data = await handleResponse(
      response,
      () => setIsDataInvalid(true),
      undefined,
      setIsLoading,
      showSnackbar,
      false,
      true
    )

    if (data instanceof Response || !data.token) {
      return
    }

    saveData(data)

    showSnackbar({
      title: 'Вхожу',
      subtitle: 'Подождите немного'
    })

    await routeNavigator.replace(`/${VIEW_SCHEDULE}`)
  }

  const isLoginEmpty = login === ''
  const isPasswordEmpty = password === ''
  const isPasswordValid = password && !isPasswordEmpty

  const loginTopText = isLoginEmpty
    ? 'Логин'
    : loginPattern.test(login)
      ? 'Логин введён'
      : 'Введите корректный логин'
  const passwordTopText =
    password === ''
      ? 'Пароль'
      : isPasswordValid
        ? 'Пароль введён'
        : 'Введите корректный пароль'

  const Banner = isDataInvalid ? (
    <FormStatus header='Некорректные данные' mode='error'>
      Проверьте правильность логина и пароля
    </FormStatus>
  ) : (
    <FormStatus header='Нам можно доверять' mode='default'>
      Мы бережно передаем ваши данные и храним в зашифрованном виде
    </FormStatus>
  )
  const status = isLoginEmpty
    ? 'default'
    : loginPattern.test(login)
      ? 'valid'
      : 'error'
  const isDisabled =
    !password || !login || !loginPattern.test(login) || isLoading

  return (
    <Panel nav={id}>
      <PanelHeaderWithBack title='Авторизация' />
      <Group>
        {Banner}
        <form method='post' onSubmit={handleLogin}>
          {/*//@ts-ignore типы React не совсем совместимы с Preact*/}
          <FormItem
            required
            htmlFor='userLogin'
            top='Логин'
            status={status}
            bottom={isLoginEmpty || loginTopText}
            bottomId='login-type'
          >
            <Input
              //@ts-ignore типы React не совсем совместимы с Preact
              required
              aria-labelledby='login-type'
              id='userLogin'
              type='text'
              name='login'
              placeholder='Введите логин'
              value={login}
              onChange={onChange}
            />
          </FormItem>
          {/*//@ts-ignore типы React не совсем совместимы с Preact*/}
          <FormItem
            top='Пароль'
            htmlFor='pass'
            status={
              isPasswordEmpty ? 'default' : isPasswordValid ? 'valid' : 'error'
            }
            bottom={isPasswordEmpty || passwordTopText}
          >
            <Input
              //@ts-ignore типы React не совсем совместимы с Preact
              name='password'
              id='pass'
              type='password'
              placeholder='Введите пароль'
              onChange={onChange}
            />
          </FormItem>
          {/*//@ts-ignore типы React не совсем совместимы с Preact*/}
          <FormItem>
            {/*//@ts-ignore типы React не совсем совместимы с Preact*/}
            <Button
              type='submit'
              size='l'
              stretched
              onClick={handleLogin}
              disabled={isDisabled}
              before={<Icon28DoorArrowLeftOutline />}
            >
              {isLoading ? 'Пытаюсь войти...' : 'Войти'}
            </Button>
          </FormItem>
        </form>
        {snackbar}
      </Group>
    </Panel>
  )
}

const saveData = (basePath: ResponseLogin) => {
  const userId = String(basePath.id)
  const token = basePath.token
  const name = `${String(basePath.lastName)} ${String(
    basePath.firstName
  )} ${String(basePath.middleName)}`
  const org = String(basePath.organization?.abbreviation)
  const city = String(basePath.organization?.addressSettlement)
  const group = String(basePath?.groupName)

  localStorage.setItem('id', userId)
  localStorage.setItem('token', token)

  const userData = {
    name,
    org,
    city,
    group
  }

  localStorage.setItem('data', JSON.stringify(userData))
}

export default LoginForm
