import React, { useState } from "react";
import { useDispatch, useSelector} from "react-redux";

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
import { Navigate } from "react-router-dom";

const Login = () => {
  const {isAuth}=useSelector(state=>state)
  const dispatcher=useDispatch()

  const [logindata, setLogindata] = useState({});

  const handlechange = (e) => {
    const { name, value } = e.target;
    setLogindata({ ...logindata, [name]: value });
  };

  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = React.useState(<OverlayOne />);
  if(isAuth)
  {
    return <Navigate to="/"/>
  }
  return (
    <>
      <Box> 
        <Box>
          <Button
          variant={"ghost"}
            onClick={() => {
              setOverlay(<OverlayOne />);
              onOpen();
            }}
          >
          Click here to Login
          </Button>
          <Modal isCentered isOpen={isOpen} onClose={onClose}>
            {overlay}
            <ModalContent>
              <ModalHeader>Login</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Input
                  name="email"
                  placeholder="Enter Email Address"
                  onChange={handlechange}
                ></Input>
                <Input
                  name="password"
                  placeholder="Enter Password"
                  onChange={handlechange}
                ></Input>
              </ModalBody>
              <ModalFooter>
                <Button variant={"ghost"} onClick={()=>dispatcher({type:"LOGIN",payload:logindata},onClose())}>Login</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
      </Box>
      </>
  );
};
export default Login;