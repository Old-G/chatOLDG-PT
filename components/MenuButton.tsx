import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Input,
  DrawerFooter,
  Button,
  useColorMode,
  Icon,
  Flex,
  Text,
} from '@chakra-ui/react'
import React, { useCallback, useEffect, useState } from 'react'
import { BsMoonFill, BsSunFill } from 'react-icons/bs'

type MenuButtonProps = {
  isOpen: boolean
  onClose: () => void
  btnRef: any
  username: string | null
}

const MenuButton = ({ isOpen, onClose, btnRef, username }: MenuButtonProps) => {
  const { colorMode, toggleColorMode } = useColorMode()
  const [name, setName] = useState('')

  const handleChange = (e: { target: { value: any } }) => {
    setName(e.target.value)
  }

  const handleSaveName = useCallback(() => {
    localStorage.setItem('username', name)
  }, [name])

  return (
    <Drawer
      isOpen={isOpen}
      placement='right'
      onClose={onClose}
      finalFocusRef={btnRef}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Create your account</DrawerHeader>

        <DrawerBody>
          <Flex justify='end' mb='20px'>
            <Icon
              onClick={toggleColorMode}
              as={colorMode === 'light' ? BsMoonFill : BsSunFill}
              ml='5px'
              h='25px'
              w='25px'
              cursor='pointer'
            />
          </Flex>
          <Input placeholder='Update your name' onChange={handleChange} />
        </DrawerBody>

        <DrawerFooter>
          <Button variant='outline' mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme='blue' onClick={handleSaveName}>
            Save
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default MenuButton
