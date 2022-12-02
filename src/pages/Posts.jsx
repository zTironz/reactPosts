import React, { useEffect,useState } from 'react';



import PostsList from '../components/PostsList';
import PostForm from '../components/PostForm';
import PostFilter from '../components/PostFilter';
import MyModal from '../components/UI/MyModal/MyModal';
import MyButton from '../components/UI/button/MyButton';
import { usePosts } from '../hooks/usePost';
import PostService from '../API/PostService';
import Loader from '../components/UI/loader/Loader';
import { useFetching } from '../hooks/useFetching';
import {getPageCount} from '../utils/pages';
import Pagination from '../components/UI/pagination/Pagination';
import { useRef } from 'react';
import { useObserver } from '../hooks/useObserver';
import MySelect from '../components/UI/select/MySelect';



function Posts() {
 const [posts,setPosts] = useState([]);
 
 const [filter,setFilter] = useState({sort: '', query: ''});

 const [modal, setModal] = useState(false);

 const [totalPages , setTotalPages] = useState(0);

 const [limit, setLimit] = useState(10);

 const [page, setPage] = useState(1);




 const sortedAndSearch = usePosts(posts,filter.sort,filter.query);
//  const lastElement = useRef()


const [fetchPosts, isPostsLoading, postError ] = useFetching(async (limit,page) => {
 const response = await PostService.getAll(limit,page);
     setPosts(response.data);
     const totalCount = response.headers['x-total-count'];
     setTotalPages(getPageCount(totalCount,limit));
})

// useObserver(lastElement, page < totalPages, isPostsLoading, () => {
//     setPage(page + 1)
// })

 useEffect(() => {
   fetchPosts(limit,page)
 // eslint-disable-next-line react-hooks/exhaustive-deps
 }, [limit, page])

 const createPost = (newPost) => {
   setPosts([...posts, newPost]);
   setModal(false)
 }




 const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
 }
 

const changePage = (page) => {
 setPage(page)
 fetchPosts(limit,page)
}

 
 return (
   <div className="App">
     <MyButton style={{marginTop:'30px'}} onClick={() => setModal(true)}>Create User</MyButton>
     <MyModal visible={modal} setVisible={setModal}>
       <PostForm create={createPost}/>
     </MyModal>
     
     <hr style={{margin:"15px"}} />
     <PostFilter filter={filter} setFilter={setFilter}/>
     {/* <MySelect value={limit} onChange={value => setLimit(value)} defaultValue='Number of elements' 
     options={[{value: 5, name: '5'},{value: 10, name: '10'},{value: 25, name: '25'},{value: -1, name: 'Show All '}]}/> */}
     {postError && <h1>Error ${postError}</h1>}
     <PostsList remove={removePost} title="Posts List JS" posts={sortedAndSearch}/>
     {/* <div  ref={lastElement} style={{height: 20, background: 'red'}}/> */}
     {isPostsLoading &&
       <div style={{display: "flex", justifyContent: "center"}}><Loader/></div>
     }
       
     <Pagination page={page} changePage={changePage} totalPages={totalPages} />
     
   </div>
 );
}

export default Posts;
