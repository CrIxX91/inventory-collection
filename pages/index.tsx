import { AuthLayout } from "@/components/layout";
import { LoginForm } from "@/components/ui";
import { Spacer } from "@nextui-org/react";
import Cookies from "js-cookie";
import { NextPage } from "next";
import { Fragment } from "react";

const HomePage: NextPage = () => {

  return (
    <Fragment>
      <AuthLayout title="My figure collection">
        <Spacer y={2.5} />
        <LoginForm/>
      </AuthLayout>
    </Fragment>
  )
}

export async function getServerSideProps(context:any) {

  const { accessToken } = context.req.cookies;
  // console.log(accessToken);
  
  if(accessToken) {
    return {
      redirect: {
        permanent: false,
        destination: '/collection/add'
      }
    }
  }

  return {
    props: {
      
    }
  }
}

export default HomePage