import React from 'react'
import i18next from 'i18next'
import Head from 'next/head'

function TalkSubmissionLoginButton() {
  return (
    <div className="card talkSubmission__form">
      <p>{i18next.t('NEED_LOGIN_BEFORE')}</p>
      <a
        href="https://github.com/parisjs/talks/issues/new?assignees=&labels=&template=cfp.yml"
        className="btn"
      >
        {i18next.t('SUBMIT_TALK_ON_GITHUB')}
      </a>
    </div>
  )
}

class TalkSubmissionContainer extends React.Component {
  render() {
    return (
      <>
        <Head>
          <title>{i18next.t('SUBMIT_TALK')}</title>
        </Head>

        <TalkSubmissionLoginButton onSubmit={this.handleLogin} />
      </>
    )
  }
}

export default TalkSubmissionContainer
