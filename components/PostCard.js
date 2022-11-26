import { useState } from 'react';
import { useRouter } from 'next/router';

export default function PostCard({ goodie }) {
    const [deleting, setDeleting] = useState(false);
    const router = useRouter();

    // Delete post
    const deletePost = async (postId) => {
        //change deleting state
        setDeleting(true);

        try {
            // Delete post
            await fetch('/api/goodies', {
                method: 'DELETE',
                body: postId,
            });

            // reset the deleting state
            setDeleting(false);

            // reload the page
            return router.push(router.asPath);
        } catch (error) {
            // stop deleting state
            return setDeleting(false);
        }
    };
    function getGoodie(){
        let teste = JSON.parse(goodie.goodies).map(function(item, i){
            let qtd = '';
            let goodieitem = '';
            goodieitem = item.goodies
            qtd = item.qtd
            return <><li className='list-group-item d-flex justify-content-between align-items-center'>{goodieitem}<span class="badge bg-primary rounded-pill">{qtd}</span></li></>
        });

        return teste
    }
    if(goodie.rsvp === 'sim'){
        if (goodie.goodies.includes('qtd')){
            return <>
                <tr>
                    <td>{goodie.convidado}</td>
                    <td>{goodie.nomecompleto}</td>
                    <td>{goodie.rsvp}</td>
                    <td>
                        <ul className='list-group list-group-flush'>{getGoodie()}</ul>
                    </td>
                    <td><button className='btn btn-sm btn-danger' type="button" onClick={() => deletePost(goodie['_id'])}>
                        {deleting ? 'Apagando' : 'Apagar'}
                    </button></td>
                </tr>
            </>
        }else{
            return <>
                <tr>
                    <td>{goodie.convidado}</td>
                    <td>{goodie.nomecompleto}</td>
                    <td>{goodie.rsvp}</td>
                    <td>
                        <ul className='list-group list-group-flush'>
                            <li className='list-group-item d-flex justify-content-between align-items-center'>{goodie.goodies}<span class="badge bg-primary rounded-pill">{goodie.qtd}</span></li>
                        </ul>
                    </td>
                    <td><button className='btn btn-sm btn-danger' type="button" onClick={() => deletePost(goodie['_id'])}>
                        {deleting ? 'Apagando' : 'Apagar'}
                    </button></td>
                </tr>
            </>
        }
    }
}