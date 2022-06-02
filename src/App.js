import React, {Component} from "react";
import {connect} from "react-redux";
import {Route, Routes, Navigate} from "react-router-dom";
// import Header from './components/Header'

import {auth, handleUserProfile} from "./firebase/utils";
import {setCurrentUser} from "./redux/User/user.actions";

//layouts
import MainLayout from "./layouts/MainLayout";
import HomepageLayout from "./layouts/HomepageLayout";
import Login from "./pages/Login";

//pages
import Homepage from "./pages/Homepage";
import Registration from "./pages/Registration";
import './default.scss'
import {mapDispatchToPropsFactory} from "react-redux/es/connect/mapDispatchToProps";

// const initialState={
//     currentUser: null
// }

class App extends Component{

    // constructor(props) {
    //     super(props);
    //     this.state={
    //         ...initialState
    //     }
    // }

    authListener = null


    componentDidMount(){

        const {setCurrentUser}=this.props

        this.authListener=auth.onAuthStateChanged(async userAuth =>{
            if(userAuth){
                const userRef= await handleUserProfile(userAuth);
                userRef.onSnapshot(snapshot =>{
                    setCurrentUser({
                        id: snapshot.id,
                        ...snapshot.data()
                        }


                    )
                })

            }

            setCurrentUser(userAuth)

            // this.setState({
            //     ...initialState
            // })
        })

    }

    componentWillUnmount() {
        this.authListener();


    }

    render(){

        const {currentUser} =this.props

        return (
            <div className="App">

                <Routes>
                    <Route exact path="/" element={
                        <HomepageLayout>
                            <Homepage/>
                        </HomepageLayout>}/>
                    <Route path="/registration" element={
                        <MainLayout>
                            <Registration />
                        </MainLayout>} />
                    {/*<Route path="/login" element={<MainLayout currentUser={currentUser}><Login /></MainLayout>} />*/}

                    <Route path="/login"
                           element={
                        currentUser ? <Navigate to="/"/> :
                            <MainLayout><Login /></MainLayout>} />

                </Routes>
            </div>
        );
    }


}

const mapStateToProps= ({user})=>({
    currentUser:user.currentUser
})

const mapDispatchToProps=dispatch=>({
    setCurrentUser:user=>dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
