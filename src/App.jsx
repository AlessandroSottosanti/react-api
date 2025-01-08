import { useState, useEffect } from 'react';
import axios from 'axios';
import AppCard from './components/AppCard';
import AppForm from './components/AppForm';

// NOTES: potrei gestire oltre al salvataggio dei post anche i tag con una nuova API, ma tenendo in considerazione che i dati in futuro verranno da una sorgente dinamica come un db, 
//        non sarà necessario farlo in quanto l'api index dei tag restituisce tutti i tag che trova nei post caricati, ora non funziona perché fa riferimento ad un file statico

function App() {

  const urlApi = 'http://localhost:3000';

  const initialPost = {
    title: "",
    content: "",
    image: "",
    tags: [],
  }

  const [posts, setPosts] = useState([]);
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [formData, setFormData] = useState(initialPost); // object

  useEffect(() => {
    getPosts();
    getTags();
  },
    []
  );


  // commentata perché aggiornava ad ogni modifica dei post e dei tag, quindi ho deciso di chiamare le funzioni solo dove necessario.

  // useEffect(() => {
  //   getPosts();
  //   getTags();
  // },
  //   [posts, tags]
  // );



  // get posts
  const getPosts = () => {
    axios.get(`${urlApi}/posts/`).then((resp) => {
      console.log(resp.data.postsArray)
      setPosts(resp.data.postsArray);
    })
  }


  // get tags
  const getTags = () => {
    axios.get(`${urlApi}/tags/`).then((resp) => {
      console.log("resp data tags: ", resp.data.tags)
      setTags(resp.data.tags);
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

  const handleNewTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]); // Aggiungi il nuovo tag all'elenco
      setFormData({
        ...formData,
        tags: [...formData.tags, newTag], // Aggiungi al formData
      });
      setNewTag(""); // Resetta l'input dopo l'aggiunta
    } else {
      alert("Tag già esistente o non valido.");
    }
  };


// gestisce dinamicamente i valori degli input
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

  // gestisce la selezione della checkbox ne aggiunge il valore all'array tags
  const handleTagChange = (tag) => {
    console.log("actual tag ", tag);
    const updatedTags = formData.tags.includes(tag)
      ? formData.tags.filter((curTag) => curTag !== tag)
      : [...formData.tags, tag];

    setFormData({
      ...formData,
      tags: updatedTags,
    });
    console.log("formData", formData);
  }


  // Elimina post
  const handleDelete = (id) => {
    setPosts(posts.filter((post) => post.id !== id));
    axios.delete(`${urlApi}/posts/${id}`).then((resp) => {
      console.log(resp.data);
      getPosts();
      getTags();
    }
    )
  }

  // Elimina i tag tramite l'API
  // Temporaneamente inserita, andrà gestita la rimozione singolarmente per card per lo stesso discorso del salvataggio
  const handleDeleteTag = (tag) => {
    setTags(tags.filter((curTag) => curTag !== tag));
    axios.delete(`${urlApi}/tags/?tag=${tag}`).then((resp) => {
      console.log(resp.data);
      getPosts();
      getTags();
    });
  }

  // Rimuove i tag singolarmente dal post
  const handleRemovePostTag = (postId, tag) => {
    console.log(postId, tag);
  }


  // function capitalizeWords(str) {
  //   return str
  //     .split(' ')
  //     .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
  //     .join(' ');
  // }


  console.log("post:", posts);
  console.log("formData:", formData);
  console.log("tags: ", tags);

  return (
    <>



      {/* <div className="container d-inline-block my-5">
        <ul>
          <h2 className='mb-3'>Lista tag:</h2>
          {tags.map((tag) => {
            return (
              <div className="container d-flex align-items-center my-2">
                <li className='me-5'>{tag}</li>
              </div>
            )
          })}
        </ul>
      </div> */}

      {/* Form posts */}
      <AppForm
        formData={formData}
        tags={tags}
        newTag={newTag}
        setNewTag={setNewTag}
        onSubmit={handleNewPostSubmit}
        onInputChange={handleInputChange}
        tagDelete={handleDeleteTag}
        tagChange={handleTagChange}
        onAddTag={handleNewTag}
      />

      {/* Lista posts */}
      <div className="container m-5 d-flex flex-column gap-3">


        <h2>Elenco post</h2>
        {posts.length > 0 ?

          (posts.map((curPost) => (

            <AppCard
              key={curPost.id}
              post={curPost}
              onDelete={handleDelete}
              onDeleteTag={handleRemovePostTag}
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
