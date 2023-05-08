import React, { useEffect, useState } from 'react'
import { gql, useQuery, useMutation } from '@apollo/client';
const ClientRenderingTest = () => {

  const [comment, setComment] = useState('')
  const [comments, setComments] = useState([])

  const { data, loading } = useQuery(ClientRenderingTest.query);
  const [createComment, result] = useMutation(ClientRenderingTest.createComment);
  // const [deleteComment, deleteCommentResult] = useMutation(ClientRenderingTest.deleteComment);

  const createCommentEvent = () => {
    if (comment) {
      createComment({ variables: { input: comment } })
    }
  }

  useEffect(() => {
    if (data) {
      const comments = data?.comments?.nodes
      setComments(comments)
    }
  }, [data])
  useEffect(() => {
    if (result?.data) {
      const newComment = result?.data?.createComment?.comment
      setComments(prev => {
        const tmp = prev.filter(comment => comment.id === newComment.id)
        return tmp.length ? [...prev, newComment] : prev
      })
      // }
    }
  }, [result.data])


  if (loading) return (<></>);
  return (
    <div>
      {comments && comments.length > 0 && comments.map((comment) => {
        return <div key={comment?.id} className='mb-5' style={{ padding: 12, boxShadow: '0 0 1px 1px #ccc', marginBottom: 24, position: 'relative' }} data-id={comment.id}>
          <div dangerouslySetInnerHTML={{ __html: comment?.content }}></div>
          <h5><strong>{comment?.author?.node?.name}</strong></h5>
          {/* <button onClick={() => {deleteCommentEvent(comment.id)}}>Delete Comment</button> */}
        </div>
      })}

      <div>
        <h3>Create new Comment</h3>
        <input type="text" value={comment} onChange={(e) => { setComment(e.target.value) }} />
        <button onClick={createCommentEvent}>Create</button>
      </div>
    </div>
  )
}

export default ClientRenderingTest;

ClientRenderingTest.query = gql`
  query {
    comments {
        nodes {
          id
          author {
            node {
              name
            }
          },
          content
        }
    }
  }
`;
ClientRenderingTest.createComment = gql`
  mutation CreateComment ($input: String!) {
    createComment(
      input: {approved: "true", author: "tuan.ly", authorEmail: "tuan.ly@9thwonder.com", commentOn: 1, content: $input, date: "02/23/2023", parent: "", status: APPROVE, type: ""}
    ) {
      comment {
        id
        content
        author {
          node {
            name
          }
        }
      }
    }
  }
`;
ClientRenderingTest.deleteComment = gql`
mutation DeleteComment ($id: ID!) {
  deleteComment(input:{id: $id}) {
    deletedId
  }
}
`;