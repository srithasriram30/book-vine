import SearchBar from "@/components/SearchBar";

export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen p-24">
      <h1 className="text-4xl font-bold">Welcome to Bookvine</h1>
      <SearchBar />
    </div>
  );
}
