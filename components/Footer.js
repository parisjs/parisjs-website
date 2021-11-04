import Image from 'next/image'

const Footer = () => {
  return (
    <footer className="footer container">
      <div>
        🚀 Paris.JS - <a href="https://discord.gg/t6t8jhAaVz">Discord</a> -{' '}
        <a href="https://twitter.com/parisjs">Twitter</a> -{' '}
        <a href="http://groups.google.com/group/parisjs">Google Groups</a> -{' '}
        <a href="https://github.com/parisjs">Github</a>
      </div>
      <div className="footer__vercel">
        <a href="https://vercel.com/?utm_source=meetup-parisjs&utm_campaign=oss">
          <Image
            width={167}
            height={32}
            src="/assets/powered-by-vercel.svg"
            alt="Powered by Vercel"
          />
        </a>
      </div>
    </footer>
  )
}

export default Footer
