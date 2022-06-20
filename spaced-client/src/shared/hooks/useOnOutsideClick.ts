import { MutableRefObject, RefObject, useEffect, useRef } from "react";

const useOnOutsideClick = (
  $ignoredElementRefs: RefObject<any>,
  $listeningElementRef: RefObject<any>,
  onOutsideClick: Function
) => {
  const $mouseDownTargetRef = useRef() as MutableRefObject<any>;

  useEffect(() => {
    const handleMouseDown = (event: any) => {
      $mouseDownTargetRef.current = event.target;
    };

    const handleMouseUp = (event: any) => {
      if (event.button !== 0) return;
      for (const elem of $mouseDownTargetRef.current.children) {
        if ($ignoredElementRefs.current === elem) onOutsideClick();
      }
    };

    const $listeningElement = ($listeningElementRef || {}).current || document;

    $listeningElement.addEventListener("mousedown", handleMouseDown);
    $listeningElement.addEventListener("mouseup", handleMouseUp);
    return () => {
      $listeningElement.removeEventListener("mousedown", handleMouseDown);
      $listeningElement.removeEventListener("mouseup", handleMouseUp);
    };
  }, [$ignoredElementRefs, $listeningElementRef, onOutsideClick]);
};

export default useOnOutsideClick;
