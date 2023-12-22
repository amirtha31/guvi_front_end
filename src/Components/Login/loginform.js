import { TextInput,PasswordInput,Text,Anchor, Checkbox,NavLink, Button, Group, Box } from '@mantine/core';
// import { IconHome2 } from '@tabler/icons-react';

import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import "./loginform.css";
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { UseStore } from '../../store';
import { toast, ToastContainer } from 'react-toastify';
function Login() {
    const [visible, { toggle }] = useDisclosure(false);
    const {setEmail} = UseStore();
    const navigate = useNavigate()
  const form = useForm({
    initialValues: {  email: '', password: '' },
    validate: {
      
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value.length < 6 ? 'Password must have at least 6 characters' : null),
      confirmPassword: (value, values) =>
        value !== values.password ? 'Passwords did not match' : null,
    },
    initialValues: {
      email: '',
      password:'',
      termsOfService: false,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
    
  });
 async  function handleSubmit(value) {
   console.log(value)
   const email = value.email
      try {
          const {data} =  await Axios.post('http://localhost:5000/api/add/signin',
              {
                value
              }
              
          );
          console.log(value)
          toast.success("Login Successfully !",{
            position: toast.POSITION.BOTTOM_LEFT,
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored"
          });
          setEmail({email})
          navigate('/profile')
          // window.alert("Login successfully")
          
  }
  catch(err) {
    console.log("error")
    toast.error("error")
  }
}
  return (
    <Box maw={340} mx="auto">
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))} className='form'>
      <Text
      variant="gradient"
      gradient={{ from: 'teal', to: 'red', deg: 2 }}
      sx={{ fontFamily: 'Greycliff CF, sans-serif' }}
      ta="center"
      fz="xl"
      fw={700}
    >
      Login
    </Text>
        <TextInput 
        className='email'
          withAsterisk 
          label="Email" 
          placeholder="your@email.com" 
          {...form.getInputProps('email')}
          required
        />
        
        <PasswordInput
        label="Password"
        // visible={visible}
        {...form.getInputProps('password')}
        onVisibilityChange={toggle}
      />


      
   
  

    
   <Group justify="center" mt="md">
  <Button type="submit" variant="gradient" gradient={{ from: 'teal', to: 'red', deg: 105 }} loaderPosition="center" style={{ marginLeft: 'auto', marginRight: 'auto' }} onClick={((values) => handleSubmit(values))}>
    Submit
  </Button>
</Group>
       
       <Text fz="xs">
          Don't have an account?{' '}
          <Link to="/">Sign Up</Link>
        </Text>
      </form>
      <ToastContainer />
    </Box>
  );
}
export default Login;