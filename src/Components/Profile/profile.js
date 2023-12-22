import {
  TextInput,
  PasswordInput,
  Text,
  Anchor,
  Select,
  Checkbox,
  NavLink,
  Button,
  Group,
  Box,
  DateInput,
} from "@mantine/core";
// import { DatePicker } from '@mantine/dates';
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import Axios from "axios";
import { Link, redirect, useNavigate } from "react-router-dom";
import "./profile.css";
import { UseStore } from "../../store";
import { toast, ToastContainer } from 'react-toastify';
function Profile() {
  const form = useForm({
    initialValues: { age: "", number: "", gender: "" , dob:""},
  });
  const navigate = useNavigate();
  const {email , setEmail} = UseStore()
  async function handleSubmit(values) {
    console.log("data", form.values);
    const ReqData = form.values;
    values.preventDefault();
    try {
      const { data } = await Axios.put(
        `http://localhost:5000/api/add/update/profile/${email.email}`,
        {
          ReqData,
        }
      );
      toast.success("Form submitted successfully !",{
        position: toast.POSITION.BOTTOM_LEFT,
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored"
      });
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(()=>{
    if(!email?.email) {
      navigate('/login')
    }
  },[email])
  function handleLogout() {
    setEmail({})
    navigate('/login')
  }
  return (
   <>
   {email?.email ? <Box maw={340} mx="auto">
      <form onSubmit={(values) => handleSubmit(values)} className="form">
        <Text
          variant="gradient"
          gradient={{ from: "teal", to: "red", deg: 2 }}
          sx={{ fontFamily: "Greycliff CF, sans-serif" }}
          ta="center"
          fz="xl"
          fw={700}
        >
          Profile
        </Text>
        <TextInput
          withAsterisk
          label="Age"
          placeholder="Enter your age"
          {...form.getInputProps("age")}
        />
        <TextInput
          withAsterisk
          label="Date of Birth"
          placeholder="DD/MM/YYYY"
          {...form.getInputProps("dob")}
        />
        <Select
          label="Gender"
          placeholder="Pick value"
          data={["Male", "Female"]}
          {...form.getInputProps("gender")}
        />
        {/* <input type="date" {...form.getInputProps('date')}/> */}
        <TextInput
          withAsterisk
          label="Mobile Number"
          placeholder="Enter your number"
          {...form.getInputProps("number")}
        />

        <Group justify="center" mt="md">
          <Button
            type="submit"
            variant="gradient"
            gradient={{ from: "#04421D", to: "#04421D", deg: 105 }}
            loaderPosition="center"
            style={{ marginLeft: "auto", marginRight: "auto" }}
          >
            Submit
          </Button>
        </Group>
      </form>
      <Group justify="center" mt="md" className="logout">
        <h1 style={{fontSize:"20px", color:"White"}}>Welcome, {email?.email}</h1>
        <Link to="/login">
          <Button
            variant="gradient" style={{color:"#04421D"}}
            gradient={{ from: "white", to: "white", deg: 105 }}
            loaderPosition="center"
            className="button"
            onClick={()=>{handleLogout()}}
          >
            Log out
          </Button>
        </Link>
      </Group>
      <ToastContainer />
    </Box> :
    <></>
    }
   </>
  );
}
export default Profile;
