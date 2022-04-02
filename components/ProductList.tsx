import { Fav, Product } from '@prisma/client'
import React from 'react'
import useSWR from 'swr'
import Item from './Item'

interface TypeFavs {
  [key: string]: TypeProduct[];
}

interface TypeProduct extends Fav{
  product: TyFavCount;
}

interface TyFavCount extends Product{ 
  _count: {
    favs: number;
  }
}

interface TypeKind {
  kind: 'favs' | 'sales' | 'puchases' ;
}


export default function ProductList( { kind }: TypeKind ) {
  const {data} = useSWR<TypeFavs>(`/api/users/me/${kind}`)

  return data ?(
    <>
    {data[kind]?.map((data) => (
      <Item 
        key={data.product.id}
        id={data.product.id} 
        title={data.product.name}
        price={data.product.price}
        hearts={data.product._count.favs}  
        comments={1}
      />
    ))}
    </>
  ) : null ;
}
