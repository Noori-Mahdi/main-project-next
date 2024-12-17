import { NavBarVerticalPropsType } from "@/types/type";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const NavBarVertical = ({list,childLink}:NavBarVerticalPropsType) => {
    return ( 
        <ul>
            {
              list &&  list.map((page) =>
                (<li></li>)
              )
            }
           
        </ul>
     );
}
 
export default NavBarVertical;