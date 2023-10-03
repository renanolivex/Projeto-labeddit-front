import axios from "axios";
import { useContext, useState } from "react";
import { BASE_URL, TOKEN_NAME } from "../constants/url";
import { GlobalContext } from "../contexts/GlobalContext";
import { AuthorStyle, Comment, CommentValorStyle, CommentsPlaceContainer, DislikeStyle, LikeDislikeContainer, LikeDislikePlace, LikeStyle, NumberStyle, Post, PostStyleContainer } from "./PostCardStyle";
import { BackgroundColor } from "./HeaderStyle";
import VectorUp from "../assets/VectorUp.png"
import VectorDown from "../assets/VectorDown.png"
import Comments from "../assets/Comments.png"
import { goToCommentsPage } from "../routes/coordinator";
import { useNavigate } from "react-router-dom";

export default function PostCard(props) {
  const { post } = props;

  const context = useContext(GlobalContext);
  const { fetchPosts, setComments, fetchComments} = context;

  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate();

  
  const onClickComments=()=>{
    setComments(post)
    goToCommentsPage(navigate, post.id)  
    
    
}


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

      await axios.put(BASE_URL + `/posts/${post.id}/like`, body, config);

      setIsLoading(false)
      fetchPosts()
      window.location.reload()
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

      await axios.put(BASE_URL + `/posts/${post.id}/like`, body, config);

      setIsLoading(false)
      fetchPosts()
      window.location.reload()
    } catch (error) {
      console.error(error?.response?.data);
      window.alert(error?.response?.data)
    }
  };



  return (

  

    <PostStyleContainer>
      
      <BackgroundColor></BackgroundColor>
      <AuthorStyle>Enviado por: {post.creator.name}</AuthorStyle>

        <Post>{post.content}</Post>


        <LikeDislikeContainer>
        <LikeDislikePlace>
        <LikeStyle src={VectorUp}  onClick={like}  style={{ cursor: "pointer" }}>
           
        </LikeStyle>

        <NumberStyle><b>
        {post.likes - post.dislikes}</b></NumberStyle>

        <DislikeStyle src={VectorDown}  onClick={dislike} style={{ cursor: "pointer" }}></DislikeStyle>

        </LikeDislikePlace>

        <CommentsPlaceContainer>

          <Comment  onClick={()=>{onClickComments() } }src={Comments}/> 


          
        </CommentsPlaceContainer>
        <CommentValorStyle><b>
          {post.comments}
          </b>
 
     
        </CommentValorStyle>


        </LikeDislikeContainer>
      

      

      
    </PostStyleContainer>
  );
}
