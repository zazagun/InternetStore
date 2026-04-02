import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { SHOP_ROUTE } from "../utils/consts";
import { observer } from "mobx-react-lite";
import { Helmet } from "react-helmet"


const PageNotFound = observer(() => {

    return(
        <>
            <Helmet>
                <title>Page not found</title>
            </Helmet>

            <Container 
                className="d-flex flex-column" 
                style={{
                    alignItems: "center",
                    marginTop: "100px"
                }}
            >
                <div>
                    <h1>404 Not Found</h1>
                </div>
                <div>
                    <h3>
                        The page does not exist at the moment.{' '}
                        <Link to={SHOP_ROUTE}>Go to the main page!</Link>
                    </h3>
                </div>
            </Container>
        </>
    )
})

export default PageNotFound;