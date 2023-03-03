import React, { useState, useEffect } from "react";
import { PagesList } from "./PagesList";

import apiURL from "../api";

// TODO: Bug- Fix POST issue, not reaching inside submit? Syntax error?

export const App = () => {
  const [pages, setPages] = useState([]);
  const [isAddingPage, setIsAddingPage] = useState(false);
  const [isListView, setIsListView] = useState(true);
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [tags, setTags] = useState();

  useEffect(() => {
    fetchPages();
  }, [isListView]);

  async function fetchPages() {
    try {
      const response = await fetch(`${apiURL}/wiki`);
      const pagesData = await response.json();
      setPages(pagesData);
    } catch (err) {
      console.log("Oh no an error! ", err);
    }
  }

  const onFormSubmit = async (e) => {
    e.preventDefault();

    // add POST
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
      const data = await res.json();

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
    <main>
      <h1>WikiVerse</h1>
      <h2>An interesting 📚</h2>
      {!isAddingPage ? (
        <div>
          <PagesList
            pages={pages}
            setIsListView={setIsListView}
          />
          {isListView && (
            <button onClick={() => setIsAddingPage(true)}>
              Click to Add Page
            </button>
          )}
        </div>
      ) : (
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
      )}
    </main>
  );
};
