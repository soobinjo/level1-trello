import { Box, Button, Heading, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Stack, Text, useDisclosure } from "@chakra-ui/react";
import {ModalOverlay, ModalCloseButton, ButtonGroup} from '@chakra-ui/react'
import { useState } from "react";

type TaskType = {
  id: number;
  title: string;
  description: string;
}

export default function Section({ title: sectionTitle }: { title: string }) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { isOpen: updateModalIsOpen, onClose: onUpdateModalClose, onOpen: onUpdateModalOpen } = useDisclosure();
  const [currentId, setCurrentId] = useState(-1);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tasks, setTasks] = useState<TaskType[]>([]);
  return (
    <Box bg="#BFEEFA" flex={1} borderRadius={3} p={10} boxShadow={'md'}>
      {/* 리스트 박스 스타일. 근데 왜 쉐도우 안먹여짐..? */}
      <Heading>{sectionTitle}</Heading>
      <Button colorScheme={"blue"} variant={"outline"} borderRadius={3} p={4} onClick={() => {onOpen();}} > + 새로 만들기 </Button>
      {/* //리스트 박스의 전체 버튼 스타일 */}
      <Stack>
        {tasks.map((task) => (
          <Box key={task.id} bg="white" p={10} borderRadius={3}>
            {/* 리스트 안의 할일 목록 */}
            <Heading fontSize="md">{task.title}</Heading>
            <Text>{task.description}</Text>
            <Button onClick={() => {
              const idx = tasks.findIndex(t => t.id === task.id);
              setTasks([
                ...tasks.slice(0, idx),
                ...tasks.slice(idx + 1),
              ])
            }}>삭제</Button>
            <Button onClick={() => {
              onUpdateModalOpen();
              setTitle(task.title);
              setDescription(task.description);
              setCurrentId(task.id);
            }}>
              수정
            </Button>
          </Box>
        ))}
      </Stack>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader>내용을 적어주세요</ModalHeader>
          <ModalBody>
            <Input placeholder="제목" value={title} onChange={(e) => setTitle(e.target.value)} />
            <Input placeholder="내용" value={description} onChange={(e) => setDescription(e.target.value)} />
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => {
              // 새로 만들기
              setTasks([
                ...tasks,
                {
                  id: Date.now(),
                  title: title,
                  description,
                }
              ]);setTitle('');setDescription('');onClose();}}>추가하기</Button>
            <Button variant="text" onClick={onClose}>닫기</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={updateModalIsOpen} onClose={onUpdateModalClose}>
        <ModalContent>
          <ModalHeader>카드 수정</ModalHeader>
          <ModalBody>
            <Input placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <Input placeholder="description" value={description} onChange={(e) => setDescription(e.target.value)} />
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => {
              const idx = tasks.findIndex(t => t.id === currentId);
              setTasks([
                ...tasks.slice(0, idx),
                {
                  id: currentId,
                  title,
                  description,
                },
                ...tasks.slice(idx + 1),
              ]);
              onUpdateModalClose();
            }}>수정하기</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}
