import dynamic from 'next/dynamic'
import { FormElement, Input } from '@nextui-org/react';
import { ChangeEvent, FC, Ref, RefAttributes } from 'react';

interface Props{
    id:string;
    placeholder:string;
    initialValue?:string;
    pass?:boolean;
    onChangeField?:(e: ChangeEvent<FormElement>)=>void;
    value?:string;
    refobj?:Ref<HTMLInputElement>;
    
    
}

const InputForm:FC<Props> = ({id,placeholder,initialValue,pass = false,onChangeField,refobj=null}) => {
  // const { value, reset, bindings } = useInput("");
  
  
  return (
    <>
    {
        !pass? <Input id={id}  bordered labelPlaceholder={placeholder} initialValue={initialValue} onChange={onChangeField} color='secondary' ref={refobj}/>
        :<Input.Password id={id}  bordered labelPlaceholder={placeholder} initialValue={initialValue}  onChange={onChangeField} color='secondary'/>
    }
    </>

  )
}

export const InputFormNoSSR = dynamic(() => Promise.resolve(InputForm), {
    ssr: false
  })