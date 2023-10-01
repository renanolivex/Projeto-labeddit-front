import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import PostCard from "../../components/PostCard"
import { BASE_URL, TOKEN_NAME } from "../../constants/url";
import { GlobalContext } from "../../contexts/GlobalContext";
import { goToLoginPage } from "../../routes/coordinator";
import { BackgroundColor, ButtonEnviar, Hr, P2, PostContainer, PostPlace } from "../HomePage/HomePageStyle";
import { AuthorStyle, Comment, CommentValorStyle, CommentsPlaceContainer, DislikeStyle, LikeDislikeContainer, LikeDislikePlace, LikeStyle, NumberStyle, Post, PostStyleContainer } from "../../components/PostCardStyle";
import VectorUp from "../../assets/VectorUp.png"
import VectorDown from "../../assets/VectorDown.png"
import Comments from "../../assets/Comments.png"
import CommentCard from "../../components/CommentCard";


export default function CommentsPage(props) {

  
  const navigate = useNavigate();

  const context = useContext(GlobalContext);
  const { fetchPosts, comments,fetchComments, commentsCard } = context;

  const [isLoading, setIsLoading] = useState(false)
  const [postsContent, setPostsContent] = useState("")

  console.log(commentsCard)
  console.log(comments)


  useEffect(() => {
    const token = window.localStorage.getItem(TOKEN_NAME);

    if (!token) {
      goToLoginPage(navigate);
    } else {
      fetchPosts();
       fetchComments();
       
      
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

      await axios.post(BASE_URL + `/post_comments/${comments.id}`, body, config);

      setPostsContent("");
      setIsLoading(false)
      fetchComments()
      
    } catch (error) {
      console.error(error?.response?.data);
      window.alert(error?.response?.data)
    }
  };


  
  const like = async () => {
    setIsLoading(true)

    try {
      const token = window.localStorage.getItem(TOKEN_NAME);

      const config = {
        headers: {
          Authorization: token
        }
      };

      const body = {
        like: true
      }

      await axios.put(BASE_URL + `/posts/${comments.id}/like`, body, config);

  
      fetchPosts()
      setIsLoading(false)
      
  
      
    } catch (error) {
      console.error(error?.response?.data);
      window.alert(error?.response?.data)
    }
  };

  const dislike = async () => {
    setIsLoading(true)

    try {
      const token = window.localStorage.getItem(TOKEN_NAME);

      const config = {
        headers: {
          Authorization: token
        }
      };

      const body = {
        like: false
      }

      await axios.put(BASE_URL + `/posts/${comments.id}/like`, body, config);

     
      fetchPosts()
      setIsLoading(false)
      
      
    } catch (error) {
      console.error(error?.response?.data);
      window.alert(error?.response?.data)
    }
  };
 
  console.log(commentsCard)
  return (
    <main>

      
      <Header/>
     
      {isLoading?"Carregando":
     
      
    <PostStyleContainer>
      
      <BackgroundColor></BackgroundColor>
      <AuthorStyle>Enviado por: {comments.creator.name}  </AuthorStyle>
        <Post> {comments.content} </Post>

        
        <LikeDislikeContainer>
        <LikeDislikePlace>
        <LikeStyle src={VectorUp}onClick={like}    style={{ cursor: "pointer" }}>
        </LikeStyle>
        <NumberStyle><b>
         {comments.likes - comments.dislikes} </b></NumberStyle>
        <DislikeStyle src={VectorDown}  onClick={dislike}  style={{ cursor: "pointer" }}></DislikeStyle>
        </LikeDislikePlace>
        <CommentsPlaceContainer>
          <Comment  src={Comments}/> 
        </CommentsPlaceContainer>
        <CommentValorStyle><b>
         {comments.comments} 
          </b>     
        </CommentValorStyle>
        </LikeDislikeContainer>    
    </PostStyleContainer>}
      
      <PostContainer>
        <form onSubmit={createPosts}>
        
        <PostPlace placeholder="Adicionar comentário" value={postsContent} onChange={(e) => setPostsContent(e.target.value)} />
         
          <ButtonEnviar disabled={isLoading}><P2><b>Responder</b></P2></ButtonEnviar>
         
        </form>
        </PostContainer>

       
        
    

      <Hr />

        {commentsCard.map((post) => {
          return <CommentCard key={post.id} post={post} />;
        })}    
      
    
      
    </main>
  );
}


    


