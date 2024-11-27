import { buildMessageByEvent } from '../../messages'
import type { MarkEvent } from '../../types/MarkEvent'
import { bot } from '../botLogic'
import { getDetailedInfo } from './helpers/getDetailedInfo'
import { getSubscribeInfo } from './helpers/getSubscribeInfo'

export const sendMarkEvent = async (event: MarkEvent) => {
  const subscribe = await getSubscribeInfo(event)

  if (!subscribe) return

  const detailedInfo = await getDetailedInfo(event)

  if (!detailedInfo) return

  const message = buildMessageByEvent(detailedInfo)

  if (!bot || !message) return

  bot.sendMessage(String(subscribe.tgId), message)
}