import NextLink from 'next/link';
import { Grid, Text, User, useTheme } from '@nextui-org/react';


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
        <Grid.Container>
        <Grid>
          <User
            bordered
            src="https://scontent.fntr8-1.fna.fbcdn.net/v/t1.6435-9/102414261_555083562045516_8429950554791682035_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_eui2=AeFRGGvozdnLKoQK0cwEV9hd1LhDA-p5q3PUuEMD6nmrc7F3v-pojmg9Xo-u4gBKSoPjcAAqs5m0F6nlyv8WmTzf&_nc_ohc=8XV1dTVyOVIAX9ZIt6l&_nc_ht=scontent.fntr8-1.fna&oh=00_AfB-7o0LdSCQv63dWX9I-H4jh_DVNi0jWqN7W3THHjY0Ig&oe=64514209"
            name="CrIxX"
            color="gradient"
            
          />
        </Grid>
        </Grid.Container>
        <NextLink href='/add' passHref>
            <Text color='white' transform='capitalize'>Add</Text>
        </NextLink>
        <NextLink href='/list' passHref>
            <Text color='white' transform='capitalize'>Collection</Text>
        </NextLink>
    </div>
  )
}
