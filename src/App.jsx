import { useState, useEffect } from 'react';
import axios from 'axios';
import AppCard from './components/AppCard';
import AppForm from './components/AppForm';



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
      <AppForm
      formData={formData}
      onSubmit={handleNewPostSubmit}
      onInputChange={handleInputChange}
      />

      {/* Lista posts */}
      <div className="container m-5 d-flex flex-column gap-3">


        <h2>Elenco post</h2>
        {posts.length > 0 ?

          (posts.map((curPost) => (
            
           <AppCard
           post={curPost}
           onDelete={handleDelete}
           />
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
