import type { NextPage } from 'next'
import {Box, Button, Heading, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Stack, Text, useDisclosure} from '@chakra-ui/react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React, { useState } from 'react'
import Section from '../src/Section'

export type TaskType = {
  id: number;
  title: string;
  description: string;
}
type ContextProps = {
  tasks: TaskType[][],
  addTask(sectionIndex: number, newTask: TaskType): void,
  deleteTask(sectionIndex: number, newTask: TaskType): void,
  moveTask(beforeSectionIndex: number, afterSectionIndex: number, newTask: TaskType): void,
  swapTask(sectionIndex: number, task: TaskType, movement: number): void,
}
export const TrelloContext = React.
createContext<ContextProps>({
  tasks: [],
} as any);

const Home: NextPage = () => {
  const [tasks, setTasks] = useState<TaskType[][]>([
    [],
    [],
    [],
  ]);
  const addTask = (sectionIndex: number, newTask: TaskType) => {
    setTasks(prev => {
      return [
        ...prev.slice(0, sectionIndex),
        [newTask, ...prev[sectionIndex]],
        ...prev.slice(sectionIndex + 1),
      ]
    });
  }
  const deleteTask = (sectionIndex: number, task: TaskType) => {
    setTasks(prev => {
      const idx = prev[sectionIndex].findIndex(t => t.id === task.id);
      return [
        ...prev.slice(0, sectionIndex),
        [
          ...prev[sectionIndex].slice(0, idx),
          ...prev[sectionIndex].slice(idx + 1),
        ],
        ...prev.slice(sectionIndex + 1),
      ]
    });
  }
  const moveTask = (beforeSectionIndex: number, afterSectionIndex: number, task: TaskType) => {
    deleteTask(beforeSectionIndex, task);
    addTask(afterSectionIndex, task);
  }
  const swapTask = (sectionIndex: number, task:TaskType, movement: 1 | -1) => {
    setTasks(prev => {
      const idx = prev[sectionIndex].findIndex(t => t.id === task.id);
      const anotherIndex = idx + movement;
      return [
        ...prev.slice(0, sectionIndex),
        [
          ...prev[sectionIndex].slice(0, Math.min(idx, anotherIndex)),
          ...(movement > 0 ? [
            prev[sectionIndex][anotherIndex],
            prev[sectionIndex][idx],
          ] : [
            prev[sectionIndex][idx],
            prev[sectionIndex][anotherIndex],
          ]),
          ...prev[sectionIndex].slice(Math.max(idx, anotherIndex) + 1),
        ],
        ...prev.slice(sectionIndex + 1),
      ]
    })
  };

  return (
    <TrelloContext.Provider value={{ tasks, addTask, deleteTask, moveTask, swapTask }}>
      <Box display="flex" justifyContent="space-between" p={4}>
        {/* //메인 박스 스타일 */}
        <Section title="어제 한 일" index={0} />
        <Box w={4} />
        {/* //메인 박스들 사이 간격 */}
        <Section title="오늘 할 일" index={1} />
        <Box w={4} />
        <Section title="내일 할 일" index={2} />
      </Box>
    </TrelloContext.Provider>
  )
}

export default Home
