import { LoginForm } from "@/components/ui"
import { Spacer } from "@nextui-org/react"
import { Fragment } from "react"


const login = () => {
  return (
    <Fragment>
      <Spacer y={2.5} />
      <LoginForm/>
    </Fragment>
    
  )
}

export default login