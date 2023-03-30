import { Fragment, useEffect, useRef, useState } from 'react';
import { NextPage } from 'next';
import { AxiosRequestConfig } from 'axios';
import { authApi } from '@/api';
import { CollectionList } from '@/components/collection';
import { Layout } from '@/components/layout'
import { CollectionEmpty, Spinner, StatsBar } from '@/components/ui';
import { Figure, ICollection } from '@/interfaces';
import { pusher } from '@/utils';
// import { socket } from '@/utils';


const ListPage: NextPage = () => {
  
  // const socket = useRef();
  const [collection, setCollection] = useState<Figure[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalPieces, setTotalPieces] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {

        const channel = pusher.subscribe("collector-app");
        // channel.bind("pusher:subscription_succeeded", (members:any) => {
        //   // total subscribed
        //   console.log(members)
        // //   setOnlineUsersCount(members.count);
        // });
        channel.bind("pusher:subscription_succeeded", () => {
          console.log('subscription_succeeded')
        });
        // channel.bind("pusher:subscription_error", (error:any) => {
        //   console.log('subscription_error',error)
        // });

        channel.bind("update-list", (data:any) => {
            console.log(data.collection);
            const newData = data.collection as Figure[];
            
            if(newData.length >0){
              updateListInfo(newData)
            }
            console.log(newData);
            // Method to be dispatched on trigger.
        });

        return () => {
          pusher.unsubscribe("collector-app");
        };

  }, [])
  

  const getList = async()=> {
    try {
      const config: AxiosRequestConfig = {
        method: "GET", 
        url: 'inventory/collection'
    };

    setLoading(true);

    const data:ICollection = await (await authApi(config)).data;
    
    // console.log(data.figures);

    if(data){
      setLoading(false);
      updateListInfo(data.figures);
    }

    } catch (error) {
      setLoading(false);
      console.log('Error on getList')
    }
    
  }

  const updateListInfo = (collectionfig:Figure[])=>{
    setCollection(collectionfig);
    getTotalPieces(collectionfig);
    getTotalPrice(collectionfig);
  }

  const getTotalPieces = (col:Figure[])=> {
      const sum = col.reduce((accumulator,object)=>{
        return accumulator + Number(object.quantity)
      },0);
      setTotalPieces(sum);
  }
  const getTotalPrice =(col:Figure[])=>{
    const sumprice = col.reduce((accumulator,object)=>{
      return accumulator + (Number(object.quantity)* Number(object.price))
    },0);
    setTotalPrice(sumprice);
  }

  useEffect(() => {
    getList();
  }, []);

  // useEffect(() => {
    
  //   const receiveFigures =(figures:Figure[])=>{
  //     updateListInfo(figures);
  //     console.log(figures);
  //   };
  //   socket.on('list',receiveFigures);

  //   return ()=>{
  //     socket.off('list',receiveFigures)
  //   }
   
  // }, [])

  return (
    <Layout title="Figure Colection List">
      
      {
        collection.length === 0 ?(<CollectionEmpty/>) 
        :(
          // <FavoritePokemons pokemons={favoritePokemons}/>
          <Fragment>
            <StatsBar itemsTotal={totalPieces} pricetotal={totalPrice}/>
            <CollectionList figures={collection}/>

          </Fragment>
          
        )
      }
      <Spinner open={loading} />
    </Layout>
  )
}
export default ListPage