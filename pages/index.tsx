import { AuthLayout } from "@/components/layout";
import { LoginForm } from "@/components/ui";
import { Spacer } from "@nextui-org/react";
import { Fragment } from "react";

export default function Home() {

  return (
    <Fragment>
      <AuthLayout title="My figure collection">
        <Spacer y={2.5} />
        <LoginForm/>
      </AuthLayout>
    </Fragment>
  )
}
