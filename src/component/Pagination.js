import React from "react";

const Pagination = ({ post, totalPost, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPost / post); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <ul
        style={{
          listStyle: "none",
          display: "flex",
          justifyContent: "center",
          paddingLeft: "0px",
          marginBottom: "0px",
          padding: "15px",
        }}
      >
        {pageNumbers.map((number) => (
          <li key={number}>
            <a
              style={{
                margin: "10px",
                backgroundColor: "#0072e5",
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textDecoration: "none",
                fontWeight: "700",
                color: "white",
              }}
              onClick={() => paginate(number)}
              href="#!"
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Pagination;
