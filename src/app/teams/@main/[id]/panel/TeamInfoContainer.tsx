// import useSWR from 'swr'
import { Stack, Box, Typography } from '@mui/material'
// import { defaultGetFetcher } from '@/api/fetchers'
import {
  ITeamInfo,
  //   TOperationForm,
  //   TTeamType,
  TTeamStatus,
} from '@/types/ITeamInfo'

interface ITeamInfoContainerProps {
  id: number
}

const defaultLogoPath = '/images/profile.jpeg' // TODO : 기본 로고 path 확인하기

interface IStatusIconProps {
  status: TTeamStatus
}

const StatusIcon = ({ status }: IStatusIconProps) => {
  switch (status) {
    case 'RECRUITING':
      return <div>모집중</div>
    default:
      return <div>아아아</div>
  }
}

const TeamInfoContainer = ({ id }: ITeamInfoContainerProps) => {
  // TODO : id를 이용해서 데이터 받아오기
  //   const { data, error, isLoading } = useSWR<ITeamInfo>(
  //     `${process.env.NEXT_PUBLIC_API_URL}/api/v1/team/main/${id}`,
  //     defaultGetFetcher,
  //   )
  const {
    data,
    error,
    isLoading,
  }: { data: ITeamInfo; error: any; isLoading: boolean } = {
    data: {
      id: id,
      name: '프로젝트 스페이스도그 🐶🚀',
      teamPicturePath: null,
      status: 'RECRUITING',
      memberCount: '1/3',
      leaderName: '야채',
      type: 'STUDY',
      dueTo: 12,
      operationForm: 'ONLINE',
      region: ['서울', '인천'],
    },
    error: false,
    isLoading: false,
  }

  // render 1 : 로딩중
  if (isLoading) {
    // 로딩 컴포넌트 구체화
    return <div>로딩중</div>
  }
  // render 2 : 에러
  if (error || !data) {
    // 에러 컴포넌트 구체화
    // 에러 알림?!
    return <div>에러!</div>
  }
  // render 3 : 정상
  return (
    <Stack>
      <Typography>{data.name}</Typography>
      <Box
        component="img"
        src={data.teamPicturePath ? data.teamPicturePath : defaultLogoPath}
      />
      <StatusIcon status={data.status} />
      <Typography>{data.memberCount}</Typography>
      <Typography>{data.leaderName}</Typography>
      <Typography>{data.type}</Typography>
      <Typography>{data.dueTo}</Typography>
      <Typography>{data.operationForm}</Typography>
      <Typography>{data.region}</Typography>
    </Stack>
  )

  // 모달 컴포넌트도 추가할 것.
}

export default TeamInfoContainer
