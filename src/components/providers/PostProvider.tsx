import React, { createContext, useState, Dispatch, SetStateAction, useEffect } from "react";

export interface BlogPost {
  coverImage: string;
  date: string;
  excerpt: string;
  id: string;
  title: string;
  author?: any;
}

interface BlogPostsContextProps {
  blogPosts: BlogPost[];
  //   setBlogPosts: Dispatch<SetStateAction<any>>;
}

const initialData: BlogPost = {
  coverImage: "",
  date: "",
  excerpt: "",
  id: "",
  title: "",
  author: undefined,
};

export const BlogPostsContext = createContext<BlogPostsContextProps>({
  blogPosts: [initialData],
  //   setBlogPosts: () => {},
});

const BlogPostsProvider: React.FC<{ children: React.ReactNode; blogPosts: BlogPost[] }> = ({
  children,
  blogPosts,
}) => {
  //   const [blogPosts, setBlogPosts] = useState<BlogPost[]>([initialData]);

  return (
    <BlogPostsContext.Provider
      value={{
        blogPosts,
        // setBlogPosts,
      }}
    >
      {children}
    </BlogPostsContext.Provider>
  );
};

export default BlogPostsProvider;
