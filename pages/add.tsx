import { authApi } from "@/api";
import { Layout } from "@/components/layout";
import { InputFormNoSSR, ModalSuccess, SelectBrand, Spinner } from "@/components/ui";
import { AuthContext } from "@/context";
import { pusher } from "@/utils";
// import Pusher from "pusher-js";
// import { socket } from "@/utils";
import { Image, Grid, FormElement, Spacer, Container, Text, Button, Card, Row} from "@nextui-org/react";
import { AxiosError, AxiosRequestConfig } from "axios";
import { NextPage } from "next";
import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import mewtwo from '../public/Mewtwo.png';

interface DefaulState{
    name:string;
    brand:string;
    price:string;
    quantity:string;
}



const HomePage: NextPage = () => {

    useEffect(() => {
        
        const channel = pusher.subscribe("collection-inventory-production");

        channel.bind("update-list", (data:any) => {
            console.log(data)
            // Method to be dispatched on trigger.
        });

      }, []);

    const {refreshToken,checkToken} = useContext(AuthContext);
    const [register, setRegister] = useState<DefaulState>();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState('');
    
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
    const nameRef = useRef<HTMLInputElement>(null);
    const priceRef = useRef<HTMLInputElement>(null);
    const quantityRef = useRef<HTMLInputElement>(null);

    

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

    // const testEmit = ()=>{
    //     socket.emit('Figures','update');
    // }
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

            const data = await (await authApi(config)).data;
            
        
            // const resp = await authApi.post('inventory/add',Config);
            console.log(data)
            
            if(data){
                
                clearform();
                // pusher.send_event("add item", "update");
                setInputValues({
                    name: '',
                    brand: inputValues.brand,
                    price:'',
                    quantity:''
            
                });
                setMessage(data.message)
                setSuccess(data.success);
                // socket.emit('Figures','update');
                setTimeout(() => {
                    setLoading(false);
                    setOpen(!open);
                }, 1000);
            }
            // setBrands(resp.data.brands);
        } catch (error:any) {
            const err:AxiosError =error;
            console.log(err);

            if(err.response){
                const data:any = err.response.data;
                setMessage(data.message)
                setSuccess(data.success);
            }
            
            setTimeout(() => {
                setLoading(false);
                setOpen(!open);
            }, 1000);
            // setOpen(!open)
            console.log('error catch',error);
            
        }
    }
    const clearform = ()=>{
        if(nameRef.current)
            nameRef.current.value =''
        if(priceRef.current)
            priceRef.current.value =''
        if(quantityRef.current)
            quantityRef.current.value =''
    }

    return(
        <Layout title="Add Item to Collection">
            
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

                        <Grid css={{display:'flex'}} justify='center' direction="column" xs={10} md={4} sm={6}>
                        
                        <Card css={{ p: '20px' }}>
                        <Card.Header>
                            <Text  h3 color="secondary" css={{textAlign:'center'}}>Add to my collection</Text>
                        </Card.Header>
                        
                        <Card.Divider />
                        
                        <Card.Body css={{ py: "$10" }}>
                            <Spacer y={1} />
                            <SelectBrand onValueChanged={onSelectChange}/>
                            <Spacer y={2} />
                            <InputFormNoSSR id="name" placeholder="Name" onChangeField={onFieldChange} refobj={nameRef}/>
                            <Spacer y={2} />
                            <InputFormNoSSR id="price" placeholder="Price" onChangeField={onFieldChange} refobj={priceRef}/>
                            <Spacer y={2} />
                            <InputFormNoSSR id="quantity" placeholder="Quantity" onChangeField={onFieldChange} refobj={quantityRef}/>
                            <Spacer y={1} />
                        </Card.Body>
                            <Card.Divider />
                            <Card.Footer>
                                <Row justify="flex-end">
                                    <Button shadow color="secondary" size="sm" onPress={sendItem}>Save</Button>
                                    {/* <Button shadow color="secondary" size="sm" onPress={testEmit}>Emit</Button> */}
                                </Row>
                            </Card.Footer>
                            
                        </Card>
                            
                        </Grid>
                    </Grid.Container>
                    <ModalSuccess open={open} onOpenChanged={onComplete} success={success} message={message}/>
                    <Spinner open={loading} onOpenChanged={onComplete}/>
                </Container>
           
        </Layout>
    )
}

export default HomePage