import { useQuery } from "@tanstack/react-query";
import { apiService } from "./services/api";
import { QUERY_KEYS } from "./constants/queryKeys";

function App() {
  const {
    data: message,
    isLoading,
    error,
  } = useQuery({
    queryKey: QUERY_KEYS.TEST,
    queryFn: apiService.fetchTest,
    select: (data) => data.message,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred</div>;

  return <div>{message}</div>;
}

export default App;
