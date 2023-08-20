import BlogPagination, { getStaticProps } from "./page/[slug]";
import React, { useEffect } from 'react';
import jwt from 'jsonwebtoken';
import axios from 'axios';

const SERVICE_ACCOUNT_PRIVATE_KEY = require('/json/indexing-google.json');

function HomePage() {
  useEffect(() => {
    // Generate a JWT using the private key
    const token = jwt.sign({}, SERVICE_ACCOUNT_PRIVATE_KEY, { algorithm: 'RS256' });

    // Make a POST request to the Google Indexing API
    axios.post('https://indexing.googleapis.com/v3/urlNotifications:publish', {
      url: 'https://www.placea.in/',
      type: 'URL_UPDATED', // or 'URL_DELETED'
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      // Handle the response data
    })
    .catch(error => {
      // Handle errors
    });
  }, []);

  return (
    <div>
      {/* Your JSX content */}
    </div>
  );
}
export { getStaticProps };
export default BlogPagination;