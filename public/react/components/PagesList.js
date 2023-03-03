import React, { useState } from "react";
import { Page } from "./Page";

import apiURL from "../api";

export const PagesList = ({ pages, setIsListView }) => {
  const [page, setpage] = useState();

  async function getpage(page) {
    try {
      const res = await fetch(`${apiURL}/wiki/${page.slug}`);
      const data = await res.json();

      setpage(data);
      setIsListView(false);
    } catch (err) {
      console.log(err);
    }
  }

  async function onDelete(page) {
    try {
        const res = await fetch(`${apiURL}/wiki/${page.slug}`, {
        method: "DELETE"
      });
      await res.json();

      if(res.ok) {
        setpage();
        setIsListView(true);
      } else {
        throw new Error('Something went wrong!')
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      {!page ? (
        pages.map((page, i) => {
          return (
            <div key={i}>
              <h3>{page.title}</h3>
              <button onClick={() => getpage(page)}>Read Page</button>
            </div>
          );
        })
      ) : (
        <div>
          <Page
            page={page}
          />
          <button
            onClick={() => {
              setpage();
              setIsListView(true);
            }}
          >
            Back to Wiki List
          </button>
          <button onClick={() => { onDelete(page) }}>Delete</button>
        </div>
      )}
    </>
  );
};
