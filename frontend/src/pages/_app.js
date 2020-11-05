import { wrapper } from "store/store";
import { PrivateRoute } from "hocs/PrivateRoute";
import { PersistGate } from "redux-persist/integration/react";
import { useStore, useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import Error from "next/error";
import "react-toastify/dist/ReactToastify.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";

import AdminLayout from "@admin/Components/AdminLayout/AdminLayout";
import ShopLayout from "@shop/Components/ShopLayout/ShopLayout";
import theme from "configs/theme";



const WrappedApp = ({ Component, pageProps, router }) => {
  const store = useStore();
  const dispatch = useDispatch();
  // Handle error from api request of each pages SSR or something
  // if (pageProps.error) {
  //   return <Error statusCode={pageProps.error.statusCode} title={pageProps.error.message} />;
  // }
  if (router.pathname.startsWith("/admin")) {
    return (
      <PersistGate persistor={store.__persistor} loading={<h1>loading</h1>}>
        <PrivateRoute>
          <AdminLayout>
            <ToastContainer />
            <Component {...pageProps} />
          </AdminLayout>
        </PrivateRoute>
      </PersistGate>
    );
  }

  //The solution for HTML elements missing SSR with redux-persits
  return (
    <PersistGate persistor={store.__persistor} loading={null}>
      {() => (
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ShopLayout>
            <ToastContainer />
            <Component {...pageProps} />           
          </ShopLayout>          
        </ThemeProvider>        
      )}
    </PersistGate>
  );
};

export default wrapper.withRedux(WrappedApp);
