import { authApi } from '@/api';
import { CollectionList } from '@/components/collection';
import { Layout } from '@/components/layout'
import { CollectionEmpty, Spinner } from '@/components/ui';
import { Figure, ICollection } from '@/interfaces';
import { AxiosRequestConfig } from 'axios';
import { NextPage } from 'next'
import { useEffect, useState } from 'react'



const ListPage: NextPage = () => {
  const [collection, setCollection] = useState<Figure[]>([]);
  const [loading, setLoading] = useState(false)

  const getList = async()=> {
    try {
      const config: AxiosRequestConfig = {
        method: "GET", 
        url: 'inventory/collection',
        headers: {
          'Content-Type': 'application/json',
        //   'Authorization':`${token}`, TODO:Add token 
          'Accept': 'application/json'
        }
    };

    setLoading(true);

    const data:ICollection = await (await authApi(config)).data;
    
    // console.log(data.figures);

    if(data){
      setLoading(false);
      setCollection(data.figures);
    }

    } catch (error) {
      setLoading(false);
      console.log('Error on getList')
    }
    
  }

  useEffect(() => {
    getList();
  }, [])
  
  return (
    <Layout title="collection">
      {
        collection.length === 0 ?(<CollectionEmpty/>) 
        :(
          // <FavoritePokemons pokemons={favoritePokemons}/>
          
          <CollectionList figures={collection}/>
        )
      }
      <Spinner open={loading} />
    </Layout>
  )
}
export default ListPage