import React, { Suspense } from 'react'
import i18next from 'i18next'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import {
  signinToGitHub,
  createGitHubIssue,
  initGithubAuthentication,
} from '../lib/github'

const Form = dynamic(() => import('react-jsonschema-form'))

class TalkSubmissionForm extends React.Component {
  componentWillMount() {
    this.setupSchema()
  }

  setupSchema() {
    this.schema = {
      type: 'object',
      required: ['title', 'description'],
      properties: {
        title: {
          type: 'string',
          title: i18next.t('TALK_SCHEMA_TITLE'),
        },
        description: {
          type: 'string',
          title: i18next.t('TALK_SCHEMA_DESCRIPTION'),
        },
        kind: {
          type: 'string',
          title: i18next.t('TALK_SCHEMA_FORMAT'),
          enum: ['Long', 'Short'],
          enumNames: [
            i18next.t('TALK_SCHEMA_FORMAT_LONG'),
            i18next.t('TALK_SCHEMA_FORMAT_SHORT'),
          ],
          default: 'Long',
        },
        slideLink: {
          type: 'string',
          format: 'uri',
          title: i18next.t('TALK_SCHEMA_SLIDES'),
        },
        projectLink: {
          type: 'string',
          format: 'uri',
          title: i18next.t('TALK_SCHEMA_PROJECT'),
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
      <Suspense fallback={<div>Loading...</div>}>
        <Form
          className="card talkSubmission__form"
          schema={this.schema}
          uiSchema={this.uiSchema}
          onSubmit={this.props.onSubmit}
        >
          <div className="formGroup">
            <input
              type="submit"
              value={i18next.t('SUBMIT_TALK')}
              className="btn"
            />
          </div>
        </Form>
      </Suspense>
    )
  }
}

function TalkSubmissionSummary({ onSubmit, talkSubmissionLink }) {
  return (
    <div className="card talkSubmission__form">
      <p
        dangerouslySetInnerHTML={{
          __html: i18next.t('TALK_SUBMITTED', {
            link: talkSubmissionLink,
          }),
        }}
      />
      <input
        type="button"
        value={i18next.t('SUBMIT_TALK')}
        className="btn"
        onClick={onSubmit}
      />
    </div>
  )
}

function TalkSubmissionLoginButton({ onSubmit }) {
  return (
    <div className="card talkSubmission__form">
      <p>{i18next.t('NEED_LOGIN_BEFORE')}</p>
      <input
        type="button"
        value={i18next.t('LOGIN_GITHUB')}
        className="btn"
        onClick={onSubmit}
      />
    </div>
  )
}

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
    return (
      <>
        <Head>
          <title>{i18next.t('SUBMIT_TALK')}</title>
        </Head>

        <div className="container talkSubmission">
          <h1>{i18next.t('SUBMIT_TALK')}</h1>
          <div
            dangerouslySetInnerHTML={{
              __html: i18next.t('TALK_EXPLAIN', {
                link: 'https://github.com/parisjs/talks/issues',
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

export default TalkSubmissionContainer
