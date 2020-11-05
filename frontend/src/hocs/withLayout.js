function DefaultLayout({ children }) {
  return <div>{children}</div>;
}

function withLayout(Component, Layout = DefaultLayout) {
  return <Layout>{Component}</Layout>;
}

export default withLayout;
