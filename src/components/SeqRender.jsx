import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom'
import { useState, useEffect } from "react"







export default function SeqRender(props) {

  const [update, setUpdate] = useState(false)
  const [showForm, toggleShowForm] = useState(false)
  const [deleteSeq, setDeleteSeq] = useState('')
  const [geneName, setGeneName] = useState('')
  const [sequencesOne, setSequencesOne] = useState('')
  const [sequencesTwo, setSequencesTwo] = useState('')





  const handleupdate = async (e) => {
    e.preventDefault()
    setUpdate(true)
    await axios.put(`https://geneseq.herokuapp.com/${props.id}`, {
      gene_name: geneName,
      sequence_one: sequencesOne,
      sequence_two: sequencesTwo
    })
    props.renderSeq()
    toggleShowForm(!showForm)
  }
  const handleDelete = async (e) => {
    e.preventDefault()
    await axios.delete(`https://geneseq.herokuapp.com/${props.id}`)
    setDeleteSeq()
    props.renderSeq()
  }

  const handleEdit = (e) => {
    e.preventDefault()
    toggleShowForm(true)
  }

  return (
    <div className='seq_render'>
      <div>
        <div >
        <Link className='seq_link' to={`/gene/mutation/${props.id}`}>
          <p className='seq_text'>Gene Name: {props.gene_name}</p>
          <p className='seq_text'>Sequence one: {props.sequence_one}</p>
          <p className='seq_text'>Sequence two: {props.sequence_two}</p>
        </Link>
        </div>
        <div className='form'>
        {showForm ?
          <form className='edit_gene' onSubmit={handleupdate}>
            <label className='gene_label' htmlFor='gene_name'>Gene Name: </label>
            <input
              className='seq_input'
              name='gene_name'
              type='text'
              placeholder='gene name'
              onChange={(e) => {
                setGeneName(e.target.value)
              }}
              value={props.gene_name}
            />
            <label htmlFor='sequenceOne'>Sequence one: </label>
            <input
              className='seq_input'
              name='sequenceOne'
              type='text'
              placeholder='sequence one'
              onChange={(e) => {
                setSequencesOne(e.target.value)
              }}
              value={props.sequence_one}
            />
            <label htmlFor='sequenceTwo'>Sequence two: </label>
            <input
              className='seq_input'
              name='sequenceTwo'
              type='text'
              placeholder='sequence Two'
              onChange={(e) => {
                setSequencesTwo(e.target.value)
              }}
              value={props.sequence_two}
            />
            <input className="submit-edit" type="submit" />
          </form>
          :
          <div>
            <button className='delete_button' onClick={handleDelete}>Delete</button>
            <button className='edit_button' onClick={handleEdit}>Edit</button>
          </div>
        }
        </div>
      </div>
    </div>
  )
}
