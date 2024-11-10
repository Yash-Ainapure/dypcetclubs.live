import React from "react";
import { Helmet } from "react-helmet";

const Metadata: React.FC = () => (
  <Helmet>
    <title>College Clubs Management | Track Events & Hiring</title>
    <meta
      name="description"
      content="An initiative to manage all college clubs and their hiring process through a user-friendly website."
    />
    <meta
      name="keywords"
      content="College Clubs, Club Management, Events, Hiring, College Website"
    />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta property="og:title" content="College Clubs Management" />
    <meta
      property="og:description"
      content="Track college club events and manage hiring processes through a central platform."
    />
    <meta property="og:url" content="https://dypcetclubs-live.onrender.com" />
    <meta property="og:type" content="website" />
    <meta name="robots" content="index, follow" />
    <link rel="icon" href="/favicon.ico" />
  </Helmet>
);

export default Metadata;
