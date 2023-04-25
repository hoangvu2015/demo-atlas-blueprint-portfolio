import React, { useState } from 'react'
import { gql, useQuery, useMutation } from '@apollo/client';
const ClientRenderingTest = () => {

  const [comment, setComment] = useState('')

  const {data, loading, fetchMore} = useQuery(ClientRenderingTest.query);
  const [createComment, {commentData}] = useMutation(ClientRenderingTest.createComment);
  console.log(data, loading, 'ClientRenderingTest');

  const createCommentEvent = (e) => {
    if (comment) {
      createComment({variables: {input: comment}})
    }
  }

  const comments = data?.comments?.nodes
  if (loading) return (<></>);
  return (
    <div>
      {comments && comments.length > 0 && comments.map((comment, idx) => {
        return <div key={comment?.id} className='mb-5' style={{padding: 12, boxShadow: '0 0 1px 1px #ccc', marginBottom: 24}}>
          <div dangerouslySetInnerHTML={{__html: comment?.content}}></div>
          <h5><strong>{comment?.author?.node?.name}</strong></h5>
        </div>
      })}

      <div>
        <h3>Create new Comment</h3>
        <input type="text" value={comment} onChange={(e) => {setComment(e.target.value)}} />
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
        content
      }
    }
  }
`;