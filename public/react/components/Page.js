import React from "react";

// TODO: Tidy Date Created?

export const Page = ({ page, setPageDetails, setIsListView }) => {

  return (
    <>
      <h3>{ page.title }</h3>
      <p>Author: {page.author.name}</p>
      <p>Content: {page.content}</p>
      <p>Date Created: {page.createdAt}</p>
      {page.tags.map((tag, i) => {
        return <p key={i}>#{tag.name}</p>;
      })}
      <button 
        onClick = { () => {
          setPageDetails();
          setIsListView(true); 
        }}
      >Back to Wiki List</button>
    </>
  );
};
