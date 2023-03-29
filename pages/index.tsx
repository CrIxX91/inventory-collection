import { LoginForm } from "@/components/ui";
import { Spacer } from "@nextui-org/react";
import { Fragment } from "react";

export default function Home() {

  return (
    <Fragment>
      <Spacer y={2.5} />
      <LoginForm/>
    </Fragment>
  )
}
