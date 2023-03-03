import React, { useState } from 'react';
import { Page } from './Page';

import apiURL from '../api';

export const PagesList = ({ pages, setIsListView }) => {
  const [pageDetails, setPageDetails] = useState();

  async function getDetails(page) {
    try {
      const res = await fetch(`${apiURL}/wiki/${page.slug}`);
      const data = await (res).json();

      setPageDetails(data);
      setIsListView(false);
    } catch (err) {
      console.log(err);
    }
  }

	return <>
		{
      !pageDetails ? pages.map((page, i) => {
				return (
          <div key = { i }>
            <h3>{page.title}</h3>
            <button onClick = { () => getDetails(page) }>Read Page</button>
          </div>
        )
			}) :
      <Page page = { pageDetails } setPageDetails = { setPageDetails } setIsListView = { setIsListView }/>
		}
	</>
} 
