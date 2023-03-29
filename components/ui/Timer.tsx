import { Text } from '@nextui-org/react';
import { useEffect, useState } from 'react'

export const Timer = () => {

    const [counter, setCounter] = useState(0);

    // const interval = setInterval(() => {
    //     setCounter(counter +1);
      
    //     console.log(`Counter = ${counter}`);
      
    //     if (counter >= 3) {
    //       console.log("Interval Stopped");
    //       clearInterval(interval);
    //     }
    //   }, 1000);

    return (
        <Text h3 css={{color:'White'}} >{counter}</Text>
    )
}
