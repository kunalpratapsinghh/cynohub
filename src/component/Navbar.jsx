import { Box, Button, HStack, Spacer } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const {isAuth}=useSelector(state=>state)

  const dispatcher = useDispatch();
  const navigate = useNavigate();

useEffect(() => {
 
}, [isAuth])


  return (
    <Box>
      <HStack>
        <Button
          variant={"ghost"}
          onClick={() => {
            navigate("/");
          }}
        >
          Home
        </Button>
        <Spacer />
        {!isAuth && (
          <Button
            variant={"ghost"}
            onClick={() => {
              navigate("/signup");
            }}
          >
            Signup
          </Button>
        )}
        {!isAuth && (
          <Button
            variant={"ghost"}
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </Button>
        )}
        {isAuth && (
          <Button
            variant={"ghost"}
            onClick={() => dispatcher({ type: "LOGOUT", payload: "" })}
          >
            Logout
          </Button>
        )}
      </HStack>
    </Box>
  );
};

export default Navbar;
