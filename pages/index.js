import Head from 'next/head';

import 'bootstrap/dist/css/bootstrap.css'
import Nav from '../components/Nav';
import PostCard from '../components/PostCard';
import styles from '../styles/Home.module.css';

export default function Home({ goodies }) {
    return (
        <div>
            <Head>
                <title>Home</title>
            </Head>

            <Nav />

            <main>
                <div className={styles.container}>
                    {goodies.length === 0 ? (
                        <h2>No added posts</h2>
                    ) : (
                        <div className='table-responsive'>
                            <table className="table">
                            <thead>
                                <tr>
                                <th scope="col">@</th>
                                <th scope="col">Nome</th>
                                <th scope="col">RSVP</th>
                                <th scope="col">Qtd</th>
                                <th scope="col">Goodies</th>
                                <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                            {goodies.map((goodie, i) => (
                                <PostCard goodie={goodie} key={i} />
                            ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </main>
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
