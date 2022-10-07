import React from "react";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { Layout } from "../../components/Layout";
import { API_URL } from "@/config/index";
import styles from "@/styles/Event.module.css";
import Image from "next/image";
import Link from "next/link";

const EventPage = ({ evt }) => {
  const router = useRouter();
  const deleteEvent = async (e) => {
    if (confirm("Are you sure?")) {
      const res = await fetch(`${API_URL}/api/eventss/${evt.id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message);
      } else {
        router.push("/events");
      }
    }
  };
  return (
    <Layout title={`Event ${evt.attributes.name}`}>
      <div className={styles.event}>
        <div className={styles.controls}>
          <Link href={`/events/edit/${evt.id}`}>
            <a>
              <FaPencilAlt /> Edit Event
            </a>
          </Link>
          <a href="#" className={styles.delete} onClick={deleteEvent}>
            <FaTimes /> Delete EVent
          </a>
        </div>
        <span>
          {new Date(evt.attributes.date).toLocaleDateString("en-US")} at{" "}
          {evt.attributes.time}
        </span>
        <h1>{evt.attributes.name}</h1>
        {evt?.attributes?.image?.data.attributes.formats.medium.url && (
          <div className={styles.image}>
            <Image
              src={evt.attributes.image.data.attributes.formats.medium.url}
              width={960}
              height={600}
            />
          </div>
        )}
        <h3>Performers:</h3>
        <p>{evt.attributes.performers}</p>
        <h3>DEscription</h3>
        <p>{evt.attributes.description}</p>
        <h3>Venue : {evt.venue}</h3>
        <p>{evt.attributes.address}</p>
        <Link href={"/events"}>
          <a className={styles.back}>{"<"} Go Back</a>
        </Link>
      </div>
      <ToastContainer />
    </Layout>
  );
};
export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/api/eventss?populate=image`);
  const events = await res.json();
  const paths = events.data.map((evt) => ({
    params: {
      slug: evt.attributes.slug?.toString() ?? "",
    },
  }));

  return { paths, fallback: false };
}
export async function getStaticProps({ params: { slug } }) {
  const res = await fetch(`${API_URL}/api/eventss?populate=image`);
  const evt = await res.json();

  return {
    props: {
      evt: evt.data.find((e) => e.attributes.slug === slug),
    },
    revalidate: 1,
  };
}
/*export async function getServerSideProps({ query: { slug } }) {
  const res = await fetch(`${API_URL}/api/events/${slug}`);
  const events = await res.json();

  return {
    props: { evt: events[0] },
  };
}*/
export default EventPage;
