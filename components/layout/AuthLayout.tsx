import Head from 'next/head';
import { FC, ReactNode } from 'react';

interface Props{
    children:ReactNode,
    title?:string
}

export const AuthLayout:FC<Props>  = ({children,title}) => {
    return (
        <>
            <Head>
                <title>{title || 'Login Page'}</title>
                <meta name="author" content="Cristian Aguilar"/>
                <meta name="description" content="Calendario en next"/>
                <meta name="keywords" content="XXX,calendario"/>
            </Head>
    
            <main style={{padding:'0'}}>
                {children}
            </main>
        </>
      )
}
