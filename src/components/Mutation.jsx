
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom"
import MutationRender from './MutationRender';
import amino from '../image/aminoacids.png'
import { Link } from 'react-router-dom'



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
      <h3>Explanation</h3>
      <p className='explanation'>Below, you can look through the virus sequences, find the difference between the two, read the explanation, and enter what you think is the correct answer. You only have one try to get it right.
      </p>
      <h3>Gene name: </h3>
      <p className='mutation_gene'>{gene.gene_name}</p>
      <h3>Sequence one:</h3>
      <p className='mutation_seq'> {gene.sequence_one} </p>
      <h3>Sequence Two:</h3>
      <p className='mutation_seq'> {gene.sequence_two}</p>
      <div>
        <form className='mutation_form' onSubmit={postMutation}>
          <label htmlFor='mutation'>Mutation? </label>
          <p className='explanation'>
            A mutation in the amino acid sequence may alter the structure of a protein but it does not necessarily alter its function, although, the mutation at specific sites such as conserved residues can bring about a change in the structure and function of the protein. Look above, see if you can find any amino acids that are not the same between the two. then continue on below to see the exact mutations.
          </p>
          <a href='https://www.frontiersin.org/articles/10.3389/fmolb.2020.620554/full#:~:text=A%20mutation%20in%20the%20amino,and%20function%20of%20the%20protein.' className='explation_link'>explanation citation</a>
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
          <p className='explanation'>
            Biological properties of proteins depend on the higher levels of their structure, determined by the primary structure. As has been shown by Fisher1, the knowledge of the amino-acid composition permits in many cases the tertiary and sometimes the quaternary structure of the proteins to be predicted. The ratio of the polar(hydrophilic) and non-polar(hydrophobic) amino-acids seems to be a very important characteristic of the protein. The change of the relative numbers of the polar and non-polar amino-acids as a result of a mutation must produce big changes in the protein structure. The mutational exchange of a polar group for a non-polar one and vice versa must be more dangerous than the transition from one polar group to another or from a non-polar to another non-polar one. The well-known example is the transition from Glu to Val in the case of sickle-cell hemoglobin. Look at the chart below and check if any of the amino acids changed
          </p>
          <a href='https://www.nature.com/articles/207294a0' className='explation_link'>explanation citation</a>
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
          <p className='explanation'>
            The amino group is protonated but the carboxyl is not. Amino acids are amphoteric, meaning they can act like an acid and base. Also, amino acids are dipolar. Amphoteric, dipolar species are called zwitterions. This is due to ammonium (amino) groups being less acidic than carboxylic acids. Look at the pKa values of the ammonium and carboxyl groups. The pKa of the carboxylic acid is always lower than that of the ammonium group. As pH increases, it will be deprotonated before the ammonium group. For the amino acids with protonated R groups, you need to pay attention to their pKa values. The atom with the lowest pKa will be deprotonated. Use the following link to find a list of the pKa values for all the amino acids. The exact opposite would happen for protonation of amino acids. The pKb values for amino groups are lower than that of carboxyl groups, so the amino groups will be protonated before the carboxyl groups. if you look at the diagram below it will tell you which ones are charged and uncharged.
          </p>
          <a href='https://socratic.org/questions/how-does-ph-affect-amino-acid-structure' className='explation_link'>explanation citation</a>
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
      <img src={amino} alt="amino acids" className='image_mut' />
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
      <Link className='link_gene' to={'/gene/'}>Gene home page</Link>
    </div>)
}
