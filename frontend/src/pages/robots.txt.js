import React from "react";

const getRobots = () => `User-agent: *
Disallow: /_next/static/
Disallow: /api/*
`;

class Robots extends React.Component {
  static async getInitialProps({ res }) {
    res.setHeader("Content-Type", "text/plain");
    res.write(getRobots());
    res.end();
  }
}

export default Robots;
