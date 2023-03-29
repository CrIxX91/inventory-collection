import NextLink from 'next/link';
import { Text, useTheme } from '@nextui-org/react';


export const Navbar = () => {
    
    const {theme} =useTheme();

  return (
    <div style={{
        display:'flex',
        width:'100%',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'end',
        gap:'2em',
        padding:'0px 20px',
        backgroundColor:theme?.colors.gray100.value,
        position:'sticky',
        top: '0px',
        height: '60px',
        zIndex:'99'
    }}>
        <NextLink href='/add' passHref>
            <Text color='white' transform='capitalize'>Add Figure</Text>
        </NextLink>
        <NextLink href='/list' passHref>
            <Text color='white' transform='capitalize'>Collection</Text>
        </NextLink>
    </div>
  )
}
