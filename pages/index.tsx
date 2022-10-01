import type { NextPage } from 'next'
import {Box, Button, Heading, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Stack, Text, useDisclosure} from '@chakra-ui/react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useState } from 'react'
import Section from '../src/Section'

const Home: NextPage = () => {
  return (
    <Box display="flex" justifyContent="space-between" p={40}>
      {/* 박스의 디스플레이 = 반응형 / 박스 사이 패딩 20 */}
      <Section title="어제 한 일" />
      {/* 첫번째 박스의 제목 */}
      <Box w={18} />
      <Section title="오늘 할 일" />
      <Box w={18} />
      <Section title="내일 할 일" />
    </Box>
  )
}

export default Home
