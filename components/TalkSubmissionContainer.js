import React from 'react'
import Head from 'react-helmet'
import {
  createContainer,
  query,
  BodyRenderer
} from '@phenomic/preset-react-app/lib/client'
import { Link } from 'react-router'
import hello from 'hellojs'
import GitHub from 'github-api'
import Form from 'react-jsonschema-form'
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl'

import Layout from './Layout'
import MeetupPreview from './MeetupPreview'

hello.init(
  {
    github: 'Iv1.c13e7b19e913ffeb'
  },
  {
    redirect_uri: 'http://127.0.0.1:3333/propositions/sujet'
  }
)

const schema = {
  type: 'object',
  required: ['title', 'description'],
  properties: {
    title: {
      type: 'string',
      title: 'Titre'
    },
    description: {
      type: 'string',
      title: 'Description'
    },
    kind: {
      type: 'string',
      title: 'Type de sujet',
      enum: ['Long', 'Short'],
      enumNames: [' Long (20 mins + questions)', ' Court (5 mins)'],
      default: 'Long'
    },
    slideLink: {
      type: 'string',
      format: 'uri',
      title: 'Lien des slides'
    },
    projectLink: {
      type: 'string',
      format: 'uri',
      title: 'Lien du projet'
    },
    twitter: {
      type: 'string',
      title: 'Twitter'
    }
  }
}

const uiSchema = {
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

class TalkSubmissionForm extends React.Component {
  render() {
    return (
      <Form
        className="card talkSubmission__form"
        schema={schema}
        uiSchema={uiSchema}
        onSubmit={this.props.onSubmit}
      >
        <div className="formGroup">
          <input type="submit" value="Soumettre" className="btn" />
        </div>
      </Form>
    )
  }
}

class TalkSubmissionSummary extends React.Component {
  render() {
    return (
      <div className="card talkSubmission__form">
        <p>
          <FormattedMessage id="TALK_SUBMITTED_PRE" />{' '}
          <a href={this.props.talkSubmissionLink}>
            <FormattedMessage id="TALK_SUBMITTED_HERE" />
          </a>{' '}
          <FormattedMessage id="TALK_SUBMITTED_POST" />
        </p>
        <input
          type="button"
          value="Submit a new talk"
          className="btn"
          onClick={this.props.onSubmit}
        />
      </div>
    )
  }
}

class TalkSubmissionLoginButton extends React.Component {
  render() {
    return (
      <div className="card talkSubmission__form">
        <p>
          <FormattedMessage id="NEED_LOGIN_BEFORE" />
        </p>
        <input
          type="button"
          value="Login avec github"
          className="btn"
          onClick={this.props.onSubmit}
        />
      </div>
    )
  }
}

class TalkSubmissionContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      githubToken: getHelloGithubCred()
    }
  }

  componentDidMount() {
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
