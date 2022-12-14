import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import styles from "@/styles/Form.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Layout } from "@/components/Layout";
import { API_URL } from "@/config/index";
import { parseCookies } from "helpers";

const AddEventPage = ({ token }) => {
  const router = useRouter();
  const [values, setValues] = useState({
    name: "",
    performers: "",
    venue: "",
    address: "",
    date: "",
    time: "",
    description: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const hasEmptyFields = Object.values(values).some(
      (element) => element === ""
    );
    if (hasEmptyFields) {
      toast.error("Please fill in all fields");
    }
    const newValues = {
      data: {
        ...values,
        slug: values.name.charAt(0).toLowerCase() + values.name.slice(1),
      },
    };

    const res = await fetch(`${API_URL}/api/eventss`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newValues),
    });

    if (!res.ok) {
      toast.error("Something went wrong");
    } else {
      const evt = await res.json();
      router.push(`/events/${evt.data.attributes.slug}`);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setValues({ ...values, [name]: value });
  };
  return (
    <Layout title={"Add New Event"}>
      <Link href={"/events"}>
        <a>Go Back</a>
      </Link>
      <h1>Add Event</h1>
      <ToastContainer />
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          <div>
            <label htmlFor="event">Event Name</label>
            <input
              type={"text"}
              id="name"
              name="name"
              value={values.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="performers">Performers</label>
            <input
              type="text"
              name="performers"
              id="performers"
              value={values.performers}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="venue">Venue</label>
            <input
              type="text"
              name="venue"
              id="venue"
              value={values.venue}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              name="address"
              id="address"
              value={values.address}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="date">Date</label>
            <input
              type="date"
              name="date"
              id="date"
              value={values.date}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="time">Time</label>
            <input
              type="text"
              name="time"
              id="time"
              value={values.time}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div>
          <label htmlFor="description">Event Description</label>
          <textarea
            type="text"
            name="description"
            id="description"
            value={values.description}
            onChange={handleInputChange}></textarea>
        </div>

        <input type="submit" value="Add Event" className="btn" />
      </form>
    </Layout>
  );
};

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req);

  return {
    props: { token },
  };
}
export default AddEventPage;
