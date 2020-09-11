'use strict'

import React from 'react';
import {Link} from 'react-router-dom';
import {Navbar, Container, Nav, Button, Row, Col,} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import logo from '../../img/favicon_logo_96x96.png'
// import './style.css';
import userActionsCreator from '../../actions/user';

function Header(props) {
    console.log('in header', props)

    const style = {
        cursor: 'pointer',
        textDecoration: 'underline',
    }

    // const li = props.pages.map ((page, i) =>
    //     <li key={i}>
    {/*<Link to={page.path}>{page.name}</Link>*/
    }
    // </li>
    // )

    return (
        <>
            <Navbar
                fixed={'top'}
                collapseOnSelect expand={'md'}
                bg={'dark'}
                variant={'dark'}>
                <Container>
                    <Navbar.Brand href={'/'}>
                        <img
                            src={logo}
                            height={35}
                            width={35}
                            className={'d-inline-block align-top'}
                            alt='logo'/> Литературная беседка
                    </Navbar.Brand>
                    <Navbar.Toggle area-controls={'responsive-navbar-nav'}/>
                    <Navbar.Collapse id={'responsive-navbar-nav'}>
                        <Nav className={'mr-auto'} as={'ul'}>
                            {props.pages.map((page, i) => {
                                return (
                                    <Nav.Item
                                        as={'li'}
                                        key={i}
                                        id={page.id}>
                                        <Link to={page.path}>{page.name}</Link>
                                        {/*<Nav.Link*/}
                                        {/*    href={page.path}>*/}
                                        {/*    {page.name}*/}
                                        {/*</Nav.Link>*/}
                                    </Nav.Item>
                                );
                            })}
                        </Nav>
                        {props.isLoggedIn ?
                            <Button
                                variant={'outline-info'}
                                onClick={() => props.actions.onLogout()}
                            >Выйти</Button>
                            :
                            <Button
                                variant={'outline-info'}
                                onClick={() => props.actions.showLogInWindow(true)}
                            >Войти</Button>
                        }
                        {/*{props.isLoggedIn && <Button*/}
                        {/*    variant={'outline-info'}*/}
                        {/*    onClick={() => props.actions.onLogout()}*/}
                        {/*>Выйти</Button>}*/}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
        // <header className={'header'}>
        //         <div className='container'>
        //             <div className={'logo'}>
        //                 <h1 className={'logo'}>Литературная беседка</h1>
        //             </div>
        //             <div className="menu-cont">
        //                 <ul className={'menu'} style={style}>
        //                     {props.pages.map((page, i) => {
        //                         return (
        //                             <li key={i} id={page.id}>
        //                                 <Link to={page.path}>{page.name}</Link>
        //                             </li>
        //                         );
        //                     })}
        //                 </ul>
        //             </div>
        //             <div className={'exit'}>
        //                 {props.isLoggedIn && <button onClick={() => props.actions.onLogout()}>Выйти</button>}
        //             </div>
        //         </div>
        // </header>
    )
}

const mapStateToProps = state => ({...state.user});

const mapDispatchToProps = dispatch => {
    console.log('in mapDispatchToProps');
    return {
        actions: bindActionCreators(userActionsCreator, dispatch),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);