import React, { useState } from "react";

import apiURL from "../api";

export const AddPage = ({ setIsAddingPage }) => {
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [tags, setTags] = useState();

  const onFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${apiURL}/wiki`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          content,
          name,
          email,
          tags
        })
      });
      await res.json();

      if(res.status === 200) {
        setTitle();
        setContent();
        setName();
        setEmail();
        setTags();
        setIsAddingPage(false);
      } else {
        throw new Error('Something went wrong!')
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <h3>Add a Page</h3>
      <form onSubmit={ onFormSubmit }>
        <input
          type="text"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        ></input>
        <br />
        <br />
        <input
          type="text"
          placeholder="Article Content"
          onChange={(e) => setContent(e.target.value)}
        ></input>
        <br />
        <br />
        <input
          type="text"
          placeholder="Author Name"
          onChange={(e) => setName(e.target.value)}
        ></input>
        <br />
        <br />
        <input
          type="email"
          placeholder="Author Email"
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <br />
        <br />
        <input
          type="text"
          placeholder="Tags"
          onChange={(e) => setTags(e.target.value)}
        ></input>
        <br />
        <br />
        <button type="submit" disabled = { email && title && content && name ? false : true }>Add Page</button>
        <button onClick = { () => { setIsAddingPage(false) }}>Back to Wiki List</button>
      </form>
    </div>
  )
};
