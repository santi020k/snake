/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'

const useKeyDown = (handler: (event: KeyboardEvent) => void, deps = []) => {
  useEffect(() => {
    document.addEventListener("keydown", handler)
    // clean up
    return () => {
      document.removeEventListener("keydown", handler)
    }
  }, deps)
}

const useTimeout = (callback: () => void, timeout: number, deps = []) => {
  useEffect(() => {
    const timeoutReference = setTimeout(callback, timeout)

    return () => { clearTimeout(timeoutReference) }
  }, deps)
}

export { useKeyDown, useTimeout }
