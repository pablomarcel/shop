// import { useAdminAuth } from './../customHooks';

import  {useAdminAuth}  from './../customHooks';


const WithAdminAuth = props => useAdminAuth(props) && props.children;

export default WithAdminAuth;