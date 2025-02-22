'use client'

import {
  Box,
  Container,
  Typography,
  Button,
  InputAdornment,
} from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import CuTextFieldLabel from '@/components/CuTextFieldLabel'
import CuTextField from '@/components/CuTextField'

const LabelBox = {
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '8px',
  fontSize: '14px',
}

const Form = {
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '24px',
}

const SendCodeForm = ({ email }: { email: string }) => {
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<{ code: string }>()
  const [timer, setTimer] = useState(5 * 60)
  const router = useRouter()

  console.log(email)
  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1)
    }, 1000)

    return () => {
      clearInterval(countdown)
    }
  }, [])

  useEffect(() => {
    if (timer === 0) {
      alert('인증 코드가 만료되었습니다.')
      location.reload() // 페이지 새로고침
    }
  }, [timer])

  const adornment = (
    <>
      <Typography>{`${Math.floor(timer / 60)}:${(timer % 60)
        .toString()
        .padStart(2, '0')}`}</Typography>
    </>
  )

  const onSubmit = async (data: { code: string }) => {
    const codeData = JSON.stringify({ email, data })
    console.log(codeData)

    try {
      // 테스트용 post요청 코드
      const res = await axios.post(`https://localhost:8080/password_change`, {
        codeData,
      })
      console.log(res)
      // 추후 모달로 변경
      alert(
        '메일로 임시 비밀번호가 전송되었습니다. 로그인 페이지로 이동합니다.',
      )
      router.push('/login')
    } catch (error) {
      console.log(error)
      alert('인증 코드가 일치하지 않습니다.')
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={Form}>
      <Box sx={{ display: 'flex', width: '100%' }}>
        <Controller
          name="code"
          control={control}
          defaultValue=""
          rules={{
            required: '코드를 입력해주세요',
          }}
          render={({ field }) => (
            <Container sx={LabelBox}>
              <CuTextFieldLabel htmlFor="code">인증코드</CuTextFieldLabel>
              <CuTextField
                field={field}
                type="code"
                id="code"
                placeholder="이메일로 받은 코드를 입력하세요"
                style={{ width: '100%' }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">{adornment}</InputAdornment>
                  ),
                }}
              />
              {errors.code && <Typography>{errors.code.message}</Typography>}
            </Container>
          )}
        />
      </Box>
      <Button type="submit" disabled={isSubmitting}>
        임시 비밀번호 발급
      </Button>
    </Box>
  )
}

export default SendCodeForm
