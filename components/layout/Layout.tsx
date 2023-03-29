import Head from "next/head"
import { FC, ReactNode } from "react"
import { Navbar } from "../ui"

interface Props{
    children:ReactNode,
    title?:string
}

export const Layout:FC<Props> = ({children,title}) => {
    return (
        <>
            <Head>
                <title>{title || 'CalendarApp'}</title>
                <meta name="author" content="Cristian Aguilar"/>
                <meta name="description" content="Calendario en next"/>
                <meta name="keywords" content="XXX,calendario"/>
            </Head>
    
            <Navbar/>
    
            <main style={{padding:'0'}}>
                {children}
            </main>
        </>
      )
}
