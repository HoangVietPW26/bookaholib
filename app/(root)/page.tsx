import Image from "next/image";
import { Button } from "@/components/ui/button";
import BookOverview from "@/components/BookOverview";
import BookList from "@/components/BookList";
import { sampleBooks } from "../constants";
import { db } from "@/database/drizzle";
import {users, books} from "@/database/schema"
import { auth } from "@/auth";
import { desc } from "drizzle-orm";

const Home = async() => {
  const res = await db.select().from(users)
  const session = await auth()

  const latestBooks = await db
    .select()
    .from(books)
    .limit(10)
    .orderBy(desc(books.createdAt)) as Book[]

  return (
    <>
    <BookOverview {...latestBooks[0]} userId={session?.user?.id as string} />
    <BookList 
    title="Latest Book"
    books={latestBooks}
    containerClassName="mt-28"
    />
    </>
  );
}

export default Home;
