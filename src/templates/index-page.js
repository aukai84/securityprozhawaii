import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'

import Layout from '../components/Layout'
import Features from '../components/Features'
import BlogRoll from '../components/BlogRoll'

import logoWithText from '../img/logo_with_text.png'
import productsImage from '../img/products.jpg';

export const IndexPageTemplate = ({
  image,
  title,
  heading,
  subheading,
  mainpitch,
  description,
  intro,
}) => (
  <div>
    <div
      className="full-width-image margin-top-0"
      style={{
        backgroundImage: `url(${
          !!image.childImageSharp ? image.childImageSharp.fluid.src : image
        })`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div
        style={{
          display: 'flex',
          height: '150px',
          lineHeight: '1',
          justifyContent: 'space-around',
          alignItems: 'left',
          flexDirection: 'column',
        }}
      >
        {/* <h1
          className="has-text-weight-bold is-size-3-mobile is-size-2-tablet is-size-1-widescreen"
          style={{
            color: 'white',
            lineHeight: '1',
            padding: '0.25em',
          }}
        >
          {title}
        </h1> */}
        {/* <h3
          className="has-text-weight-bold is-size-5-mobile is-size-5-tablet is-size-4-widescreen"
          style={{
            boxShadow:
              'rgb(255, 68, 0) 0.5rem 0px 0px, rgb(255, 68, 0) -0.5rem 0px 0px',
            backgroundColor: 'rgb(255, 68, 0)',
            color: 'white',
            lineHeight: '1',
            padding: '0.25em',
          }}
        >
          {subheading}
        </h3> */}
      </div>
    </div>
    <section className="section section--gradient">
      <div className="container">
        <div className="section">
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <div className="content">
                <div className="content pb-6 border-bottom has-text-centered">
                  <div className="pb-6 has-text-centered">
                    <img src={logoWithText} />
                  </div>
                  <div className="has-text-centered">
                    <h1 className="title has-text-primary">{mainpitch.title}</h1>
                  </div>
                  <div className="tile">
                    <h3 className="subtitle">{mainpitch.description}</h3>
                  </div>
                </div>
                <div className="content pt-6">
                  <div>
                    <img src={productsImage} />
                  </div>
                </div>
                <div className="columns">
                  <div className="column is-12 has-text-centered">
                    <h3 className="has-text-weight-semibold is-size-4">
                      {heading}
                    </h3>
                    <p>{description}</p>
                  </div>
                </div>
                <Features imageWidth="125px" gridItems={intro.blurbs} />
                <section className="section">
                  <div className="container">
                    <div className="content">
                      <h1>Contact</h1>
                      <form
                        name="contact"
                        method="post"
                        action="/contact/thanks/"
                        data-netlify="true"
                        data-netlify-honeypot="bot-field"
                      >
                        {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
                        <input type="hidden" name="form-name" value="contact" />
                        <div hidden>
                          <label>
                            Don’t fill this out:{' '}
                            <input name="bot-field"/>
                          </label>
                        </div>
                        <div className="field">
                          <label className="label" htmlFor={'name'}>
                            Your name
                          </label>
                          <div className="control">
                            <input
                              className="input"
                              type={'text'}
                              name={'name'}
                              id={'name'}
                              required={true}
                            />
                          </div>
                        </div>
                        <div className="field">
                          <label className="label" htmlFor={'email'}>
                            Email
                          </label>
                          <div className="control">
                            <input
                              className="input"
                              type={'email'}
                              name={'email'}
                              id={'email'}
                              required={true}
                            />
                          </div>
                        </div>
                        <div className="field">
                          <label className="label" htmlFor={'message'}>
                            Message
                          </label>
                          <div className="control">
                            <textarea
                              className="textarea"
                              name={'message'}
                              id={'message'}
                              required={true}
                            />
                          </div>
                        </div>
                        <div className="field">
                          <button className="button is-primary is-light is-link" type="submit">
                            CONNECT WITH OUR TEAM 
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </section>
                {/* <div className="columns">
                  <div className="column is-12 has-text-centered">
                    <Link className="btn" to="/services">
                      See all services 
                    </Link>
                  </div>
                </div>
                <div className="column is-12">
                  <h3 className="has-text-weight-semibold is-size-2">
                    Latest stories
                  </h3>
                  <BlogRoll />
                  <div className="column is-12 has-text-centered">
                    <Link className="btn" to="/blog">
                      Read more
                    </Link>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
)

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  subheading: PropTypes.string,
  mainpitch: PropTypes.object,
  description: PropTypes.string,
  intro: PropTypes.shape({
    blurbs: PropTypes.array,
  }),
}

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <Layout>
      <IndexPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        heading={frontmatter.heading}
        subheading={frontmatter.subheading}
        mainpitch={frontmatter.mainpitch}
        description={frontmatter.description}
        intro={frontmatter.intro}
      />
    </Layout>
  )
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default IndexPage

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        heading
        subheading
        mainpitch {
          title
          description
        }
        description
        intro {
          blurbs {
            image {
              childImageSharp {
                fluid(maxWidth: 240, quality: 64) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            heading
            text
          }
          heading
          description
        }
      }
    }
  }
`
