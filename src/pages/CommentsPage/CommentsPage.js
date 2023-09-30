import Header from "../../components/Header";
import { AuthorStyle, Comment, CommentValorStyle, CommentsPlaceContainer, DislikeStyle, LikeDislikeContainer, LikeDislikePlace, LikeStyle, NumberStyle, Post, PostStyleContainer } from "../../components/PostCardStyle";
import { BackgroundColor } from "../HomePage/HomePageStyle";
import VectorUp from "../../assets/VectorUp.png"
import VectorDown from "../../assets/VectorDown.png"
import Comments from "../../assets/Comments.png"
import { BASE_URL, TOKEN_NAME } from "../../constants/url";
import axios from "axios";
import { goToCommentsPage } from "../../routes/coordinator";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../contexts/GlobalContext";


export default function CommentsPage(props) {

    const { post } = props;

    const context = useContext(GlobalContext);
    const { fetchPosts } = context;
  
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate();

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
    

    return(
       
        <div> <Header/>

<PostStyleContainer>
      <BackgroundColor></BackgroundColor>
      <AuthorStyle>Enviado por: "Teste"</AuthorStyle>

        <Post>Content</Post>


        <LikeDislikeContainer>
        <LikeDislikePlace>
        <LikeStyle src={VectorUp}  onClick={like}  style={{ cursor: "pointer" }}>
           
        </LikeStyle>

        <NumberStyle><b>
        5</b></NumberStyle>

        <DislikeStyle src={VectorDown}  onClick={dislike} style={{ cursor: "pointer" }}></DislikeStyle>

        </LikeDislikePlace>

        <CommentsPlaceContainer>

          <Comment  src={Comments}></Comment>


        </CommentsPlaceContainer>
        <CommentValorStyle><b>
          1
          </b>
        </CommentValorStyle>


        </LikeDislikeContainer>
      

      

      
    </PostStyleContainer>
        
        
        
        </div>
    )


    


}