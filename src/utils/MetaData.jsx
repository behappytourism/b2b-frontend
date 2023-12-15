import React from "react";
import { Helmet } from "react-helmet";
import { config } from "../constants";

const MetaData = ({ title, link_title, description, thumbnail, website }) => {
  return (
    <Helmet>
      <title>{`${title} - ${config.TITLE_NAME} Travel and Tourism LLC`} </title>
      <meta
        property={`og:title`}
        content={`${link_title} - ${config.TITLE_NAME}`}
      />
      <meta property={`og:description`} content={description} />
      <meta
        property={`og:image:secure_url`}
        itemprop="image"
        content={config.SERVER_URL + thumbnail}
      />
      <meta property="og:type" content="website" />
    </Helmet>
  );
};

export default MetaData;
