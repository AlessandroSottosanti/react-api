import { useState, useEffect } from 'react';
import axios from 'axios';



// TODO: USE EFFECT() DOVRÀ ESSERE INIZIALIZZATO PER IMPOSTARE LO STATO CON LE CHECKBOX 
// ANZICHÉ CON LA SELECT E RESTITUIRE UN MESSAGGIO CON UN ALERT CHE AVVERTE DELLO STATO DEL POST

function App() {

  const urlApi = 'http://localhost:3000';

   const initialPost = {
     title: "",
     content: "",
     image: "",
     tags: [],
   }

  const [posts, setPosts] = useState([]);
  const [formData, setFormData] = useState(initialPost); // object

  useEffect(() => {
    getPosts();
  },
    []
  );



  // get posts
  const getPosts = () => {
    axios.get(`${urlApi}/posts/`).then((resp) => {
      console.log(resp.data.postsArray)
      setPosts(resp.data.postsArray);
    })
  }

  // Salva post
  const handleNewPostSubmit = (event) => {
    event.preventDefault();

    const newPost = {
      ...formData,
    };

    const newArray = [...posts, newPost];

    setPosts(newArray);

    setFormData(initialPost);

    console.log("newArray:", newArray);

    axios.post(`${urlApi}/posts/`, {
      ...newPost
    }).then((resp) => {
      console.log(resp.status, resp.data);
    });
  };

  const handleInputChange = (event) => {
    const keyToChange = event.target.name;

    let newValue;    
    newValue = event.target.value;

    const newData = {
      ...formData,
      [keyToChange]: newValue,
    };

    setFormData(newData);
  };


  // Elimina post
  const handleDelete = (id) => {
    setPosts(posts.filter((post) => post.id !== id));
    axios.delete(`${urlApi}/posts/${id}`);
  }


  // function capitalizeWords(str) {
  //   return str
  //     .split(' ')
  //     .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
  //     .join(' ');
  // }


  console.log("post:", posts);
  console.log("formData:", formData);

  return (
    <>
      {/* Form posts */}
      <form onSubmit={handleNewPostSubmit}>
        <div className='container m-5 d-flex flex-column gap-3'>
          <h2>Inserisci un nuovo post</h2>

          <label htmlFor="title">Titolo post</label>
          <input className='form-control' name='title' type="text" id='title' value={formData.title} onChange={handleInputChange} />

          <label htmlFor='content'>Contenuto post</label>
          <textarea className='form-control' name='content' type="text-area" id='content' value={formData.content} onChange={handleInputChange} />

          <label htmlFor='image'>Url immagine del post</label>
          <input className='form-control' type="url" id='image' name='image' value={formData.image} onChange={handleInputChange} />

          <div className="d-flex gap-3">
            <button type='submit' className={`btn btn-success ${(!formData.title || !formData.content || !formData.image) && 'disabled'}`}>Salva</button>
            <button type='clear' className='btn btn-danger'>Cancella</button>
          </div>


        </div>
      </form>

      {/* Lista posts */}
      <div className="container m-5 d-flex flex-column gap-3">


        <h2>Elenco post</h2>
        {posts.length > 0 ?

          (posts.map((curPost) => (
            
            <div className="card" key={curPost.id}>
              <div className="card-header d-flex justify-content-between align-items-center">
                <h2>{curPost.title}</h2>
                <button onClick={() => handleDelete(curPost.id)} className='btn btn-danger'>Elimina</button>
              </div>
              <div className="card-body d-flex flex-column justify-content-center my-5 gap-3">
                <div className='d-flex justify-content-center'><img src={curPost.image} alt="" /></div>
                <p>{curPost.content}</p>
                <p>{console.log('curPost:', curPost)}</p>  
              </div>
            </div>
          )))

          :
          (
            <div className="card">
              <div className="card-body">Nessun post presente.</div>
            </div>
          )

        }
      </div>

    </>
  )
}

export default App
