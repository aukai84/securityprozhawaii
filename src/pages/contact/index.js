import React from 'react'
import { navigate } from 'gatsby-link'
import Layout from '../../components/Layout'

function encode(data) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

export default class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isValidated: false }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': form.getAttribute('name'),
        ...this.state,
      }),
    })
      .then(() => navigate(form.getAttribute('action')))
      .catch((error) => alert(error))
  }

  render() {
    const { contact } = this.state;
    return (
      <Layout>
        <section className="section">
          <div className="container">
            <div className="content">
              <h1 className="has-text-weight-medium">Contact Us</h1>
              <form
                name={contact}
                method="post"
                action="/contact/thanks/"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                onSubmit={this.handleSubmit}
              >
                {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
                <input type="hidden" name="form-name" value="contact" />
                <div hidden>
                  <label>
                    Don’t fill this out:{' '}
                    <input name="bot-field" onChange={this.handleChange} />
                  </label>
                </div>
                <div className="field">
                  {/* <label className="label" htmlFor={'name'}>
                    Name 
                  </label> */}
                  <div className="control">
                    <input
                      className="input"
                      type={'text'}
                      name={'name'}
                      onChange={this.handleChange}
                      id={'name'}
                      placeholder={'Name'}
                      required={true}
                    />
                  </div>
                </div>
                <div className="field">
                  {/* <label className="label" htmlFor={'phoneNumber'}>
                    Phone Number 
                  </label> */}
                  <div className="control">
                    <input
                      className="input"
                      type={'tel'}
                      name={'phoneNumber'}
                      onChange={this.handleChange}
                      id={'phoneNumber'}
                      placeholder={'Phone Number'}
                      required={true}
                    />
                  </div>
                </div>
                <div className="field">
                  {/* <label className="label" htmlFor={'email'}>
                    Email
                  </label> */}
                  <div className="control">
                    <input
                      className="input"
                      type={'email'}
                      name={'email'}
                      onChange={this.handleChange}
                      id={'email'}
                      placeholder={'Email Address'}
                      required={true}
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label" htmlFor={'contact'}>
                  Who would you like to get in touch with? 
                  </label>
                  <div className="control">
                    <div className="select">
                      <select 
                      defaultValue="default"
                      className="select"
                      name={'contact'}
                      id={'contact'}
                      required={true}
                      onChange={this.handleChange}
                      >
                        <option value="default">Select ... </option>
                        <option value="sales" >Sales</option>
                        <option value="service" >Service</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="field">
                  <label className="label has-text-weight-normal" htmlFor={'message'}>
                    Please leave a brief message addressing your inquiry below 
                  </label>
                  <div className="control">
                    <textarea
                      className="textarea"
                      name={'message'}
                      onChange={this.handleChange}
                      id={'message'}
                      placeholder={'Message'}
                      required={true}
                    />
                  </div>
                </div>
                <div className="field">
                  <button className="btn is-parimary is-light is-link" type="submit">
                    CONTACT US 
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </Layout>
    )
  }
}
