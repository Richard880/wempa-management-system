import { Container } from "react-bootstrap";

function Footer(){

return(

<footer
className="bg-dark text-white py-4 mt-5">

<Container>

<p className="text-center mb-0">

© {new Date().getFullYear()} WEMPA

All Rights Reserved

</p>

</Container>

</footer>

);

}

export default Footer;