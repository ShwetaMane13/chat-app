import HospitalIcon from "../images/hospital.png";
import LogoutIcon from "../images/logout.png"

export const SideBar = () => (
    
    <div className="channel-list_sidebar">

        <div className="channel-list_sidebar_icon1">
            <div className="icon1_inner">
                <img src={HospitalIcon} alt="hospital" width="30" />
            </div>
        </div>

        <div className="channel-list_sidebar_icon2">
            <div className="icon1_inner">
                <img src={LogoutIcon} alt="logout" width="30" />
            </div>
        </div>

    </div>
)
