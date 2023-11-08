<template>
    <div>
      <div v-for="post in posts">
        <h2>
          <router-link :to="post.path">{{post.frontmatter.title}}</router-link>
        </h2>
        
       <div>{{post.frontmatter.description}}</div>  
        <p>
          <router-link :to="post.path">Read More</router-link>
        </p>
      </div>
    </div>
  </template>
  <script>
  export default {
    computed: {
      posts() {
        return this.$site.pages
          .filter (
                        (x) => x.path.startsWith('/blog/') && !x.frontmatter.blog_index
                    )
                    
                    //(page => page.path.startsWith('/blog/'))
          .sort ((a, b) => b.frontmatter.postId - a.frontmatter.postId);
      }
    }
  }
  </script>
  