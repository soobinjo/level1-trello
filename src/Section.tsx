import { Box, Button, Center, Heading, Icon, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Stack, Text, useDisclosure } from "@chakra-ui/react";
import {ModalOverlay, ModalCloseButton, ButtonGroup, Wrap, WrapItem} from '@chakra-ui/react'
import { useContext, useState } from "react";
import { TaskType, TrelloContext } from "../pages";
import {MdAccessibility, MdAdjust, MdArrowDownward, MdArrowLeft, MdArrowRight, MdArrowUpward, MdAssignment, MdBrush, MdBuild, MdCall, MdDelete, MdGpsFixed, MdKeyboardArrowLeft, MdKeyboardArrowRight, MdOutlineArrowDownward, MdOutlineArrowRight, MdOutlineArrowRightAlt, MdOutlineKeyboardArrowRight, MdOutlineSubdirectoryArrowRight, MdPending, MdSubdirectoryArrowRight, MdUndo} from "react-icons/md"

const DATA = [
  {
    id: 1,
    title: "1",
    description: "content1"
  },
  {
    id: 2,
    title: "2",
    description: "content2"
  },
  {
    id: 3,
    title: "3",
    description: "content3"
  },
  {
    id: 4,
    title: "4",
    description: "content4"
  },
  {
    id: 5,
    title: "5",
    description: "content5"
  },
]

export default function Section({ title: sectionTitle, index }: { title: string, index: number }) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { isOpen: updateModalIsOpen, onClose: onUpdateModalClose, onOpen: onUpdateModalOpen } = useDisclosure();
  const [currentId, setCurrentId] = useState(-1);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [, setTasks] = useState<TaskType[]>(DATA);
  const openCreateModal = () => onOpen();
  const { addTask: handleAddTask, tasks: sections, moveTask, deleteTask, swapTask } = useContext (TrelloContext);
  const tasks = sections[index];
  const addTask = () => {
    // 카드 추가
    handleAddTask?.(index, {
      id: Date.now(),
      title: title,
      description,
    });
    // 입력값 초기화
    setTitle('');
    setDescription('');
    // 모달 닫기
    onClose();
  }
  const openUpdateModal = (task: TaskType) => {
    onUpdateModalOpen();
    setTitle(task.title);
    setDescription(task.description);
    setCurrentId(task.id);
  }
  const updateTask = () => {
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
  }
  const moveUpTask = (task: TaskType) => {
    swapTask(index, task, -1);
  }
  const moveDownTask = (task: TaskType) => {
    swapTask(index, task, 1);
  }
  const moveRightTask = (task: TaskType) => {
    moveTask(index, index + 1, task);
  }
  const moveLeftTask = (task: TaskType) => {
    moveTask(index, index - 1, task);
  }



  return (
    <Box bg="white" flex={1} borderRadius={3} p={10} borderWidth='1.5px' boxShadow={'lg'}>
      <Heading mb={4}>{sectionTitle}</Heading>
      {/* //mt/ml/mr/mb 사용하면 마진 조정 가능 */}
      <Button mb={-2} onClick={openCreateModal}>
        + 새로 만들기
      </Button>
      <Stack>
        {tasks.map((task) => (
          <Box key={task.id}
          //새로 만들기 클릭 시 생기는 리스트의 스타일
          bg="white" mt={8} borderWidth={1.5} mb={2} p={4} borderRadius={3}>
            <Heading fontSize="2xl" mb={1}>{task.title}</Heading>
            <Text fontSize="lg" mb={4}>{task.description}</Text>
            <Button 
            colorScheme='gray' variant='solid'
            textColor={'black'} fontSize={'md'}
            w='30px' h='34px' borderRadius={3} mr={2} mb={3}
            //왜 그레이 먹였는데 흰색이 나옴?ㅜㅜ
            leftIcon={<MdDelete/>} 
            onClick={() => deleteTask(index, task)}>
              {/* 삭제 */}
              </Button>
            <Button 
            colorScheme='gray' variant='solid'
            textColor={'black'} fontSize={'md'}
            w='30px' h='34px' borderRadius={3} mr={2} mb={3}
            leftIcon={<MdBrush/>} 
            onClick={() => openUpdateModal(task)}>
              {/* 수정 */}
            </Button>
            <Button 
            colorScheme='gray' variant='solid'
            textColor={'black'} fontSize={'md'}
            w='30px' h='34px' borderRadius={3} mr={2} mb={3}
            leftIcon={<MdArrowUpward/>}
            onClick={() => moveUpTask(task)}>
              {/* 위로 */}
            </Button>
            <Button 
            colorScheme='gray' variant='solid'
            textColor={'black'} fontSize={'md'}
            w='30px' h='34px' borderRadius={3} mr={2} mb={3}
            leftIcon={<MdArrowDownward/>} 
            onClick={() => moveDownTask(task)}>
              {/* 아래 */}
            </Button>
            <Button 
            colorScheme='gray' variant='solid'
            textColor={'black'} fontSize={'md'}
            w='30px' h='34px' borderRadius={3} mr={2} mb={3}
            leftIcon={<MdKeyboardArrowLeft/>} 
            onClick={() => moveLeftTask(task)}>
              {/* 왼쪽 */}
            </Button>
            <Button 
            colorScheme='gray' variant='solid'
            textColor={'black'} fontSize={'md'}
            w='30px' h='34px' borderRadius={3} mb={3}
            leftIcon={<MdKeyboardArrowRight/>} 
            onClick={() => moveRightTask(task)}>
              {/* 오른쪽 */}
            </Button>
          </Box>
        ))}
      </Stack>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize={'3xl'} mt={4} ml={3}>할일 추가</ModalHeader>
          {/* //모달 제목 스타일 */}
          <ModalBody>
            <Input placeholder="제목" 
            value={title} height={12} mb={3} ml={3} mr={3} 
            colorScheme={'teal'}
            //마우스 대면 색상 변함
            onChange={(e) => setTitle(e.target.value)} />
            {/* //모달의 제목 하단에 마진 먹이기 */}
            {/* //근데 왜 mr은 안먹여지지..? */}
            <Input placeholder="설명" 
            value={description} height={28} ml={3} mr={3}
            onChange={(e) => setDescription(e.target.value)} />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' variant='solid'
            onClick={addTask}>
              추가하기</Button>
            <Button variant="outline" ml={2} 
            onClick={onClose}>
              닫기</Button>
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
            <Button onClick={updateTask}>수정하기</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}
