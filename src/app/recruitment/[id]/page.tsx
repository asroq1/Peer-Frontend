'use client'

import { Box, Typography, Button, Stack, Chip } from "@mui/material"
import { IPostDetail } from "@/types/IPostDetail"
import LinkIcon from "@mui/icons-material/Link";
import Image from "next/image";
import React from "react";
import RecruitFormModal from "./panel/RecruitFormModal";

//이후 ssr 개선 필요

const RecruitDetailPage = ({ params }: { params: { id: string } }) => {
    const [open, setOpen] = React.useState(false);
    const [type, setType] = React.useState<string>("");
    //id에 따라 값 가져오기
    // const { data, isLoading, mutate } = useSWR(
    //     `${process.env.NEXT_PUBLIC_API_URL}api/v1/recruit/${params.id}`,
    //     defaultGetFetcher,
    // )

    const data: IPostDetail = {
        title: "Software Engineer Position",
        status: "모집중",
        due: "1개월",
        content: "We are looking for a skilled software engineer to join our team...",
        user_id: "user123", // 사용자 ID의 데이터 타입에 따라 변경
        region: "Seoul, South Korea",
        link: "https://example.com/job-posting",
        tag: ["JavaScript", "React", "Node.js"],
        schedule: ["mon", "tue"],
        role: [
            { roleName: "프론트", number: 3 },
            { roleName: "백엔드", number: 1 },
        ],
        interviewList: [
            { question: "Tell us about your experience with React.", type: "text", optionList: [] },
            { question: "How would you handle a project with tight deadlines?", type: "multiple-choice", optionList: ["Prioritize tasks", "Delegate", "Work overtime"] },
        ],
    };

    const userData = {
        nickname: "user123",
        profileUrl: "https://picsum.photos/100/100"
    }

    return (
        <>
            <RecruitFormModal open={open} setOpen={setOpen} post_id={params.id} type={type} />
            <Typography variant="h3">모집 글</Typography>
            <Box>
                <Typography variant="h6">팀 제목</Typography>
                <Typography>{data?.title}</Typography>
            </Box>
            <Box>
                <Typography variant="h6">팀 상태</Typography>
                <Chip label={data?.status} size="medium" />
            </Box>
            <Box>
                <Typography variant="h6">리더 프로필</Typography>
                <Image
                    src={userData?.profileUrl}
                    alt="leader_profile"
                    width={100}
                    height={100}
                />
            </Box>
            <Box>
                <Typography variant="h6">리더 닉네임</Typography>
                <Typography>{userData?.nickname}</Typography>
            </Box>
            {/*<Box>*/}
            {/*    <Typography variant="h6">팀 인원</Typography>*/}
            {/*    <Typography>{data?.title}</Typography>*/}
            {/*</Box>*/}
            <Box>
                <Typography variant="h6">목표기간</Typography>
                <Typography>{data?.due}</Typography>
            </Box>
            <Box>
                <Typography variant="h6">지역</Typography>
                <Typography>{data?.region}</Typography>
            </Box>
            <Box>
                <Typography variant="h6">커뮤니케이션 툴 링크</Typography>
                <Stack>
                    <LinkIcon
                        sx={{
                            width: '45px',
                            height: '45px',
                            paddingRight: '6px',
                        }}
                    />
                    <Typography>{data?.link}</Typography>
                </Stack>
            </Box>
            {/*추후에 태그리스트도 따로 컴포넌트로 만들면 좋을듯*/}
            <Box>
                <Typography variant="h6">태그</Typography>
                <Box>
                    {data?.tag?.map((tag: string, idx: number) => (
                        <Chip label={tag} size="small" key={idx} />
                    ))}
                </Box>
            </Box>
            <Box>
                <Typography variant="h6">팀 활동 요일</Typography>
                {
                    data?.schedule?.map((v, index) => (
                        <Typography key={index}>{data?.region}</Typography>
                    ))
                }
            </Box>
            <Typography variant="h6">팀 역할</Typography>
            {
                data?.role?.map((v, index) => (
                    <Stack key={index} direction={"row"}>
                        <Typography>{v.roleName}</Typography>
                        <Typography>{v?.number}</Typography>
                        <Button variant="contained" color="success" onClick={() => { setOpen(true); setType(v.roleName) }}>
                            지원 하기
                        </Button>
                    </Stack>
                ))
            }
            <Box>
                <Typography variant="h6">팀 소개</Typography>
                <Typography>{data?.content}</Typography>
            </Box>
        </>
    )
}

export default RecruitDetailPage;