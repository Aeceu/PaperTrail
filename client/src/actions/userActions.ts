import axios from '@/api/axios';

type LoginProps = {
  email: string;
  password: string;
};
export const handleLogin = async (data: LoginProps) => {
  try {
    const res = await axios.post('/login', data);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

type SignupProps = {
  username: string;
  email: string;
  password: string;
};
export const handleSignup = async (data: SignupProps) => {
  try {
    const res = await axios.post('/signup', data);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
