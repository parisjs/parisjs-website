import React from 'react'
import Head from 'next/head'
import Form from 'react-jsonschema-form'
import { injectIntl, FormattedMessage } from 'react-intl'
import {
  signinToGitHub,
  createGitHubIssue,
  initGithubAuthentication,
} from '../lib/github'

const TalkSubmissionForm = injectIntl(
  class extends React.Component {
    componentWillMount() {
      this.setupSchema(this.props.intl)
    }

    componentWillReceiveProps({ intl }) {
      this.setupSchema(intl)
    }

    setupSchema(intl) {
      this.schema = {
        type: 'object',
        required: ['title', 'description'],
        properties: {
          title: {
            type: 'string',
            title: intl.formatMessage({ id: 'TALK_SCHEMA_TITLE' }),
          },
          description: {
            type: 'string',
            title: intl.formatMessage({ id: 'TALK_SCHEMA_DESCRIPTION' }),
          },
          kind: {
            type: 'string',
            title: intl.formatMessage({ id: 'TALK_SCHEMA_FORMAT' }),
            enum: ['Long', 'Short'],
            enumNames: [
              intl.formatMessage({ id: 'TALK_SCHEMA_FORMAT_LONG' }),
              intl.formatMessage({ id: 'TALK_SCHEMA_FORMAT_SHORT' }),
            ],
            default: 'Long',
          },
          slideLink: {
            type: 'string',
            format: 'uri',
            title: intl.formatMessage({ id: 'TALK_SCHEMA_SLIDES' }),
          },
          projectLink: {
            type: 'string',
            format: 'uri',
            title: intl.formatMessage({ id: 'TALK_SCHEMA_PROJECT' }),
          },
          twitter: {
            type: 'string',
            title: 'Twitter',
          },
        },
      }
    }
    schema = {}
    uiSchema = {
      description: {
        'ui:widget': 'textarea',
        'ui:options': {
          rows: 5,
        },
      },
      kind: {
        'ui:widget': 'radio',
      },
      slideLink: {
        'ui:placeholder': 'http://',
      },
      projectLink: {
        'ui:placeholder': 'http://',
      },
      twitter: {
        'ui:placeholder': '@parisjs',
      },
    }

    render() {
      return (
        <Form
          className="card talkSubmission__form"
          schema={this.schema}
          uiSchema={this.uiSchema}
          onSubmit={this.props.onSubmit}
        >
          <div className="formGroup">
            <input
              type="submit"
              value={this.props.intl.formatMessage({ id: 'SUBMIT_TALK' })}
              className="btn"
            />
          </div>
        </Form>
      )
    }
  }
)

const TalkSubmissionSummary = injectIntl(
  class extends React.Component {
    render() {
      const { intl } = this.props
      return (
        <div className="card talkSubmission__form">
          <p
            dangerouslySetInnerHTML={{
              __html: intl.formatMessage({
                id: 'TALK_SUBMITTED',
                values: { link: this.props.talkSubmissionLink },
              }),
            }}
          />
          <input
            type="button"
            value={this.props.intl.formatMessage({ id: 'SUBMIT_TALK' })}
            className="btn"
            onClick={this.props.onSubmit}
          />
        </div>
      )
    }
  }
)

const TalkSubmissionLoginButton = injectIntl(
  class extends React.Component {
    render() {
      return (
        <div className="card talkSubmission__form">
          <p>
            <FormattedMessage id="NEED_LOGIN_BEFORE" />
          </p>
          <input
            type="button"
            value={this.props.intl.formatMessage({ id: 'LOGIN_GITHUB' })}
            className="btn"
            onClick={this.props.onSubmit}
          />
        </div>
      )
    }
  }
)

class TalkSubmissionContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      githubToken: null,
    }
  }

  componentDidMount() {
    this.setState({
      githubToken: initGithubAuthentication(),
    })
  }

  handleSubmit = ({ formData }) => {
    const { githubToken } = this.state
    createGitHubIssue({
      githubToken,
      formData,
    })
      .then(({ data }) => {
        this.setState({ talkSubmissionLink: data.html_url })
      })
      .catch(() => {
        // should handle the errors
      })
  }

  handleLogin = () => {
    signinToGitHub().then((event) => {
      this.setState({
        githubToken: event.authResponse.access_token,
      })
    })
  }

  resetForm = () => {
    this.setState({ talkSubmissionLink: null })
  }

  render() {
    const { intl } = this.props
    return (
      <>
        <FormattedMessage id="SUBMIT_TALK">
          {([message]) => (
            <Head>
              <title>{message}</title>
            </Head>
          )}
        </FormattedMessage>

        <div className="container talkSubmission">
          <h1>
            <FormattedMessage id="SUBMIT_TALK" />
          </h1>
          <div
            dangerouslySetInnerHTML={{
              __html: intl.formatMessage({
                id: 'TALK_EXPLAIN',
                values: { link: 'https://github.com/parisjs/talks/issues' },
              }),
            }}
          />
          {this.state.githubToken ? (
            !this.state.talkSubmissionLink ? (
              <TalkSubmissionForm onSubmit={this.handleSubmit} />
            ) : (
              <TalkSubmissionSummary
                talkSubmissionLink={this.state.talkSubmissionLink}
                onSubmit={this.resetForm}
              />
            )
          ) : (
            <TalkSubmissionLoginButton onSubmit={this.handleLogin} />
          )}
        </div>
      </>
    )
  }
}

export default injectIntl(TalkSubmissionContainer)
