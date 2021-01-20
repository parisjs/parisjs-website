import { Octokit } from '@octokit/rest'

export function initGithubAuthentication() {
  try {
    /**
     * Use OAuth proxy https://auth-server.herokuapp.com
     * See with PierrickP
     */
    window.hello.init(
      {
        github: 'Iv1.558c5d3bf74f6921',
      },
      {
        redirect_uri: 'https://parisjs.org/propositions/sujet/',
      }
    )
  } catch (e) {}

  // get stored credentials
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

export function signinToGitHub() {
  return window.hello('github').login()
}

export function createGitHubIssue({ githubToken, formData }) {
  const gh = new Octokit({ auth: githubToken })

  return gh.issues.create({
    owner: 'parisjs',
    repo: 'talks',
    title: formData.title,
    body: formatTalkSubmission(formData),
  })
}

function formatTalkSubmission({
  title,
  kind,
  description,
  slideLink = '',
  projectLink = '',
  twitter = '',
}) {
  const formattedDescription = description.replace(/(.+)/g, '> $1')
  return `## ${title}

    *Talk format :* ${kind}
  
    *Description :*
  
    ${formattedDescription}
  
    *Slides :* ${slideLink}
    *Projet :* ${projectLink}
    *Twitter :* ${twitter}`.replace(/^\s+/g, '')
}
