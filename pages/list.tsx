import { Fragment, useEffect, useRef, useState } from 'react';
import { NextPage } from 'next';
import { AxiosRequestConfig } from 'axios';
import { authApi } from '@/api';
import { CollectionList } from '@/components/collection';
import { Layout } from '@/components/layout'
import { CollectionEmpty, Spinner, StatsBar } from '@/components/ui';
import { Figure, ICollection } from '@/interfaces';
import io from 'socket.io-client';

// const socket = io('http://localhost:4000');
const socket = io('http://localhost:4000');

const ListPage: NextPage = () => {
  
  // const socket = useRef();
  const [collection, setCollection] = useState<Figure[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalPieces, setTotalPieces] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

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

  useEffect(() => {
    const receiveFigures =(figures:Figure[])=>{
      updateListInfo(figures);
    };
    socket.on('Figures',receiveFigures);
   
  }, [])

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