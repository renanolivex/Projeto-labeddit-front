import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import PostCard from "../../components/PostCard"
import { BASE_URL, TOKEN_NAME } from "../../constants/url";
import { GlobalContext } from "../../contexts/GlobalContext";
import { goToLoginPage } from "../../routes/coordinator";
import { ButtonEnviar, Hr, P2, PostContainer, PostPlace, PostStyle } from "./HomePageStyle";

export default function HomePage() {
  const navigate = useNavigate();

  const context = useContext(GlobalContext);
  const { posts, fetchPosts } = context;

  const [isLoading, setIsLoading] = useState(false)
  const [postsContent, setPostsContent] = useState("")

  useEffect(() => {
    const token = window.localStorage.getItem(TOKEN_NAME);

    if (!token) {
      goToLoginPage(navigate);
    } else {
      fetchPosts();
    }
  }, []);

  const createPosts = async (e) => {
    e.preventDefault()

    setIsLoading(true)

    try {
      const token = window.localStorage.getItem(TOKEN_NAME);

      const config = {
        headers: {
          Authorization: token
        }
      };

      const body = {
        content: postsContent
      }

      await axios.post(BASE_URL + "/posts", body, config);

      setPostsContent("");
      setIsLoading(false)
      fetchPosts()
    } catch (error) {
      console.error(error?.response?.data);
      window.alert(error?.response?.data)
    }
  };

  return (
    <main>
      <Header/>
      
      <PostContainer>
        <form onSubmit={createPosts}>
        
        <PostPlace placeholder="Escreva seu post" value={postsContent} onChange={(e) => setPostsContent(e.target.value)} />
         
          <ButtonEnviar disabled={isLoading}><P2><b>Postar</b></P2></ButtonEnviar>
         
        </form>
        </PostContainer>

        
    

      <Hr />
         {posts.map((post) => {
          return <PostCard key={post.id} post={post} />;
        })}
      
    </main>
  );
}
