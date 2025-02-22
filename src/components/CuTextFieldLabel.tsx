import { InputLabel, SxProps } from '@mui/material'
import React from 'react'

// mui와 관련된 prop을 넣을 수 있도록 mui prop을 추가하였습니다.
const CuTextFieldLabel = ({
  children,
  htmlFor,
  style,
  muiProps,
}: {
  children: React.ReactNode
  htmlFor: string
  style?: SxProps
  muiProps?: any
}) => {
  return (
    <InputLabel sx={style} htmlFor={htmlFor} {...muiProps}>
      {children}
    </InputLabel>
  )
}

export default CuTextFieldLabel
