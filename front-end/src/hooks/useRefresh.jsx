import { useState, useEffect } from "react";

function useRefresh() {
  const [data, setData] = useState();
  const [refreshInterval, setRefreshInterval] = useState(refreshInUrl || 0);
  const fetchMetrics = () => {
    // retrieve and then setData()
  };
  useEffect(() => {
    if (refreshInterval && refreshInterval > 0) {
      const interval = setInterval(fetchMetrics, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [refreshInterval]);
  return (
    <div>
      // dashboard content, including a dropdown for the // refresh interval,
      which calls setRefreshInterval()
    </div>
  );
}

export default useRefresh;
