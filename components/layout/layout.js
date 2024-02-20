import { Fragment } from "react";
//import HeadContent from "../Home/HeaderContent";

function Layout(props) {
  return (
    <Fragment>
      {/* <HeadContent /> */}
      <main>{props.children}</main>
    </Fragment>
  );
}

export default Layout;
