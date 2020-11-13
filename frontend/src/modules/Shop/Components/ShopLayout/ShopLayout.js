import Header from "@shop/Components/Header/Header";
import Footer from "@shop/Components/Footer/Footer";

export default function ShopLayout({ children }) {
  React.useEffect(() => {
    window.fbAsyncInit = function () {
      FB.init({
        xfbml: true,
        version: "v9.0",
      });
    };

    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");

    var Tawk_API = Tawk_API || {},
      Tawk_LoadStart = new Date();
    (function () {
      var s1 = document.createElement("script"),
        s0 = document.getElementsByTagName("script")[0];
      s1.async = true;
      s1.src = "https://embed.tawk.to/5fade92f7279c47e5dcf68f8/default";
      s1.charset = "UTF-8";
      s1.setAttribute("crossorigin", "*");
      s0.parentNode.insertBefore(s1, s0);
    })();
  }, []);
  return (
    <>
      <Header />
      <div style={{ marginTop: 140 }}>{children}</div>
      <Footer />

      <div id="fb-root"></div>
      <div
        className="fb-customerchat"
        attribution="setup_tool"
        page_id="162807341083416"
        theme_color="#0A7CFF"
        logged_in_greeting="Hi! Bạn cần shop tư vấn gì ạ?"
        logged_out_greeting="Hi! Bạn cần shop tư vấn gì ạ?"
      ></div>
    </>
  );
}
