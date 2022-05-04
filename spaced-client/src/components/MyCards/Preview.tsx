import { Drawer } from "@mantine/core"
import React from 'react'
import StudyScreen from "../Study/StudyScreen"
import {PreviewPropsTypes} from '../../types/props'

function Preview({appProps}: {appProps: PreviewPropsTypes}) {
    const {previewOpened, setPreviewOpened, details} = appProps
  return (
    <Drawer opened={previewOpened} position="bottom" size="95%" onClose={() => setPreviewOpened(false)} withCloseButton={true}>
        <StudyScreen details={details} closePreview={setPreviewOpened}/>
    </Drawer>
  )
}

export default Preview