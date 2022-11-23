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

            <main>

                <div className="bg-black text-center py-1 d-flex flex-row align-items-center gap-4 justify-content-center">
                    <Image src="/assets/dist/img/logo.svg" alt="me" width="300" height="150" />
                    <h4 className='text-uppercase text-white'>Lista de convidados confirmados e o que vão trazer</h4>
                </div>
                <div className={styles.container}>
                    {goodies.length === 0 ? (
                        <h2>Ninguém respondeu</h2>
                    ) : (
                        <>
                        <div className="d-flex flex-row gap-4 align-items-center justify-content-center text-uppercase mb-4">                            
                            <h4 className="m-0 p-0">Total de {goodies.reduce((resultSet, item) => resultSet.add(typeof "convidado" === 'string' ? item["convidado"] : "convidado"(item)), new Set).size} confirmados</h4>
                        </div>
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
                                    {
                                    goodies.map((goodie, i) => (
                                        <PostCard goodie={goodie} key={i} />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        </>
                        
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
