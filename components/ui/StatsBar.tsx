import { formatter } from '@/utils';
import { Text, useTheme } from '@nextui-org/react';
import { FC } from 'react';

interface StatsProps{
    itemsTotal:number;
    pricetotal:number;

}
export const StatsBar:FC<StatsProps> = ({itemsTotal,pricetotal}) => {
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
        top: '60px',
        height: '30px',
        zIndex:'99'
    }}>
        <Text  transform='capitalize' css={{ color: "$blue900", fontSize: "$xl" }}>Total Items: {itemsTotal}</Text>
        {/* <Text color='white' transform='capitalize'  >Total Items: {pricetotal}</Text> */}
        <Text css={{ color: "$green700", fontWeight: "$semibold", fontSize: "$xl" }}>
                  {formatter.format(pricetotal)}
        </Text>
    </div>
  )
}

