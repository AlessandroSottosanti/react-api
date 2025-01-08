function AppCard({post, onDelete}) {
    return (
        <div className="card" key={post.id}>
        <div className="card-header d-flex justify-content-between align-items-center">
          <h2>{post.title}</h2>
          <button onClick={() => onDelete(post.id)} className='btn btn-danger'>Elimina</button>
        </div>
        <div className="card-body d-flex flex-column justify-content-center my-5 gap-3">
          <div className='d-flex justify-content-center'><img src={post.image} alt="" /></div>
          <p>{post.content}</p>
          <p>{console.log('curPost:', post)}</p>  
        </div>
      </div>
    )
}

export default AppCard;