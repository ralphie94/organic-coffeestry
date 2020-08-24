import React from "react";
import { API } from "../config";

const ShowImage = ({ item, url }) => (
    <div>
        <img src={`${API}/${url}/photo/${item._id}`} alt={item.name} className="coffee"></img>
    </div>
);

export default ShowImage;