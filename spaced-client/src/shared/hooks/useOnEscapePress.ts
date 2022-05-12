import React, {useEffect} from 'react'

function useOnEscapePress(onPress: Function) {

    const onPressHandler = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onPress()
    }
  useEffect(() => {
      document.body.addEventListener('keyup', onPressHandler)

      return () => document.body.removeEventListener('keyup', onPressHandler)

  })
}

export default useOnEscapePress