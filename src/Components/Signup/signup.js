import React from 'react';
import { TextInput, PasswordInput, Text, Button, Group, Box } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from 'react-toastify';
function Signup() {
  const [visible, { toggle }] = useDisclosure(false);
  const form = useForm({
    initialValues: { name: '', email: '', password: '', confirmPassword: '' ,mobileno:'',gender:'',dob:'',age:''},
    validate: {
      name: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value.length < 6 ? 'Password must have at least 6 characters' : null),
      confirmPassword: (value, values) =>
        value !== values.password ? 'Passwords did not match' : null,
    },
  });
  async function handleSubmit() {
    const value = form.values
    try{
      const {data} = await Axios.post('http://localhost:5000/api/add/create',{
        value
      });
      // window.alert("Registered successfully")
      toast.success("Registered Successfully !",{
        position: toast.POSITION.BOTTOM_LEFT,
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored"
      });
        
      console.log("Account Login Sucess")
  }
  catch(err) {
    console.log(err)
      toast.error("Already Account exist")
  }
  }
  return (
    <Box maxWidth={340} mx="auto">
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))} className="form">
        <Text variant="gradient" gradient={{ from: 'teal', to: 'red', deg: 2 }} ta="center" fz="xl" fw={700}>
          Sign Up
        </Text>
        <div className='forminside'>
        <TextInput
          withAsterisk
          label="Name"
          placeholder="Enter your name"
          {...form.getInputProps('name')}
          error={form.errors.name}
        />
        <TextInput
          withAsterisk
          label="Email"
          placeholder="your@email.com"
          {...form.getInputProps('email')}
          error={form.errors.email}
        />
        <PasswordInput
          label="Password"
          placeholder="Password"
          onVisibilityChange={toggle}
          {...form.getInputProps('password')}
          error={form.errors.password}
        />
        <PasswordInput
          mt="sm"
          label="Confirm password"
          placeholder="Confirm password"
          onVisibilityChange={toggle}
          {...form.getInputProps('confirmPassword')}
          error={form.errors.confirmPassword}
        />
        </div>

       
        <Group justify="center" mt="md">
  <Button type="submit" variant="gradient" gradient={{ from: 'teal', to: 'red', deg: 105 }} loaderPosition="center" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
    Submit
  </Button>
</Group>

        <Text fz="xs">
          Already have an account? <Link to="/login">Login</Link>
        </Text>
      </form>
      <ToastContainer />
    </Box>
  );
}

export default Signup;
