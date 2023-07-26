import * as React from "react"
import { Link } from "gatsby";
import Layout from "../components/layout";
import { StaticImage } from "gatsby-plugin-image";

const IndexPage = () => {
  return (
    <Layout>
      <StaticImage
        alt="Digital Creator"
        src="../images/digital-creator.png"
      />
    </Layout>
  )
}

export default IndexPage

export const Head = () => <title>Home Page</title>
