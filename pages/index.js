import Head from 'next/head';

import 'bootstrap/dist/css/bootstrap.css'
import Nav from '../components/Nav';
import PostCard from '../components/PostCard';
import styles from '../styles/Home.module.css';

export default function Home({ posts }) {
    return (
        <div>
            <Head>
                <title>Home</title>
            </Head>

            <Nav />

            <main>
                <div className={styles.container}>
                    {posts.length === 0 ? (
                        <h2>No added posts</h2>
                    ) : (
                        <div className='table-responsive'>
                            <table className="table">
                            <thead>
                                <tr>
                                <th scope="col">@</th>
                                <th scope="col">Nome</th>
                                <th scope="col">RSVP</th>
                                <th scope="col">Goodies</th>
                                <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                            {posts.map((post, i) => (
                                <PostCard post={post} key={i} />
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

    let response = await fetch(`${dev ? DEV_URL : PROD_URL}/api/posts`);
    // extract the data
    let data = await response.json();

    return {
        props: {
            posts: data['message'],
        },
    };
}
