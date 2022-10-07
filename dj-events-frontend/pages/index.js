import { Layout } from "../components/Layout";
import { API_URL } from "@/config/index";
import EventItem from "../components/EventItem";

export default function Home({ events }) {
  return (
    <Layout>
      <h1>Upcoming Events</h1>
      {events.length === 0 && <h3>There is no events to show</h3>}
      {events.map((e) => (
        <EventItem key={e.id} evt={e} />
      ))}
    </Layout>
  );
}

export async function getStaticProps() {
  // const res = await fetch(`${API_URL}/api/events`);
  const res = await fetch(
    `${API_URL}/api/eventss?populate=image&_sort=date:ASC&_limit=3`
  );
  const events = await res.json();

  return {
    //props: { events: events.slice(0, 3) }, kendi localhostumuzdan api varken
    props: { events: events.data },
    revalidate: 1,
  };
}
