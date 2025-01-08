function AppForm({ formData, tags, newTag, setNewTag, onSubmit, onInputChange, tagDelete, tagChange, onAddTag }) {
  console.log(formData);
  return (
    <form onSubmit={onSubmit}>
      <div className='container m-5 d-flex flex-column gap-3'>
        <h2>Inserisci un nuovo post</h2>

        <div>
          <label>Tags:</label>

          <div className="d-flex row row-cols-1 row-cols-sm-2 row-cols-md-4 row-cols-lg-6 justify-content-center align-items-center gap-2">
            {tags.map((tag) => (
              <div className='col card container d-flex-inline flex-row align-items-center justify-content-between my-2 gap-2' key={tag}>
                <input
                  type="checkbox"
                  id={tag}
                  value={tag}
                  checked={formData.tags.includes(tag)}
                  onChange={(event) => tagChange(event.target.value)}
                />
                <label htmlFor={tag}>{tag}</label>
                <button className='btn btn-danger my-3' onClick={() => tagDelete(tag)}>x</button>
              </div>

            ))}
          </div>

          <div>
            <label htmlFor="tags" >Nuovo tag:</label>
            <input
              className="form-control"
              name="tags"
              type="text"
              id="newTag"
              value={newTag} // usa lo stato passato come prop
              onChange={(event) => setNewTag(event.target.value)} // aggiorna lo stato di newTag direttamente
              placeholder="Aggiungi un nuovo tag"
            />
            <button
              type="button"
              className="btn btn-primary my-2"
              onClick={() => onAddTag()}
            >
              <strong>+</strong> Aggiungi Tag
            </button>
          </div>
        </div>


        <label htmlFor="title">Titolo post</label>
        <input className='form-control' name='title' type="text" id='title' value={formData.title} onChange={onInputChange} />

        <label htmlFor='content'>Contenuto post</label>
        <textarea className='form-control' name='content' type="text-area" id='content' value={formData.content} onChange={onInputChange} />

        <label htmlFor='image'>Url immagine del post</label>
        <input className='form-control' type="url" id='image' name='image' value={formData.image} onChange={onInputChange} />

        <div className="d-flex gap-3">
          <button type='submit' className={`btn btn-success ${(!formData.title || !formData.content || !formData.image) && 'disabled'}`}>Salva</button>
          <button type='clear' className='btn btn-danger'>Cancella</button>
        </div>


      </div>
    </form>

  )
}

export default AppForm;