import { useQuery } from "./hooks";
import { AnimeService } from "./services";

function App() {
  const { data, error, isLoading } = useQuery<{ links: { next: string } }>(
    AnimeService.get
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return <>{data?.links.next}</>;
}

export default App;
