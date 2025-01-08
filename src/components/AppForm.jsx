function AppForm(formData, onSubmit, onInputChange) {
return (
     <form onSubmit={onSubmit}>
     <div className='container m-5 d-flex flex-column gap-3'>
       <h2>Inserisci un nuovo post</h2>

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