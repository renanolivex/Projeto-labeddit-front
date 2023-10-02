import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { BASE_URL, TOKEN_NAME } from "../constants/url";
import { GlobalContext } from "../contexts/GlobalContext";
import { AuthorStyle, DislikeStyle, LikeDislikeContainer, LikeDislikePlace, LikeStyle, NumberStyle, Post, PostStyleContainer } from "./PostCardStyle";
import { BackgroundColor } from "./HeaderStyle";
import VectorUp from "../assets/VectorUp.png"
import VectorDown from "../assets/VectorDown.png"
import { goToLoginPage } from "../routes/coordinator";
import { useNavigate } from "react-router-dom";


export default function CommentCard(props) {
  const { post } = props;


  const context = useContext(GlobalContext);
  const { fetchComments, fetchPosts, commentCard  } = context;

  const [isLoading, setIsLoading] = useState(false)


  

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
      await axios.put(BASE_URL + `/post_comments/${post.id}/like`, body, config);
      fetchComments()
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
      await axios.put(BASE_URL + `/post_comments/${post.id}/like`, body, config);
      fetchComments()
      setIsLoading(false)
     
    } catch (error) {
      console.error(error?.response?.data);
      window.alert(error?.response?.data)
    } 
  };

 

  return (

  isLoading?"Carregando":

    <PostStyleContainer>
      
      <BackgroundColor></BackgroundColor>
      <AuthorStyle>Enviado por: { post.creator.name }</AuthorStyle>

        <Post>{ post.content }</Post>


        <LikeDislikeContainer>
        <LikeDislikePlace>
        <LikeStyle src={VectorUp}   onClick={like}   style={{ cursor: "pointer" }}>
           
        </LikeStyle>

        <NumberStyle><b>
        {post.likes - post.dislikes}</b></NumberStyle>

        <DislikeStyle src={VectorDown}   onClick={dislike}  style={{ cursor: "pointer" }}></DislikeStyle>

        </LikeDislikePlace>

        </LikeDislikeContainer>
      

      

      
    </PostStyleContainer>
  );
}
