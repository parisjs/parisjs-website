import React from 'react'
import Head from 'react-helmet'
import { createContainer, query, BodyRenderer } from '@phenomic/preset-react-app/lib/client'
import { Link } from 'react-router'
import hello from 'hellojs'
import GitHub from 'github-api'
import Form from 'react-jsonschema-form'

import Layout from './Layout'
import MeetupPreview from './MeetupPreview'

hello.init({
  github: 'Iv1.c13e7b19e913ffeb'
}, {
  redirect_uri: 'http://127.0.0.1:3333/propositions/sujet'
});

const schema = {
  type: "object",
  required: ["title", "description"],
  properties: {
    title: {
      type: "string",
      title: "Titre"
    },
    description: {
      type: "string",
      title: "Description"
    },
    kind: {
      type: "string",
      title: "Type de sujet",
      enum: [" Long (20 mins + questions)", " Court (5 mins)"],
      default: " Long (20 mins + questions)"
    },
    slideLink: {
      type: "string",
      format: "uri",
      title: "Lien des slides"
    },
    projectLink: {
      type: "string",
      format: "uri",
      title: "Lien du projet"
    },
    twitter: {
      type: "string",
      title: "Twitter"
    }
  }
}

const uiSchema = {
  description: {
    "ui:widget": "textarea",
    "ui:options": {
      "rows": 5
    }
  },
  kind: {
    "ui:widget": "radio"
  },
  slideLink: {
    "ui:placeholder": "http://"
  },
  projectLink: {
    "ui:placeholder": "http://"
  },
  twitter: {
    "ui:placeholder": "@parisjs"
  }
}

function getHelloGithubCred() {
  const helloCreds = localStorage.getItem('hello');

  if (helloCreds) {
    const parsedData = JSON.stringify(helloCreds)

    return (parsedData.github && parsedData.github.access_token) ? parsedData.github.access_token : null
  } else {
    return null
  }
}

class TalkSubmissionContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      githubToken: getHelloGithubCred(),
      talk: {

      }
    }
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    hello.on('auth.login', () => {
      const auth = hello('github').getAuthResponse();

      this.setState({
        githubToken: auth.access_token
      })
    });
  }

  getSubmitButtonLabel () {
    return (this.state.githubToken) ? 'Soumettre' : 'Login avec github';
  }

  onSubmit({ form }) {
    console.log(form)

    console.log(this)

    if (!this.state.githubToken) {
      hello('github').login()
    } else {
      const gh = new GitHub({ token: githubToken });

      console.log(gh.getUser())

      const remoteIssues = gh.getIssues('PierrickP', 'fluffy-octo-broccoli');

      // remoteIssues.createIssue({
      //    title: form.dataFrom,
      //    body: `
      // *${title}*
      //
      // *Description :*
      // > ${description}
      //
      // *Slides :* ${slideLink}
      // *Projet :* ${projectLink}
      //
      // **
      // `.trim(),
      // });
    }
  }

  render() {
    return (
      <Layout>
        <Head>
          <title>Hello world</title>
          <meta name="description" content="Everything is awaysome!" />
        </Head>

        <div className="container talkSubmission">
          <h1>Proposer un sujet</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, corporis illo sequi qui velit molestiae, in dicta eos totam magnam delectus, possimus temporibus suscipit non ratione laudantium ullam doloremque eius!
          </p>
          <Form className="card talkSubmission__form"
            schema={ schema }
            uiSchema={ uiSchema }
            formData={ this.state.talk }
            onSubmit={ this.onSubmit } >
            <div className="formGroup">
              <input type="submit" value={ this.getSubmitButtonLabel() } className="btn" />
            </div>
          </Form>
        </div>
      </Layout>
    )
  }
}

export default TalkSubmissionContainer
