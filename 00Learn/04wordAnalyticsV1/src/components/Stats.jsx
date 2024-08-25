
export default function Stats({stat}) {
   return (
      <section className='stats'>
         <Stat number={stat.words} title={'Words'} />
         <Stat number={stat.characters} title={'Characters'} />
         <Stat number={stat.instaWord} title={'Instagram'} />
         <Stat number={stat.fbWord} title={'Facebook'} />
      </section>
   )
}

function Stat({ number, title }) {
   return (

      <section className="stat">
         <span className="stat__number">{number}</span>
         <h2 className="second-heading">{title}</h2>
      </section>
   )
}