import Head from 'next/head'
import TalkSubmissionContainer from '../../components/TalkSubmissionContainer'

export default function SujetPage(props) {
  return (
    <>
      <Head>
        <script src="https://unpkg.com/hellojs@1.16.1/dist/hello.all.js" />
      </Head>
      <TalkSubmissionContainer {...props} />
    </>
  )
}
