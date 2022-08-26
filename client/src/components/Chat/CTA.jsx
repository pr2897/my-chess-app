import React from "react";

const CTA = ({ from, message, createdAt }) => {
  return (
    <li
      className={`cta__message cta__message_${
        from === "me" ? "from" : "to"
      }_me`}
    >
      {message}
    </li>
  );
};

export default CTA;
