import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom"
import MutationRender from './MutationRender';

export default function Mutation(props) {
  //get seq
  const [gene, setGene] = useState({})
  const [geneName, setGeneName] = useState(gene.gene_name)
  const [sequencesOne, setSequencesOne] = useState(gene.sequence_one)
  const [sequencesTwo, setSequencesTwo] = useState(gene.sequence_two)
  const { id } = useParams()

  //get mutation 
  const [mutation, setMutation] = useState('no mutation')
  const [polar, setPolar] = useState('no polar')
  const [protonates, setProtonates] = useState('no protonate')
  const [submit, setSubmit] = useState(false);
  const [getmutation, setGetMutation] = useState([])


  const getGene = async (e) => {
    ///gene
    const res = await axios.get(`https://geneseq.herokuapp.com/gene/${id}`)
    setGene(res.data)
    setGeneName(res.data.gene_name)
    setSequencesOne(res.data.sequence_one)
    setSequencesTwo(res.data.sequence_two)

  }
  useEffect(() => {
    getGene()
    renderMut()
  }, [])

  /////mutation
  const postMutation = async (e) => {
    e.preventDefault()
    const res = await axios.post(`https://geneseq.herokuapp.com/mutation/`, {
      mutation: mutation,
      hphob_hphil: polar,
      protonate: protonates,
      gene_id: id
    })
    renderMut()
  }

  const renderMut = async () => {
    const res = await axios.get(`https://geneseq.herokuapp.com/mutation/`)
    setGetMutation(res.data)
  }


  return (
    <div className='mutation_page'>
      <p className='mutation_gene'>Gene name: {gene.gene_name}</p>
      <p className='mutation_seq'>Sequence one: {gene.sequence_one} </p>
      <p className='mutation_seq'>Sequence Two: {gene.sequence_two}</p>
      <div>
        <form className='mutation_form' onSubmit={postMutation}>
          <label htmlFor='mutation'>Mutation? </label>
          <input
            className='form_mutation'
            name='mutation'
            type='text'
            placeholder='mutation'
            onChange={(e) => {
              setMutation(e.target.value)
            }}
          />
          <label htmlFor='polar'>Hydrophobic and Hydrophilic? </label>
          <input
            className='form_polar'
            name='polar'
            type='text'
            placeholder='polar'
            onChange={(e) => {
              setPolar(e.target.value)
            }}
            
          />
          <label htmlFor='protonate'>Protonate? </label>
          <input
            className='form_protonate'
            name='protonate'
            type='text'
            placeholder='protonate'
            onChange={(e) => {
              setProtonates(e.target.value)
            }}
          />
          <input className="submit-mutation" type="submit" />
        </form>
      </div>
      <div className='mutation_render'>
        {getmutation.map((props, idx) => {
          if (props.gene_id === parseInt(id)) {
            return (<MutationRender
              key={idx}
              mutation={props.mutation}
              hphob_hphil={props.hphob_hphil}
              protonate={props.protonate}

            />)
          }
        })}
      </div>
    </div>)
}
