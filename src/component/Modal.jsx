import { Box, Button, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const Modal = () => {
    const navigate=useNavigate()
  const { data } = useSelector((state) => state);
  const dispatcher=useDispatch()
  const { id } = useParams();
  // console.log(id);
  let x = data.filter((el) => el.id == id);
  const [newdata, setdata] = useState(x[0]);

  // console.log(newdata);

  const handlechange = (e) => {
    const { name, value } = e.target;
    if(name==="category")
    {
        setdata({...newdata,category:{...newdata.category,name:value}})
    }
    else{
        setdata({ ...newdata, [name]: value });
    }
  };

  const handleset=()=>{
   dispatcher({type:"SET",payload:newdata})
   setTimeout(()=>{
    navigate("/")
   },1000)
  }
  return (
    <Box>
      <Input
        name="title"
        value={newdata.title}
        placeholder="Enter title"
        onChange={handlechange}
      ></Input>
      <Input
        name="price"
        value={newdata.price}
        placeholder="Enter price"
        onChange={handlechange}
      ></Input>
      <Input
        name="description"
        value={newdata.description}
        placeholder="Enter description"
        onChange={handlechange}
      ></Input>
      <Input
        name="category"
        value={newdata.category.name}
        placeholder="Enter category name"
        onChange={handlechange}
      ></Input>
      <Button onClick={handleset}>Change</Button>
    </Box>
  );
};

export default Modal;
