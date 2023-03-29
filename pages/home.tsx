import { authApi } from "@/api";
import { Layout } from "@/components/layout";
import { InputFormNoSSR, ModalSuccess, SelectBrand, Spinner } from "@/components/ui";
import { AuthContext } from "@/context";
import { Image, Grid, FormElement, Spacer, Container, Text, Button, Card, Row} from "@nextui-org/react";
import { AxiosRequestConfig } from "axios";
import { NextPage } from "next";
import { ChangeEvent, useContext, useState } from "react";
import mewtwo from '../public/Mewtwo.png'

interface DefaulState{
    name:string;
    brand:string;
    price:string;
    quantity:string;
}



const HomePage: NextPage = () => {

    const {refreshToken,checkToken} = useContext(AuthContext);
    const [register, setRegister] = useState<DefaulState>();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    
    // const [token, settoken] = useState('');

    const onComplete =()=>{
        setOpen(!open);
        console.log(open)
    }

    const [inputValues, setInputValues] = useState({
        name: '',
        brand: '',
        price:'',
        quantity:''

    });

    

    // const handleOnChange = event => {
    //     const { name, value } = event.target;
    //     setInputValues({ ...inputValues, [name]: value });
    //   };
    const onFieldChange =(e: ChangeEvent<FormElement>)=>{
        // setRegister(...)
        // settoken(e.target.value);
        // console.log(token)
        const { id, value } = e.target;
        setInputValues({ ...inputValues, [id]: value });
        console.log({ ...inputValues, [id]: value });
    } 
    const onSelectChange=(e:any)=>{
        
        setInputValues({ ...inputValues, ['brand']: e });
        console.log({ ...inputValues, ['brand']: e });
    }
    const sendItem = async ()=> {
        try {

            const config: AxiosRequestConfig = {
                method: "POST", 
                url: 'inventory/add',
                headers: {
                  'Content-Type': 'application/json',
                //   'Authorization':`${token}`, TODO:Add token 
                  'Accept': 'application/json'
                },
                data: JSON.stringify(inputValues)
            };
    
            setLoading(true);

            const response = await (await authApi(config)).data;
            
        
            // const resp = await authApi.post('inventory/add',Config);
            console.log(response)
            
            if(response){
            
                setTimeout(() => {
                    setLoading(false);
                    setOpen(!open)
                }, 1000);
            }
            // setBrands(resp.data.brands);
        } catch (error) {
            setLoading(false);
            console.log('error catch',error);
            
        }
    }

    return(
        <Layout>
            
            <Container
                css={{
                    display:'flex',
                    flexDirection:'column',
                    alignItems:'center',
                    alignSelf:'center',
                    justifyContent:'flex-start',
                }} 
                >
                    
                    <Grid.Container gap={2} justify="center">
                    
                        <Grid xs={8} md={4} sm={4}>
                            <Image 
                                src={mewtwo.src}  
                                objectFit="fill" 
                                className={'image'} />
                        </Grid>

                        <Grid css={{display:'flex'}} justify='center' direction="column" md={3} xs={8}>
                        
                        <Card css={{ p: '20px' }}>
                        <Card.Header>
                            <Text  h3 color="secondary" css={{textAlign:'center'}}>Add to my collection</Text>
                        </Card.Header>
                        
                        <Card.Divider />
                        
                        <Card.Body css={{ py: "$10" }}>
                            <Spacer y={1} />
                            <SelectBrand onValueChanged={onSelectChange}/>
                            <Spacer y={2} />
                            <InputFormNoSSR id="name" placeholder="Name" initialValue='' onChangeField={onFieldChange} />
                            <Spacer y={2} />
                            <InputFormNoSSR id="price" placeholder="Price" initialValue='' onChangeField={onFieldChange}/>
                            <Spacer y={2} />
                            <InputFormNoSSR id="quantity" placeholder="Quantity" initialValue='' onChangeField={onFieldChange}/>
                            <Spacer y={1} />
                        </Card.Body>
                            <Card.Divider />
                            <Card.Footer>
                                <Row justify="flex-end">
                                    <Button shadow color="secondary" size="sm" onPress={sendItem}>Save</Button>
                                </Row>
                            </Card.Footer>
                            
                        </Card>
                            
                        </Grid>
                    </Grid.Container>
                    <ModalSuccess open={open} onOpenChanged={onComplete}/>
                    <Spinner open={loading} onOpenChanged={onComplete}/>
                </Container>
           
        </Layout>
    )
}

export default HomePage