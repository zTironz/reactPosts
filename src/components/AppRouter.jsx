import React, { useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
// import About from '../pages/About';
// import Posts from '../pages/Posts';
// import Error from '../pages/Error';
// import PostIdPage from '../pages/PostIdPage';
import { publicRoutes, privateRoutes } from '../routes/routes';
import { AuthContext } from '../context';
import Loader from './UI/loader/Loader';

const AppRouter = () => {
    const {isAuth, isLoading} = useContext(AuthContext)
    console.log(isAuth)
    if(isLoading) {
        return <Loader/> 
    }
    return (
        isAuth 
        ?
        <Routes>
    {privateRoutes.map(route => 
        <Route key={route.path}  path={route.path} element={route.component} exact={route.exact} />
    )}
       {/* <Route path='/error' element={<Error/>}/> */}
       <Route path="*" element={<Navigate to ="/posts" />}/>
    </Routes>
        :
        <Routes>
        {publicRoutes.map(route => 
            <Route key={route.path}  path={route.path} element={route.component} exact={route.exact} />
        )}
        {/* <Route path='/error' element={<Error/>}/> */}
        <Route path="*" element={<Navigate to ="/login" />}/>
        </Routes>
    );
};

export default AppRouter;