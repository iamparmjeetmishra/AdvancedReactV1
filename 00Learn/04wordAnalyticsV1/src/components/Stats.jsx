
export default function Stats() {
   return (
      <section className='stats'>
         <Stat number={0} title={'Words'} />
         <Stat number={'0'} title={'Characters'} />
         <Stat number={'280'} title={'Instagram'} />
         <Stat number={'2200'} title={'Facebook'} />
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