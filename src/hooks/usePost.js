import { useMemo } from "react";

export const useSortedPosts = (posts, sort) => {

    const sortedPosts = useMemo(() => {
        console.log('work')
        if(sort) {
          console.log(sort, 'sort')
          console.log(...posts, 'posts')

          return [...posts].sort((a, b) => a[sort].localeCompare(b[sort]))
        }  
        return posts;
      }, [sort, posts]) 
      console.log(sort, 'sort')
      console.log(sortedPosts, 'sortedPosts')
      return sortedPosts;
}

export const usePosts = (posts,sort,query) => {
  console.log(sort, 'srt')
    const sortedPosts = useSortedPosts(posts,sort)
    const sortedAndSearch = useMemo(() => {
        return sortedPosts.filter(post => post.title.toLocaleLowerCase().includes(query))
      }, [query,sortedPosts])
      return sortedAndSearch;

}