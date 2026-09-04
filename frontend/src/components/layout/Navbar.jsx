// src/components/layout/Navbar.jsx
import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Container, Navbar, Nav, Button, NavDropdown } from "react-bootstrap";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

import ROUTES from "../../constants/routes"; 
import logo from "../../../public/wempa-logo.jpeg";
import "../../styles/layout/navbar.css";

function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [expanded, setExpanded] = useState(false);
  
  const [user, setUser] = useState(null);
  const [isAdminUser, setIsAdminUser] = useState(false);
  // 🟢 NEW STATE SYNC: Tracks the active member data structure from Firestore
  const [memberProfile, setMemberProfile] = useState({ photoUrl: null, displayName: "" });
  
  const auth = getAuth();
  const db = getFirestore();
  const navigate = useNavigate();

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 20); 
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      
      if (currentUser) {
        try {
          // 🟢 HARMOIZED SYNCHRONIZATION RUNWAY: Check member snapshot fields for passports photos
          const memberRef = doc(db, "members", currentUser.uid);
          const userRef = doc(db, "users", currentUser.uid);

          const [memberSnap, userSnap] = await Promise.all([
            getDoc(memberRef),
            getDoc(userRef)
          ]);
          
          if (memberSnap.exists()) {
            const memberData = memberSnap.data();
            const personal = memberData.personal || {};
            const docs = memberData.documents || {};
            
            // Construct full string layout parameters from profile documents
            const constructedName = [personal.firstName, personal.lastName].filter(Boolean).join(" ");

            setMemberProfile({
              // 🟢 EXTRACTS DIRECTLY FROM PASSPORTPHOTO NODE MAP downloadURL
              photoUrl: docs.passportPhoto?.downloadURL || docs.documents?.passportPhoto?.downloadURL || currentUser.photoURL || null,
              displayName: constructedName || currentUser.displayName || "Account"
            });
          } else {
            setMemberProfile({ photoUrl: currentUser.photoURL, displayName: currentUser.displayName || "Account" });
          }

          if (userSnap.exists()) {
            const userData = userSnap.data();
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
        setMemberProfile({ photoUrl: null, displayName: "" });
      }
    });
    
    return () => unsubscribe();
  }, [auth, db]);

  const closeMenu = () => setExpanded(false);

  const handleLogout = async () => {
    try {
      closeMenu();
      setUser(null);
      setIsAdminUser(false);
      setMemberProfile({ photoUrl: null, displayName: "" });
      
      await signOut(auth);
      navigate(ROUTES.HOME, { replace: true });
    } catch (err) {
      console.error("Critical error encountered during logout session closure:", err);
      navigate(ROUTES.HOME, { replace: true });
    }
  };

  const initials = memberProfile.displayName
    ? memberProfile.displayName.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase()
    : "M";

  // Dynamic user profile photo element builder
  const userMenuDropdownTitle = (
    <div className="d-inline-flex align-items-center gap-2 cursor-pointer">
      <div 
        className="d-flex align-items-center justify-content-center rounded-circle bg-primary text-white fw-bold font-monospace shadow-sm"
        style={{ width: "36px", height: "36px", fontSize: "0.85rem", overflow: "hidden" }}
      >
        {/* 🟢 PROFILE IMAGE RE-ROUTING FIXED: Prioritizes verified Firestore asset links */}
        {memberProfile.photoUrl ? (
          <img src={memberProfile.photoUrl} alt="User Avatar" className="w-100 h-100 object-fit-cover" />
        ) : (
          <span>{initials}</span>
        )}
      </div>
      <span className="text-secondary small fw-bold d-none d-md-inline" style={{ textTransform: "capitalize" }}>
        {memberProfile.displayName ? memberProfile.displayName.split(" ")[0] : "Account"}
      </span>
    </div>
  );

  return (
    <Navbar
      expand="lg"
      fixed="top"
      expanded={expanded}
      onToggle={setExpanded}
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
            <Nav.Link as={NavLink} to={ROUTES.HOME} end onClick={closeMenu}>Home</Nav.Link>
            <Nav.Link as={NavLink} to="/about" onClick={closeMenu}>About</Nav.Link>
            <Nav.Link as={NavLink} to="/membership" onClick={closeMenu}>Membership</Nav.Link>
            <Nav.Link as={NavLink} to="/events" onClick={closeMenu}>Events</Nav.Link>
            <Nav.Link as={NavLink} to="/news" onClick={closeMenu}>News</Nav.Link>
            <Nav.Link as={NavLink} to="/contact" onClick={closeMenu}>Contact</Nav.Link>
          </Nav>

          <div className="navbar-buttons d-flex align-items-center gap-2">
            {user ? (
              <NavDropdown title={userMenuDropdownTitle} id="user-profile-nav-dropdown" align="end" className="border-0">
                <NavDropdown.Item as={Link} to={ROUTES.MEMBER_PROFILE} onClick={closeMenu} className="py-2 small">
                  <i className="bi bi-person-circle me-2 text-primary" /> My Profile
                </NavDropdown.Item>
                
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
