import { authApi } from '@/api';
import { Brand, IBrands } from '@/interfaces';
import { Dropdown, PressEvent } from '@nextui-org/react'
import { AxiosRequestConfig } from 'axios';
import { FC, useEffect, useMemo, useState } from 'react';


  const Config: AxiosRequestConfig = {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
        //   'Authorization':`${token}`, TODO:Add token 
          'Accept': 'application/json'
        }
    };
interface SelectProps{
    option?:string;
    onValueChanged:(e: PressEvent) => void;
}
export const SelectBrand:FC<SelectProps> = ({onValueChanged}) => {
    
    const [brands, setBrands] = useState<Brand[]>([]);
    const [selected, setSelected] = useState(new Set(["option"]));
    const [value, setValue] = useState('option');

    const selectedValue =useMemo(() => Array.from(selected).join(", ").replaceAll("_", " "),
        [selected]
    );

    const getListBrands =async()=>{

        let options:Brand[] =[];
        
        try {

            const resp = await authApi.get<IBrands>('brand/list',Config);        
            setBrands(resp.data.brands);
        } catch (error) {
            console.log('error catch',error);
            
        }
        return options
    }

    const showname =(e:any)=>{
        // console.log(e.currentKey)
        setSelected(new Set([e.currentKey]));
        // setValue(e.currentKey);
        onValueChanged(e.currentKey);
        // console.log(selectedValue)
    }

    useEffect(() => {
        getListBrands();
    }, [])

  return (
    <Dropdown>
      <Dropdown.Button css={{ tt: "capitalize" }} color='secondary' shadow >{selectedValue}</Dropdown.Button>
      <Dropdown.Menu 
        aria-label="Single selection actions"
        color="secondary"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={selected}
        
        //@ts-ignore
        onSelectionChange={showname}> 

        
        {
            brands.map((item)=><Dropdown.Item key={item.name}>{item.name}</Dropdown.Item>)
        }
      </Dropdown.Menu>
    </Dropdown>
  )
}
