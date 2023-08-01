import React from 'react';
import {
    Collapse, Navbar, Nav,
    Dropdown, DropdownToggle, DropdownMenu, DropdownItem,
    Container,
} from 'reactstrap';

import dashboardRoutes from 'routes/general.jsx';

import { Logout } from '../../../views/Log-InOut';

var IMGDIR = process.env.REACT_APP_IMGDIR;
class Header extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            userddOpen: false, 
            color: "primary",
        };
        this.toggle = this.toggle.bind(this);
        this.userddToggle = this.userddToggle.bind(this);
        
    }
    // logOut(){
    //     // <Logout></Logout>
    //     Logout();
    // }
    toggle() {
        if(this.state.isOpen){
            this.setState({
                color: "primary"
            });
        } else {
            this.setState({
                color: "white"
            });
        }
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    userddToggle(e){
        this.setState({
            userddOpen: !this.state.userddOpen
        });
    }
   
    getBrand(){
        var name;
        dashboardRoutes.map((prop,key) => {
            if(prop.collapse){
                 prop.views.map((prop,key) => {
                    if(prop.path === this.props.location.pathname){
                        name = prop.name;
                    }
                    return null;
                })
            } else {
                if(prop.redirect){
                    if(prop.path === this.props.location.pathname){
                        name = prop.name;
                    }
                }else{
                    if(prop.path === this.props.location.pathname){
                        name = prop.name;
                    }
                }
            }
            return null;
        })
        return name;
    }
    openSidebar(){
        document.documentElement.classList.toggle('nav-toggle');
        this.refs.sidebarToggle.classList.toggle('toggled');

        // close chat bar if open on smaller screens
        if(window.innerWidth < 993){
            document.documentElement.classList.remove('nav-toggle-chat');
           // this.refs.chatToggle.classList.remove('toggled');
        }
    }
    openChat(){
        document.documentElement.classList.toggle('nav-toggle-chat');
       // this.refs.chatToggle.classList.toggle('toggled');

        // close menu bar if open on smaller screens
        if(window.innerWidth < 993){
            document.documentElement.classList.remove('nav-toggle');
            this.refs.sidebarToggle.classList.remove('toggled');
        }
    }
    toggle_grid(){
        document.documentElement.classList.toggle('toggle-grid');
    }


    openStyle(){
        document.documentElement.classList.toggle('nav-toggle-style');
       // this.refs.chatToggle.classList.toggle('toggled');

        // close menu bar if open on smaller screens
        /*if(window.innerWidth < 993){
            document.documentElement.classList.remove('nav-toggle');
            this.refs.sidebarToggle.classList.remove('toggled');
        }*/
    }
    // function that adds color white/transparent to the navbar on resize (this is for the collapse)
    updateColor(){
        if(window.innerWidth < 993 && this.state.isOpen){
            this.setState({
                color: "primary"
            });
        } else {
            this.setState({
                color: "primary"
            });
        }

    }
    componentDidMount(){
        if(this.props.navtype === "mini"){
            document.documentElement.classList.add('nav-toggle');
            this.refs.sidebarToggle.classList.add('toggled');
        } else {
            document.documentElement.classList.remove('nav-toggle');
            this.refs.sidebarToggle.classList.remove('toggled');
        }
        window.addEventListener("resize", this.updateColor.bind(this));

            if(this.props.admintype === 'general'){
                this.setState({     
                    profileimg: IMGDIR+'/images/profile/profile-general.jpg',
                    profilename: 'Nancy Spencer'
                });  
            } else if(this.props.admintype === 'hospital'){
                this.setState({     
                    profileimg: IMGDIR+'/images/profile/profile-hospital.jpg',    
                    profilename: 'Dianna Austin'
                });  
            } else if(this.props.admintype === 'university'){
                this.setState({     
                    profilename: 'Henry Gibson',
                    profileimg: IMGDIR+'/images/profile/profile-university.jpg'    
                });  
            } else if(this.props.admintype === 'crm'){
                this.setState({     
                    profilename: 'Rick  Woods',
                    profileimg: IMGDIR+'/images/profile/profile-crm.jpg'    
                });  
            } else if(this.props.admintype === 'music'){
                this.setState({     
                    profilename: 'Kerry Flores',
                    profileimg: IMGDIR+'/images/profile/profile-music.jpg'    
                });  
            } else if(this.props.admintype === 'blog'){
                this.setState({     
                    profilename: 'Alice Gross',
                    profileimg: IMGDIR+'/images/profile/profile-blog.jpg'    
                });  
            } else if(this.props.admintype === 'ecommerce'){
                this.setState({     
                    profilename: 'Jake  Daniel',
                    profileimg: IMGDIR+'/images/profile/profile-ecommerce.jpg'    
                });  
            } else if(this.props.admintype === 'freelance'){
                this.setState({     
                    profilename: 'Eric Nelson',
                    profileimg: IMGDIR+'/images/profile/profile-freelance.jpg'    
                });  
            } else if(this.props.admintype === 'social'){
                this.setState({     
                    profilename: 'Penny Taylor',
                    profileimg: IMGDIR+'/images/profile/profile-social.jpg'    
                });  
            } else {
                this.setState({     
                    profilename: 'Nancy Spencer',
                    profileimg: IMGDIR+'/images/profile/profile-general.jpg'    
                });  
            }

    }
    componentDidUpdate(e){
        if(window.innerWidth < 993 && e.history.location.pathname !== e.location.pathname && document.documentElement.className.indexOf('nav-toggle') !== -1){
            document.documentElement.classList.toggle('nav-toggle');
            this.refs.sidebarToggle.classList.toggle('toggled');
        }
        if(window.innerWidth < 993 && e.history.location.pathname !== e.location.pathname && document.documentElement.className.indexOf('nav-toggle-chat') !== -1){
            document.documentElement.classList.toggle('nav-toggle-chat');
           // this.refs.chatToggle.classList.toggle('toggled');
        }
    }
    render(){
        return (
            // add or remove classes depending if we are on full-screen-maps page or not
            <Navbar expand="lg"
                className={
                    this.props.location.pathname.indexOf('full-screen-maps') !== -1 ?
                    "navbar-absolute fixed-top":"navbar-absolute fixed-top "}>
                <Container fluid>
                    <div className="navbar-wrapper">
                        <div className="navbar-toggle">
                            <button type="button" ref="sidebarToggle" className="navbar-toggler" onClick={() => this.openSidebar()}>
                                <i className="i-menu"></i>
                            </button>
                        </div>
                    </div>
                    
                    <Collapse isOpen={this.state.isOpen} navbar className="navbar-right">
                        <Nav navbar>
                            <Dropdown nav isOpen={this.state.userddOpen} toggle={(e) => this.userddToggle(e)} className="userdd">
                                <DropdownToggle caret nav>
                                <i className="i-user" href="#!" style={{fontSize:'18px'}}></i>
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem tag="a" onClick={()=>window.location.href='/adminProfile/1'} style={{cursor:'pointer'}}><i className="i-user" ></i> Profile</DropdownItem>
                                    <DropdownItem tag="a" onClick={()=>Logout()} style={{cursor:'pointer'}}><i className="i-lock"></i> Logout</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                           
                        </Nav>
                        <div className="screensize" onClick={() => this.toggle_grid()}></div>
                    </Collapse>
                </Container>
            </Navbar>
        );
    }
}

export default Header;