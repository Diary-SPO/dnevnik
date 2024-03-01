import { Avatar, Group, Header, Link, SimpleCell } from '@vkontakte/vkui'
import { Icon28Users } from '@vkontakte/icons'
import { diaryAva, winxAva } from '../../images/config.ts'

const Contacts = () => {
  return (
    <Group header={<Header mode='tertiary'>Контакты</Header>}>
      {/*// @ts-ignore Типы не совместимы */}
      <SimpleCell
        before={
          // @ts-ignore Типы не совместимы
          <Avatar size={48} fallbackIcon={<Icon28Users />} src={winxAva} />
        }
        subtitle='Наша группа | Любые вопросы'
      >
        {/*// @ts-ignore Типы не совместимы */}
        <Link target='_blank' href='https://vk.com/diary_spo'>
          Дневник СПО
        </Link>
      </SimpleCell>
      {/*// @ts-ignore Типы не совместимы */}
      <SimpleCell
        before={
          // @ts-ignore Типы не совместимы
          <Avatar size={48} fallbackIcon={<Icon28Users />} src={diaryAva} />
        }
        subtitle='Исходный код на GitHub'
      >
        {/*// @ts-ignore Типы не совместимы */}
        <Link target='_blank' href='https://github.com/Diary-SPO'>
          Diary SPO
        </Link>
      </SimpleCell>
    </Group>
  )
}

export default Contacts