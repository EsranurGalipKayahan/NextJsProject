import React from "react";
import { API_URL } from "@/config/index";
import EventItem from "../../components/EventItem";
import { Layout } from "../../components/Layout";
const PER_PAGE = 1;

const EventsPage = ({ events }) => {
  return (
    <Layout>
      <h1>Events</h1>
      {events.length === 0 && <h3>There is no events to show</h3>}
      {events.map((e) => (
        <EventItem key={e.id} evt={e} />
      ))}
    </Layout>
  );
};

export async function getServerSideProps({ query: { page = 1 } }) {
  //Calculate start page, + koyarak onune page string onu integer yaptik
  /*  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE;

  //fetch total account
  const totalRes = await fetch(`${API_URL}/api/eventss/count`);
  const data = await totalRes.json();
  console.log(data);
  //fetch events
  const res = await fetch(
    `${API_URL}/api/eventss?populate=image&_limit=${PER_PAGE}&_start=${start}`
  );
  const events = await res.json();
  */

  //fetch events
  const res = await fetch(`${API_URL}/api/eventss?populate=image`);
  const events = await res.json();

  return {
    //props: { events: events.data, page: +page ,totalCOunt},
    props: { events: events.data },
  };
}
export default EventsPage;
