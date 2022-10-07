import React from "react";
import { API_URL } from "@/config/index";
import EventItem from "../../components/EventItem";
import { Layout } from "../../components/Layout";
import { useRouter } from "next/router";
import Link from "next/link";

const SearchPage = ({ events }) => {
  const router = useRouter();
  return (
    <Layout title={"Search Results"}>
      <Link href="/events">
        <a>Go Back</a>
      </Link>
      <h1>Search Results for {router.query.term}</h1>
      {events.length === 0 && <h3>There is no events to show</h3>}
      {events.map((e) => (
        <EventItem key={e.id} evt={e} />
      ))}
    </Layout>
  );
};

export async function getServerSideProps({ query: { term } }) {
  const res = await fetch(
    `${API_URL}/api/eventss?name_contains=${term}&populate=image`
  );
  const events = await res.json();

  return {
    props: { events: events.data },
  };
}
export default SearchPage;
