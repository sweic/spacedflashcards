import React from 'react'
import {RichTextEditor} from '@mantine/rte'
import {DEFAULT_CONTROLS} from '../../constants/index'
import _ from 'lodash'
import { TextEditorPropTypes } from "../../types/props"

function Text({text, debounceFunction}: {text: string, debounceFunction: React.Dispatch<React.SetStateAction<string>>}) {
  
    var debouncer = _.debounce(debounceFunction, 50)

  return (
    <RichTextEditor  classNames={{root: "root-rte"}} controls={DEFAULT_CONTROLS} value={text} onChange={debouncer}/>
  )
}

export default React.memo(Text)