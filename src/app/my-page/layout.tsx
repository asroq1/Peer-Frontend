import { Box, Container, Stack } from '@mui/material'
import React from 'react'
import NavBar from './panel/NavBar'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container sx={{ maxWidth: '124rem', padding: 0 }}>
      <Stack
        justifyContent={'space-between'}
        width={1}
        maxWidth={1280}
        direction={'row'}
        sx={{ flex: '3, 4' }}
      >
        <NavBar />
        <Box
          sx={{
            maxWidth: '57rem',
          }}
          flexGrow={1}
          p={[2, 4]}
        >
          {children}
        </Box>
      </Stack>
    </Container>
  )
}

export default Layout
