import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { TransitionGroup } from 'react-transition-group';
import PostItem from './PostItem';


const  PostsList = ({posts, title, remove }) => {
    if(!posts.length) {
        return (<h1 style={{textAlign:'center', color:"red"}}>No Posts</h1>)
    }
    return (
<div>
<h1 style={{textAlign:"center",color:"red"}}>{title}</h1>
    <TransitionGroup>
        
            {posts.map((post, index) => 
            <CSSTransition key={post.id} classNames="post" timeout={500}>
         <PostItem remove={remove} number={index+1 } post={post} />
         </CSSTransition>
      )}
       
        
    </TransitionGroup>
      
</div>
    )
}

export default  PostsList;