import React from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { logout, logoutSuccess } from "modules/Auth/Login/login.slice";

function Admin() {
  const user = useSelector((state) => state.login.user);
  const dispatch = useDispatch();
  return (
    <>
      <h1>Dashboard</h1>
      <Link href="/admin">
        <a>Admin</a>
      </Link>
      <Link href="/admin/categories/create">
        <a>categories</a>
      </Link>
      <Link href="/">
        <a>index</a>
      </Link>
      <p
        onClick={() => {         
          dispatch(logout());
        }}
      >
        Logout
      </p>
    </>
  );
}
// export const getServerSideProps = async function () {
//   console.log("chay admin");
//   return { props: { a: 1 } };
// };

// Admin.getInitialProps = async function () {
//   console.log("chay admin");
//   return { props: { a: 1 } };
// };
export default Admin;
