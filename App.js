import React from 'react'
import { Router, Route, browserHistory } from 'react-router'
import { createApp, renderApp } from '@phenomic/preset-react-app/lib/client'

import Html from './components/Html'
import PageError from './components/PageError'

import FAQContainer from './components/FAQContainer'
import HomeContainer from './components/HomeContainer'
import MeetupContainer from './components/MeetupContainer'
import SponsorSubmissionContainer from './components/SponsorSubmissionContainer'
import TalkSubmissionContainer from './components/TalkSubmissionContainer'

const routes = () => (
  <Router history={ browserHistory }>
    <Route path="/" component={ HomeContainer } />
    <Route path="/faq" component={ FAQContainer } />
    <Route path="/after/:after" component={ HomeContainer } />
    <Route path="/meetup/*" component={ MeetupContainer } />
    <Route path="/propositions/talk" component={ TalkSubmissionContainer } />
    <Route path="/propositions/sponsor" component={ SponsorSubmissionContainer } />
    <Route path="*" component={PageError} />
  </Router>
)

export default createApp(routes, Html)

if (module.hot) {
  module.hot.accept(() => renderApp(routes))
}
