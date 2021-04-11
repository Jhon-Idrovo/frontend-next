import { withRouter } from "next/router";
import Head from "next/head";

function Layout({ children, router, isLoged }) {
  return <>{children}</>;
}

export default Layout;
