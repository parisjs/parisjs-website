import Head from 'next/head'

const FAQContainer = ({ title, body }) => (
    <article>
      <Head>
        <title>{title}</title>
        <meta name="description" content={body.slice(0, 150) + '…'} />
      </Head>
      <div className="container FAQContainer">
        <h1>{title}</h1>
        <div className="card">
          <div dangerouslySetInnerHTML={{ __html: body }} />
        </div>
      </div>
    </article>
)

export default FAQContainer
