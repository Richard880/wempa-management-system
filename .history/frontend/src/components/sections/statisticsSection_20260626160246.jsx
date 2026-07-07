import { Container, Row, Col, Card } from "react-bootstrap";

import useStatistics from "../../hooks/useStatistics";

function Statistics(){

    const {stats,loading}=useStatistics();

    if(loading){

        return(
            <h3 className="text-center p-5">
                Loading Statistics...
            </h3>
        );

    }

    return(

<section className="section bg-primary text-white">

<Container>

<div className="text-center mb-5">

<h2>WEMPA in Numbers</h2>

</div>

<Row>

<Col md={3}>

<Card className="text-center shadow">

<Card.Body>

<h1>{stats.users}</h1>

<p>Registered Users</p>

</Card.Body>

</Card>

</Col>

<Col md={3}>

<Card className="text-center shadow">

<Card.Body>

<h1>{stats.activeMembers}</h1>

<p>Active Members</p>

</Card.Body>

</Card>

</Col>

<Col md={3}>

<Card className="text-center shadow">

<Card.Body>

<h1>{stats.applications}</h1>

<p>Applications</p>

</Card.Body>

</Card>

</Col>

<Col md={3}>

<Card className="text-center shadow">

<Card.Body>

<h1>{stats.events}</h1>

<p>Events</p>

</Card.Body>

</Card>

</Col>

</Row>

</Container>

</section>

    );

}

export default Statistics;