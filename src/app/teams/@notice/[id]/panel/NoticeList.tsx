import { ReactNode, useEffect } from 'react'
import Link from 'next/link'
import { Stack, Typography } from '@mui/material'

interface NoticeItemProps {
  title: string
  author: string
  date: string
  id: number
  teamId: number
}

const NoticeListContainer = ({ children }: { children: ReactNode }) => {
  return <Stack spacing={3}>{children}</Stack>
}

const NoticeItem = ({ title, author, date, id, teamId }: NoticeItemProps) => {
  return (
    <Link href={`/teams/${teamId}/notice/${id}`}>
      <Stack>
        <Typography variant={'Body1'}>{title}</Typography>
      </Stack>
      <Stack direction={'row'} alignItems={'center'}>
        <Typography variant={'Body2'}>{author}</Typography>
        <Typography variant={'Caption'}>{date}</Typography>
      </Stack>
    </Link>
  )
}

const NoticeList = ({
  teamId,
  keyword,
}: {
  teamId: number
  keyword: string
}) => {
  // TODO : 공지사항 목록 받아오기
  // TODO : 무한스크롤 OR 페이지네이션
  const dummy = {
    data: [
      {
        title:
          '11월 첫째주 주간회의 기록입니다. 11월 첫째주 주간회의 기록입니다.',
        author: 'jeyoon',
        date: '11월 4일',
        id: 1,
      },
      {
        title:
          '11월 첫째주 주간회의 기록입니다. 11월 첫째주 주간회의 기록입니다.11월 첫째주 주간회의 기록입니다. 11월 첫째주 주간회의 기록입니다.11월 첫째주 주간회의 기록입니다. 11월 첫째주 주간회의 기록입니다.',
        author: 'jeyoon',
        date: '11월 4일',
        id: 2,
      },
    ],
    loading: false,
    error: null,
  }
  const { data, loading, error } = dummy

  // 검색 테스트용
  useEffect(() => {
    if (keyword === '') alert('전체보기!')
    else alert(keyword + ' 검색하기!')
  }, [keyword])

  if (error || !data)
    return (
      <NoticeListContainer>
        <Typography>문제가 발생했습니다.</Typography>
      </NoticeListContainer>
    )
  if (loading)
    return (
      <NoticeListContainer>
        <Typography>로딩중입니다...</Typography>
      </NoticeListContainer>
    )
  if (data.length === 0)
    return (
      <NoticeListContainer>
        <Typography>공지사항이 없습니다.</Typography>
      </NoticeListContainer>
    )
  return (
    <NoticeListContainer>
      {data.map((notice) => (
        <NoticeItem
          key={notice.id}
          title={notice.title}
          author={notice.author}
          date={notice.date}
          id={notice.id}
          teamId={teamId}
        />
      ))}
    </NoticeListContainer>
  )
}

export default NoticeList
