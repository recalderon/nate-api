import Head from 'next/head';
import Image from 'next/image'

import 'bootstrap/dist/css/bootstrap.css'
import PostCard from '../components/PostCard';

export default function Home({ goodies }) {
    return (
        <div>
            <Head >
                <title>Home</title>
            </Head>

            <main>

                <div className="bg-black text-center py-1 d-flex flex-column flex-md-row align-items-center gap-4 justify-content-center p-4 p-md-0">
                    <Image src="/assets/dist/img/logo.svg" alt="me" width="300" height="150" />
                    <h4 className='text-uppercase text-white'>Lista de convidados confirmados e o que vão trazer</h4>
                </div>
                <div className='container my-4'>
                    {goodies.length === 0 ? (
                        <h2>Ninguém respondeu</h2>
                    ) : (
                        <>
                        <div className="d-flex flex-column flex-md-row gap-4 align-items-center justify-content-center text-uppercase mb-4">
                            <h4 className="m-0 p-0">Total de {goodies.reduce((resultSet, item) => resultSet.add(typeof "convidado" === 'string' ? item["convidado"] : "convidado"(item)), new Set).size} confirmados</h4>
                        </div>
                        <div className='table-responsive'>
                            <table className="table table-striped align-middle">
                                <thead className='table-dark'>
                                    <tr>
                                        <th className='text-center'>@</th>
                                        <th className='text-center'>Nome</th>
                                        <th className='text-center'>RSVP</th>
                                        <th className='text-center'>O que vai trazer?</th>
                                        <th className='text-center'>Action</th>
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
