import RichTextEditor, { DEFAULT_CONTROLS } from "@mantine/rte"
import _ from "lodash"
import React from 'react'
import { TextEditorBox } from "../../../pages/Create/Styles"

function TextEditor({text, debounceFunction, isFront}: {text: string, debounceFunction: React.Dispatch<React.SetStateAction<string>>, isFront: boolean}) {
  
    var debouncer = _.debounce(debounceFunction, 50)

  return (
    <TextEditorBox>
      <h2 style={{textAlign: "center"}}>{isFront ? "Front" : "Back"} </h2>
      <RichTextEditor controls={DEFAULT_CONTROLS} value={text} onChange={debouncer}/>
    </TextEditorBox>
  )
}

export default React.memo(TextEditor)