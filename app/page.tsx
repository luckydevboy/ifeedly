import { Card } from "@/app/components";
import { feed } from "@/app/data";

export default function Home() {
  return (
    <main className="p-8">
      {feed.map((post, index) => (
        <>
          {index !== 0 && <hr className="my-4 border-gray-200" />}
          <Card key={post.id} {...post} />
        </>
      ))}
    </main>
  );
}
