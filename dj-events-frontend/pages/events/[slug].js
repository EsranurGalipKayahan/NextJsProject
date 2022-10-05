import React from 'react'
import {useRouter} from "next/router"
import { Layout } from '../components/Layout';
const EventPage = () => {

    const router = useRouter();
    console.log(router)


  return (
    <Layout title={`Event - ${router.query.slug}`}>
      <h3>My Events</h3>
    </Layout>
  )
}

export default EventPage
