import React from "react";
import "./DescriptionBox.css";

const DescriptionBox = () => {
  return (
    <div className="descriptionbox">
      <div className="descriptionbox-navigator">
        <div className="descriptionbox-nav-box">Description</div>
        <div className="descriptionbox-nav-box fade">Reviews {122}</div>
      </div>
      <div className="descriptionbox-description">
        <p>
          Indian e-commerce website that provides online retail services across
          multiple product categories, including electronics, clothing, home
          essentials, and personal accessories. The platform allows customers to
          browse, select, and purchase products through a web-based interface
          and mobile devices
        </p>
        <p>
          ShopEase was established to create a streamlined shopping environment
          for users seeking convenience and accessibility. The website was
          developed with the aim of offering a centralized platform where
          customers could find a variety of products without visiting physical
          stores. Over time, it has expanded its product listings and improved
          its user interface to support a wider audience
        </p>
      </div>
    </div>
  );
};

export default DescriptionBox;
