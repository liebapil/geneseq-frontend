import React from 'react';

export default function MutationRender(props) {
  return( 
  <div className='the_mutations'>
      <p className='mutation_render'>Mutation: {props.mutation}</p>
      <p className='hydro_render'>hydrophobic and hydrophilic: {props.hphob_hphil}</p>
      <p className='protonate_render'>protonate: {props.protonate}</p>
  </div>
  )
}
