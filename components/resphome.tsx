import { Layout } from "@/components/layout";
import { InputFormNoSSR } from "@/components/ui";
import { AuthContext } from "@/context";
import { Image, Button, Grid, FormElement, Spacer, Container, Text} from "@nextui-org/react";
import axios, { AxiosRequestConfig } from "axios";
import { NextPage } from "next";
import { ChangeEvent, useContext, useState } from "react";
import mewtwo from '../public/Mewtwo.png'


const HomePage: NextPage = () => {
    const {refreshToken,checkToken} = useContext(AuthContext);
    const [token, settoken] = useState('');

    // const onHandleTest = async () => {
        
    //     const isValidToken = await checkToken();
    //     console.log(isValidToken);

    //     if(!isValidToken){
    //         console.log('Reintentar')
    //     }
    // }

    // const AuxConfig: AxiosRequestConfig = {
    //     method: "GET",
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Authorization':`${token}`,
    //       'Accept': 'application/json'
    //     }
    // };
      

    // const valideEnpoint =async()=>{
    //     try {

    //         const resp = await axios.get('https://vavvedz4w3.execute-api.us-east-1.amazonaws.com/v1/users/640bad6e52d55d04adf37437/job-applications',AuxConfig);
    //         console.log(resp);
            
    //     } catch (error) {
    //         console.log('error catch',error)
    //     }
        
    // }

    // const testAWS =async()=>{
        
    //     try {
    //         const resp = await axios.get('https://v5b1s8swj0.execute-api.us-east-1.amazonaws.com/test/');    
    //         console.log(resp);
    //     } catch (error) {
    //         console.log('catch error',error)

    //     }
    // }
  

    const onChaneToken =(e: ChangeEvent<FormElement>)=>{
        settoken(e.target.value);
        console.log(token)
    } 

    return(
        <Layout>
            <Text h3 color="secondary" css={{textAlign:'center', paddingTop:'2em'}}>Add New Item</Text>
            <Container
                css={{
                    display:'flex',
                    flexDirection:'column',
                    // height:'calc(100vh - 60px)',
                    alignItems:'center',
                    alignSelf:'center',
                    justifyContent:'flex-start',
                    // maxWidth:'100% !important',
                    // paddingTop:'60px' 
                }} 
                >
                    
                    <Grid.Container gap={2} justify="center">
                        {/* <Grid >
                            <Text h3 color="secondary" css={{textAlign:'center',paddingTop:'2vh'}}>Add New Item</Text>
                            <Image 
                                src={mewtwo.src} 
                                objectFit="fill"
                                alt="mewtwo"
                                width={200}
                                height={300}
                            />    
                        </Grid> */}

                        <Grid xs={8} md={4} sm={4}>
                            <Image 
                                src={mewtwo.src}  
                                objectFit="fill" 
                                className={'image'} />
                        </Grid>
                        <Grid css={{display:'flex'}} justify='center' direction="column">
                            <InputFormNoSSR id="token" placeholder="Name" initialValue='' onChangeField={onChaneToken}/>
                            <Spacer y={2.5} />
                            <InputFormNoSSR id="token" placeholder="Brand" initialValue='' onChangeField={onChaneToken}/>
                            <Spacer y={2.5} />
                            <InputFormNoSSR id="token" placeholder="Price" initialValue='' onChangeField={onChaneToken}/>
                            <Spacer y={2.5} />
                            <InputFormNoSSR id="token" placeholder="Quantity" initialValue='' onChangeField={onChaneToken}/>
                            <Spacer y={2.5} />
                            {/* <Button bordered color="gradient" size="lg" onPress={onHandleTest}>Test</Button>
                            <Spacer y={2.5} />
                            <InputFormNoSSR id="token" placeholder="Token" initialValue='' onChangeField={onChaneToken}/>
                            <Spacer y={2.5} />
                            <Button bordered color="gradient" size="lg" onPress={valideEnpoint}>Test Enpoind</Button> */}
                        </Grid>
                    </Grid.Container>
                    
                </Container>
           
        </Layout>
    )
}

export default HomePage