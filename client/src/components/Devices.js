import {useContext} from "react";
import { observer } from 'mobx-react-lite';
import { Context } from "../index.js";

const Devices = observer(() => {
    const {device} = useContext(Context)

    return(
        console.log(device)
    )
});

export default Devices;