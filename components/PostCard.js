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
    return (
        <>
            <tr>
                <td>{goodie.convidado}</td>
                <td>{goodie.nomecompleto}</td>
                <td>{goodie.rsvp}</td>
                <td>{goodie.qtd}</td>
                <td>{goodie.goodies}</td>
                <td><button type="button" onClick={() => deletePost(goodie['_id'])}>
                    {deleting ? 'Apagando' : 'Apagar'}
                </button></td>
            </tr>
        </>
    );
}