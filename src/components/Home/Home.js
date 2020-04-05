import React, { useContext } from "react";
import { PageContext } from "../../page/page";
import ContentCard from "../ContentCard";
const pages = require ("../../assets/pages.json")

const Home = function() {
    const { setPage } = useContext(PageContext);

    const pageList = pages.map((item) => {
        return (
            <div className="col-4" key={item.id}>
                <ContentCard  title={item.title} text={item.text} clickHandler={()=>setPage(item.page)} buttonText={item.buttonText}/>
            </div>
        );
    });

    return (
        <div className="row">
            {pageList}
        </div>
    );
}

export default Home;