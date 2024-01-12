'use client'

import { Button, Card, Stack, Typography } from '@mui/material'
// import SetupPage from './panel/SetupTeam'
import { useEffect, useState } from 'react'
import SetupMember from './panel/SetupMember'
import ApplicantList from './panel/ApplicantList'
import useSWR from 'swr'
import useAxiosWithAuth from '@/api/config'
import { ITeam, TeamType } from '../../types/types'
import RedirectionRecruit from './panel/RedirectionRecruit'
import TeamJobAdd from './panel/TeamJobAdd'
import SetupInfo from './panel/SetupInfo'
import { socket } from '@/app/panel/MainPage'

const TeamsSetupPage = ({ params }: { params: { id: string } }) => {
  const axiosWithAuth = useAxiosWithAuth()
  const [showApplicant, setShowApplicant] = useState<boolean>(false)
  const { data, isLoading } = useSWR<ITeam>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/team/setting/${params.id}`,
    (url: string) => axiosWithAuth(url).then((res) => res.data),
  )

  const openApplicant = () => setShowApplicant(true)
  const closeApplicant = () => setShowApplicant(false)

  useEffect(() => {
    socket.emit(
      'whoAmI',
      {
        teamId: params.id,
        teamName: data?.team.name,
      },
      (data: any) => {
        console.log(data)
      },
    )
  }, [])

  if (isLoading) return <Typography>로딩중</Typography>

  return (
    <Stack
      margin={4}
      spacing={2}
      direction={'column'}
      borderRadius={2}
      padding={2}
      width={'93%'}
    >
      <Typography>설정</Typography>
      {data ? (
        <>
          <RedirectionRecruit id={params.id} data={data} />
          <SetupInfo team={data.team} />
          {data.team.type === TeamType.PROJECT && (
            <TeamJobAdd teamId={params.id} jobList={data.job} />
          )}
          {!showApplicant ? (
            <Card
              sx={{
                borderRadius: '1rem',
                p: '1.5rem',
                height: '20rem',
              }}
            >
              <Stack
                direction={'row'}
                justifyContent={'space-between'}
                alignItems={'center'}
                mb={3}
              >
                <Typography fontWeight="bold">팀원 목록</Typography>

                <Button
                  onClick={openApplicant}
                  sx={{ width: '9rem' }}
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  신청 대기자 보기
                </Button>
              </Stack>
              <SetupMember
                team={data.member}
                teamId={data.team.id}
                jobs={data.job}
              />
            </Card>
          ) : (
            <ApplicantList close={closeApplicant} teamId={data.team.id} />
          )}
        </>
      ) : (
        <>
          <Typography>데이터가 없습니다.</Typography>
        </>
      )}
    </Stack>
  )
}

export default TeamsSetupPage
