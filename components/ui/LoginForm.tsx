import { Grid, Card, Text, Spacer, Button, FormElement, Badge } from "@nextui-org/react";
import { ChangeEvent, useContext, useState } from "react";
import { InputFormNoSSR } from "./InputForm";
import { AuthContext } from '../../context/auth/AuthContext';
import { useRouter } from "next/router";

interface ILoginData{
  email:string;
  password:string;
}

export const LoginForm = () => {

  const router = useRouter();

  const {loginUser} = useContext(AuthContext);
  const [showError, setShowError] = useState(false);

  const initform:ILoginData={
    email:'correo@gmail.com',
    password:'123456'
  }
  const [loginData, setLoginData] = useState<ILoginData>(initform);

  const onHandleLogin = async()=>{
    
    const isValidLogin = await loginUser(loginData.email,loginData.password);

    if(!isValidLogin){
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }

    router.replace('/add');

  }

  const onChangeEmail =(e: ChangeEvent<FormElement>)=>{
    // console.log(e.target.value);
    setLoginData({email:e.target.value,password:loginData.password})
  } 

  const onChanePass =(e: ChangeEvent<FormElement>)=>{
    // console.log(e.target.value);
    setLoginData({email:loginData.email,password:e.target.value})
  } 
  

  return (
    <Grid.Container justify="center" css={{backgroundColor: 'var(--nextui-colors-background)'}} >
      <Grid xs={10} md={4} sm={6} direction='column'>
              <Card css={{padding:50}}>
                <Text h2 css={{color:'White'}}> Login </Text>
                <Badge enableShadow disableOutline color="error" css={{ display: showError ? 'flex': 'none' }}>No reconocemos ese usuario / contraseña</Badge>
                <Spacer y={2.5} />
                <InputFormNoSSR id="email" placeholder="Email" onChangeField={onChangeEmail}/>
                <Spacer y={2.5} />
                <InputFormNoSSR id="password" placeholder="Password" pass={true} onChangeField={onChanePass}/>
                <Spacer y={2.5} />
                <Button auto color="gradient" onPress={onHandleLogin}>Login</Button>
              </Card>
          </Grid>
    </Grid.Container>
  )
}
