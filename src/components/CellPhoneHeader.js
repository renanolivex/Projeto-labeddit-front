import { HeaderPhoneContainer, StatusBar, StatusBarHour } from "./CellPhoneHeaderStyle";
import CellPhoneStatus from "../assets/Status Icons.png"
import Hour from "../assets/Light.png"


function CellPhoneHeader(){
    return(
    <HeaderPhoneContainer> 
        <StatusBarHour src={Hour}/>
        <StatusBar src={CellPhoneStatus} />
        
        </HeaderPhoneContainer>
    )
}

export default CellPhoneHeader;