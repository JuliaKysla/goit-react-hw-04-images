import React from 'react';
import { InfinitySpin } from 'react-loader-spinner';
import s from './Loader.module.css';

const Loader = () => {

return(
<div className={s.loader}>
<InfinitySpin
    visible={true}
    width="200"
    color="#4fa94d"
    ariaLabel="infinity-spin-loading"
    /></div>)
}

export default Loader