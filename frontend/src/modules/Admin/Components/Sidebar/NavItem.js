import React, { forwardRef } from "react";
import Link from "next/link";

const NavItem = (props) => {
  const { onClick, link, children } = props;

  // If link is not set return the orinary ListItem
  if (!link || typeof link !== "string") {
    return <div onClick={onClick}>{children}</div>;
  }

  // Return a LitItem with a link component
  return (
    <Link href={link} as={link}>
      {children}
    </Link>
  );
};

export default NavItem;
