import { Button, SharedButtonProps } from "@mantine/core"
import { TestButton } from "./Styles"

function RectangleBtn({props, children}: {props?: SharedButtonProps, children?: string}) {
  return (
    <Button loading={props?.loading} type={props?.type} >
        <TestButton>{children}</TestButton>
    </Button>
  )
}

export default RectangleBtn