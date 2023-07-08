import { useEffect, useState } from "react";

function useClient() {
  //STATES
  const [isClient, setIsClient] = useState(false);

  //LIFE CYCLE HOOKS
  useEffect(() => setIsClient(true), []);

  return isClient;
}

export default useClient;
