import React, { useState, useEffect } from "react";
import { PagesList } from "./PagesList";
import { AddPage } from "./AddPage";

import apiURL from "../api";

export const App = () => {
  const [pages, setPages] = useState([]);
  const [isAddingPage, setIsAddingPage] = useState(false);
  const [isListView, setIsListView] = useState(true);

  useEffect(() => {
    fetchPages();
  }, [isAddingPage, isListView]);

  async function fetchPages() {
    try {
      const response = await fetch(`${apiURL}/wiki`);
      const pagesData = await response.json();
      setPages(pagesData);
    } catch (err) {
      console.log("Oh no an error! ", err);
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
      ) : 
        <AddPage setIsAddingPage= { setIsAddingPage }/>
      }
    </main>
  );
};
