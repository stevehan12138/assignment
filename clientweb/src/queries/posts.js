import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import React from 'react';

const Posts = () => {
    const ALL_POST_QUERY = gql`
    query AllPostQuery {
      getAllPosts {
          title
          text
          id
      }
    }
    `;
    const { data, loading, error } = useQuery(ALL_POST_QUERY);
    if (loading) return <p>loading</p>;
    if (error) return <p>ERROR</p>;
    if (!data) return <p>Not found</p>;
  
    return data.getAllPosts.map((each) =>
      <Post id={ each.id } title={ each.title } text={ each.text } />
    );
  }
  
  
function Post(props) {
    return (
        <div class="card my-3" id={ props.id }>
            <div class="card-header">{ props.title }</div>
            <div class="card-body">
                <p class="card-text">{ props.text }</p>
            </div>
            <div className="card-footer bg-transparent">
                    <button type="button" className="btn btn-primary editbtn">Edit</button>
                    <button type="button" className="btn btn-secondary deletebtn">Delete</button>
            </div>
        </div>
    );
}
  
  export default Posts;