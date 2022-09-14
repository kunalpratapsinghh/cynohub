import {
  Box,
  Button,
  Heading,
  HStack,
  Input,
  Select,
  Stack,
  Switch,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Navigate,useNavigate } from "react-router-dom";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { dataapi } from "../redux/action";
import { useState } from "react";

const Home = () => {
  const navigate=useNavigate()
  const { isAuth } = useSelector((state) => state);
  const { data } = useSelector((state) => state);
  const [search, setSearch] = useState({ type: "", text: "" });
  const dispatcher = useDispatch();
  useEffect(() => {
    if(data.length==0)
    {
      dispatcher(dataapi());
    }

  }, []);

  const handledelete = (el) => {
    dispatcher({ type: "DELETE", payload: el });
  };

  const handlechange = (e) => {
    const { name, value } = e.target;
    setSearch({ ...search, [name]: value });
  };

  const handlesearch = async () => {
    if (search.type === "" || search.text === "") {
      alert("Please select Type Of Search and Input sum Text");
    } else {
      await dispatcher(dataapi());
      dispatcher({ type: "SEARCH", payload: search });
    }
  };

const handleascdsc=(e)=>{
    dispatcher({ type: "SORT", payload:{...search,checked:e.target.checked}});
}

const handleedit=(el)=>{
  navigate(`/edit/${el.id}`)
}

  if (!isAuth) {
    return <Navigate to="/login" />;
  }
  return (
    <Box>
      <Heading>Home</Heading>
      <HStack w="90%" m={"auto"}>
        <Input
          w={"s"}
          placeholder="Search item"
          name="text"
          value={search.text}
          onChange={handlechange}
        ></Input>
        <Select
          name="type"
          placeholder="Select option"
          onChange={handlechange}
          w="200px"
        >
          <option value="id">id</option>
          <option value="title">title</option>
          <option value="price">price</option>
          <option value="description">description</option>
          <option value="category">categoryname</option>
        </Select>
        <Button variant={"ghost"} onClick={handlesearch}>
          Search
        </Button>
        <Stack direction="row" display={'flex'} alignItems="center">
          <Heading>ASC</Heading>
          <Switch colorScheme="teal" size="lg" onChange={handleascdsc}/>
          <Heading>DES</Heading>

        </Stack>
      </HStack>
      <Table variant="striped" colorScheme="teal" w="90%" m={"auto"}>
        <Thead>
          <Tr>
            <Th>Id</Th>
            <Th>Title</Th>
            <Th>Description</Th>
            <Th>Category Name</Th>
            <Th>Price</Th>
            <Th>Edit</Th>
            <Th>Delete</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data &&
            data.map((el) => (
              <Tr key={el.id}>
                <Td>{el.id}</Td>
                <Td>{el.title}</Td>
                <Td>{el.description}</Td>
                <Td>{el.category.name}</Td>
                <Td>{el.price}</Td>
                <Td>
                  <Button variant={"ghost"} onClick={()=>handleedit(el)}>Edit</Button>
                </Td>
                <Td>
                  <Button variant={"ghost"} onClick={() => handledelete(el)}>
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
      {/* </TableContainer> */}
    </Box>
  );
};

export default Home;
