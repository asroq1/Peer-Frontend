import React from 'react'
import MessageForm from '../MessageForm'
import useMedia from '@/hook/useMedia'

const MessageViewPage = () => {
  const { isPc } = useMedia()

  return (
    <>
      <MessageForm type={'existingMessage'} nickname={undefined} isPc={isPc} />
    </>
  )
}

export default MessageViewPage
