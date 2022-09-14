import React, { useState } from "react";
import { useDispatch} from "react-redux";
import {
  Box,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
const Signup = () => {
  const dispatcher=useDispatch()
    const OverlayOne = () => (
        <ModalOverlay
          bg='blackAlpha.300'
          backdropFilter='blur(10px) hue-rotate(90deg)'
        />
      )

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = React.useState(<OverlayOne />)
  const [signupdata,setSignupdata]=useState({})
  const handlechange=(e)=>{
    const {name,value}=e.target
    setSignupdata({...signupdata,[name]:value})
  }
  return (
    <Box>
         <Box>
      <Box>
        <Button
        variant={"ghost"}
          onClick={() => {
            setOverlay(<OverlayOne />)
            onOpen();
          }}
        >
          Click here to SignUp
        </Button>
        <Modal isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
          <ModalContent>
            <ModalHeader>Signup</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
             <Input name="name" placeholder="Enter Full Name" onChange={handlechange}></Input>
             <Input name="email" placeholder="Enter Email Address" onChange={handlechange}></Input>
             <Input name="password" placeholder="Enter Password" onChange={handlechange}></Input>
             <Input name="mobile" placeholder="Enter Mobile" onChange={handlechange}></Input>
            </ModalBody>
            <ModalFooter>
              <Button onClick={()=>dispatcher({type:"SIGNUP",payload:signupdata},onClose())} >Sign Up</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Box>
    </Box>
  )
}

export default Signup