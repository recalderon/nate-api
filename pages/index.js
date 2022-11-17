import Head from 'next/head';
import Image from 'next/image'

import 'bootstrap/dist/css/bootstrap.css'
import PostCard from '../components/PostCard';
import styles from '../styles/Home.module.css';



export default function Home({ goodies }) {
    return (
        <div>
            <Head >
                <title>Home</title>
            </Head>
        </div>
    );
}

export async function getServerSideProps(ctx) {
    // get the current environment
    let dev = process.env.NODE_ENV !== 'production';
    let { DEV_URL, PROD_URL } = process.env;

    // request posts from api

    let response = await fetch(`${dev ? DEV_URL : PROD_URL}/api/goodies`);
    // extract the data
    let data = await response.json();

    return {
        props: {
            goodies: data['message'],
        },
    };
}
