
// import CardList from "@/components/CardList/CardList";
import ClientCardList from "@/components/CardList/CliCardList";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-slate-100">
      <ClientCardList />
    </main>
  );
}
