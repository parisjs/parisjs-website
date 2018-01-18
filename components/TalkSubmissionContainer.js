import React from 'react'
import Head from 'react-helmet'
import {
  createContainer,
  query,
  BodyRenderer
} from '@phenomic/preset-react-app/lib/client'
import { Link } from 'react-router'
import GitHub from 'github-api'
import Form from 'react-jsonschema-form'
import { injectIntl, FormattedMessage, FormattedHTMLMessage } from 'react-intl'

import Layout from './Layout'
import MeetupPreview from './MeetupPreview'

try {
  /**
   * Use OAuth proxy https://auth-server.herokuapp.com
   * See with PierrickP
   */
  hello.init(
    {
      github: 'Iv1.558c5d3bf74f6921'
    },
    {
      redirect_uri: 'https://parisjs.org/propositions/sujet'
    }
  )
} catch (e) {}

function getHelloGithubCred() {
  const helloCreds = localStorage.getItem('hello')

  if (helloCreds) {
    const parsedData = JSON.parse(helloCreds)

    return parsedData.github && parsedData.github.access_token
      ? parsedData.github.access_token
      : null
  } else {
    return null
  }
}

function formatTalkSubmission({
  title,
  kind,
  description,
  slideLink,
  projectLink,
  twitter
}) {
  const formattedDescription = description.replace(/(.+)/g, '> $1')
  return `
## ${title}

*Talk format :* ${kind}

*Description :*

${formattedDescription}

*Slides :* ${slideLink}
*Projet :* ${projectLink}
*Twitter :* ${twitter}
`
}

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
            title: intl.formatMessage({ id: 'TALK_SCHEMA_TITLE' })
          },
          description: {
            type: 'string',
            title: intl.formatMessage({ id: 'TALK_SCHEMA_DESCRIPTION' })
          },
          kind: {
            type: 'string',
            title: intl.formatMessage({ id: 'TALK_SCHEMA_FORMAT' }),
            enum: ['Long', 'Short'],
            enumNames: [
              intl.formatMessage({ id: 'TALK_SCHEMA_FORMAT_LONG' }),
              intl.formatMessage({ id: 'TALK_SCHEMA_FORMAT_SHORT' })
            ],
            default: 'Long'
          },
          slideLink: {
            type: 'string',
            format: 'uri',
            title: intl.formatMessage({ id: 'TALK_SCHEMA_SLIDES' })
          },
          projectLink: {
            type: 'string',
            format: 'uri',
            title: intl.formatMessage({ id: 'TALK_SCHEMA_PROJECT' })
          },
          twitter: {
            type: 'string',
            title: 'Twitter'
          }
        }
      }
    }
    schema = {}
    uiSchema = {
      description: {
        'ui:widget': 'textarea',
        'ui:options': {
          rows: 5
        }
      },
      kind: {
        'ui:widget': 'radio'
      },
      slideLink: {
        'ui:placeholder': 'http://'
      },
      projectLink: {
        'ui:placeholder': 'http://'
      },
      twitter: {
        'ui:placeholder': '@parisjs'
      }
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
      return (
        <div className="card talkSubmission__form">
          <p>
            <FormattedHTMLMessage
              id="TALK_SUBMITTED"
              values={{ link: this.props.talkSubmissionLink }}
            />
          </p>
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
      githubToken: null
    }
  }

  componentDidMount() {
    this.setState({
      githubToken: getHelloGithubCred()
    })
    hello.on('auth.login', () => {
      const auth = hello('github').getAuthResponse()

      this.setState({
        githubToken: auth.access_token
      })
    })
  }

  handleSubmit = ({ formData }) => {
    const { githubToken } = this.state
    const gh = new GitHub({ token: githubToken })

    const remoteIssues = gh.getIssues('PierrickP', 'fluffy-octo-broccoli')

    remoteIssues
      .createIssue({
        title: formData.title,
        body: formatTalkSubmission(formData)
      })
      .then(({ status, data }) => {
        if (status === 201) {
          this.setState({ talkSubmissionLink: data.html_url })
        }
        // should handle the errors
      })
      .catch(() => {
        // should handle the errors
      })
  }

  handleLogin = () => {
    hello('github').login()
  }

  resetForm = () => {
    this.setState({ talkSubmissionLink: null })
  }

  render() {
    return (
      <Layout>
        <Head>
          <title>Hello world</title>
          <meta name="description" content="Everything is awaysome!" />
        </Head>

        <div className="container talkSubmission">
          <h1>
            <FormattedMessage id="SUBMIT_TALK" />
          </h1>
          <p>
            <FormattedHTMLMessage id="TALK_EXPLAIN" />
          </p>
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
      </Layout>
    )
  }
}

export default TalkSubmissionContainer
