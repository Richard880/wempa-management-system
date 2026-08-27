// src/components/layout/Navbar.jsx
import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Container, Navbar, Nav, Button, NavDropdown } from "react-bootstrap";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

// 1. Import your central routing constants contract layout map
import ROUTES from "../../constants/routes"; 

import logo from "../../assets/logos/wempa-logo.jpeg";
import "../../styles/layout/navbar.css";

function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [expanded, setExpanded] = useState(false);
  
  // Core Authentication state matrix tracking variables
  const [user, setUser] = useState(null);
  const [isAdminUser, setIsAdminUser] = useState(false);
  const auth = getAuth();
  const db = getFirestore();
  const navigate = useNavigate();

  useEffect(() => {
    function handleScroll() {
      // FIX: Triggers transition at 20px for immediate feedback
      setScrolled(window.scrollY > 20); 
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Listen continuously to real-time login state variations and check role parameters
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      
      if (currentUser) {
        try {
          // Check if this explicit account context has administrator privileges set
          const userRef = doc(db, "users", currentUser.uid);
          const userSnap = await getDoc(userRef);
          
          if (userSnap.exists()) {
            const userData = userSnap.data();
            // Leverages your established role property token string mappings
            setIsAdminUser(userData.role === "admin" || userData.isAdmin === true);
          } else {
            setIsAdminUser(false);
          }
        } catch (err) {
          console.error("Failed to accurately determine active user privilege scopes:", err);
          setIsAdminUser(false);
        }
      } else {
        setIsAdminUser(false);
      }
    });
    
    return () => unsubscribe();
  }, [auth, db]);

  const closeMenu = () => setExpanded(false);

    const handleLogout = async () => {
    try {
      closeMenu();
      
      // 👇 FIX 1: Cut off the local React state flags instantly BEFORE executing the signout async call.
      // This immediately revokes privileges locally, blocking the UI from triggering a re-route.
      setUser(null);
      setIsAdminUser(false);
      
      // 👇 FIX 2: Force the code to strictly AWAIT the Firebase server token wipe confirmation
      await signOut(auth);
      
      console.log("Firebase session terminated successfully. Redirecting to home baseline...");
      
      // 👇 FIX 3: Route smoothly once the authentication session is guaranteed to be blank
      navigate(ROUTES.HOME, { replace: true });
      
    } catch (err) {
      console.error("Critical error encountered during logout session closure:", err);
      // Fallback redirection safety net
      navigate(ROUTES.HOME, { replace: true });
    }
  };


  // Extract word initial tokens for fallback profile avatars representation
  const initials = user?.displayName
    ? user.displayName.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase()
    : "M";

  // Custom title container constructor for the interactive avatar action block node
  const userMenuDropdownTitle = (
    <div className="d-inline-flex align-items-center gap-2 cursor-pointer">
      <div 
        className="d-flex align-items-center justify-content-center rounded-circle bg-primary text-white fw-bold font-monospace shadow-sm"
        style={{ width: "36px", height: "36px", fontSize: "0.85rem", overflow: "hidden" }}
      >
        {user?.photoURL ? (
          <img src={user.photoURL} alt="User Roster" className="w-100 h-100 object-fit-cover" />
        ) : (
          <span>{initials}</span>
        )}
      </div>
      <span className="text-secondary small fw-bold d-none d-md-inline" style={{ textTransform: "capitalize" }}>
        {user?.displayName ? user.displayName.split(" ")[0] : "Account"}
      </span>
    </div>
  );

  return (
    <Navbar
      expand="lg"
      fixed="top"
      expanded={expanded}
      onToggle={setExpanded}
      // Uses correct local standard bindings to inject your layout classes seamlessly
      className={`wempa-navbar ${scrolled ? "navbar-scrolled" : ""}`}
    >
      <Container>
        <Navbar.Brand as={Link} to={ROUTES.HOME} className="navbar-brand-custom" onClick={closeMenu}>
          <img src={logo} alt="WEMPA Logo" />
          <div className="brand-text">
            <h5>WEMPA</h5>
            <span>
              Western Kenya Maritime
              <br />
              Professionals Association
            </span>
          </div>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar" />

        <Navbar.Collapse id="main-navbar">
          <Nav className="mx-auto">
            {/* 2. Public Application Navigation Link Mappings */}
            <Nav.Link as={NavLink} to={ROUTES.HOME} end onClick={closeMenu}>Home</Nav.Link>
            <Nav.Link as={NavLink} to="/about" onClick={closeMenu}>About</Nav.Link>
            <Nav.Link as={NavLink} to="/membership" onClick={closeMenu}>Membership</Nav.Link>
            <Nav.Link as={NavLink} to="/events" onClick={closeMenu}>Events</Nav.Link>
            <Nav.Link as={NavLink} to="/news" onClick={closeMenu}>News</Nav.Link>
            <Nav.Link as={NavLink} to="/contact" onClick={closeMenu}>Contact</Nav.Link>
          </Nav>

          {/* Dynamic Authentication Action Interceptor block layout framework */}
          <div className="navbar-buttons d-flex align-items-center gap-2">
            {user ? (
              <NavDropdown title={userMenuDropdownTitle} id="user-profile-nav-dropdown" align="end" className="border-0">
                <NavDropdown.Item as={Link} to={ROUTES.MEMBER_PROFILE} onClick={closeMenu} className="py-2 small">
                  <i className="bi bi-person-circle me-2 text-primary" /> My Profile
                </NavDropdown.Item>
                
                {/* 3. 🟢 CENTRALIZED REGISTRY DASHBOARD ROUTING INTERACTION LINK SWITCH */}
                {isAdminUser ? (
                  <NavDropdown.Item as={Link} to={ROUTES.ADMIN_DASHBOARD} onClick={closeMenu} className="py-2 small">
                    <i className="bi bi-speedometer2 me-2 text-danger" /> Admin Dashboard
                  </NavDropdown.Item>
                ) : (
                  <NavDropdown.Item as={Link} to={ROUTES.MEMBER_DASHBOARD} onClick={closeMenu} className="py-2 small">
                    <i className="bi bi-columns-gap me-2 text-success" /> Member Dashboard
                  </NavDropdown.Item>
                )}
                
                <NavDropdown.Divider className="border-secondary opacity-25" />
                <NavDropdown.Item onClick={handleLogout} className="py-2 small text-danger">
                  <i className="bi bi-box-arrow-right me-2" /> Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <Button as={Link} to={ROUTES.LOGIN} variant="link" className="login-btn" onClick={closeMenu}>
                  Login
                </Button>
                <Button as={Link} to={ROUTES.REGISTER} className="join-btn" onClick={closeMenu}>
                  Become a Member
                </Button>
              </>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
