import { Text, useTheme } from '@nextui-org/react';
import React from 'react'
import { Timer } from './Timer';

export const Navbar = () => {
    
    const {theme} =useTheme();

  return (
    <div style={{
        display:'flex',
        width:'100%',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'end',
        padding:'0px 20px',
        backgroundColor:theme?.colors.gray100.value,
        position:'sticky',
        top: '0px',
        height: '60px',
        zIndex:'99'
    }}>
        {/* <Text color='white' transform='capitalize' h3 >Timer</Text> */}
        {/* <Timer/> */}
    </div>
  )
}
