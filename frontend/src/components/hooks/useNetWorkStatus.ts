import { useEffect, useState } from "react"

export default function useNetworkStatus() {
  const [isOnline, setOnline] = useState<boolean>(true)

  const updateNetworkStatus = () => {
    setOnline(navigator.onLine)
    console.log("Network status: " + navigator.onLine)
  }

  useEffect(() => {
    updateNetworkStatus()

    window.addEventListener("load", updateNetworkStatus)
    window.addEventListener("online", updateNetworkStatus)
    window.addEventListener("offline", updateNetworkStatus)

    return () => {
      window.removeEventListener("load", updateNetworkStatus)
      window.removeEventListener("online", updateNetworkStatus)
      window.removeEventListener("offline", updateNetworkStatus)
    }
  }, [])

  return isOnline
}