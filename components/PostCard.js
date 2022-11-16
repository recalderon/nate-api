import { useState } from 'react';
import { useRouter } from 'next/router';

export default function PostCard({ post }) {
    const [publishing, setPublishing] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const router = useRouter();
    
    // Delete post
    const deletePost = async (postId) => {
        //change deleting state
        setDeleting(true);

        try {
            // Delete post
            await fetch('/api/posts', {
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
            <th scope="row">{post.convidado}</th>
            <td>{post.nomecompleto}</td>
            <td>{post.rsvp}</td>
            <td>{post.goodies}</td>
            <td><button type="button" onClick={() => deletePost(post['_id'])}>
                {deleting ? 'Deleting' : 'Delete'}
            </button></td>
            </tr>
        </>
    );
}