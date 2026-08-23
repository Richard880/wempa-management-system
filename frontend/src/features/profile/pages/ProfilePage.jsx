// src/features/profile/pages/ProfilePage.jsx
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, ListGroup, Badge, Button, Spinner } from "react-bootstrap";
import { FaUser, FaEnvelope, FaPhone, FaBuilding, FaCalendarCheck, FaSignOutAlt, FaIdCard, FaMapMarkerAlt } from "react-icons/fa";
import { getAuth, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const auth = getAuth();
  const db = getFirestore();
  const navigate = useNavigate();
  
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState("Auth Session");

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      navigate("/login");
      return;
    }

    async function resolveUserProfile() {
      try {
        setLoading(true);
        
        // 1. Step A: Check the 'members' collection first (Full Application Records)
        const memberRef = doc(db, "members", currentUser.uid);
        const memberSnap = await getDoc(memberRef);
        
        if (memberSnap.exists()) {
          const data = memberSnap.data();
          setProfile({
            fullName: data.fullName || data.name || currentUser.displayName || "WEMPA Member",
            email: data.email || currentUser.email,
            phone: data.phone || data.phoneNumber || "Not Provided",
            organization: data.organization || data.company || "Independent Professional",
            membershipType: data.membershipType || "Professional",
            location: data.location || data.county || "Kenya",
            joinedAt: data.createdAt || data.joinedAt || currentUser.metadata.creationTime,
            photoUrl: data.photoUrl || currentUser.photoURL
          });
          setDataSource("WEMPA Certified Membership Roster");
          return;
        }

        // 2. Step B: Fallback to check the basic 'users' registration collection
        const userRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userRef);
        
        if (userSnap.exists()) {
          const data = userSnap.data();
          setProfile({
            fullName: data.fullName || data.name || currentUser.displayName || "WEMPA User",
            email: data.email || currentUser.email,
            phone: data.phone || "Not Provided",
            organization: data.organization || "General Member",
            membershipType: "Standard Registered Account",
            location: data.location || "Kenya",
            joinedAt: data.createdAt || currentUser.metadata.creationTime,
            photoUrl: data.photoUrl || currentUser.photoURL
          });
          setDataSource("Registered Accounts Directory");
          return;
        }

        // 3. Step C: Hard fallback directly to active browser Auth Token values
        setProfile({
          fullName: currentUser.displayName || "WEMPA User",
          email: currentUser.email,
          phone: "Not Provided",
          organization: "Pending Profile Completion",
          membershipType: "Basic Account",
          location: "Kenya",
          joinedAt: currentUser.metadata.creationTime,
          photoUrl: currentUser.photoURL
        });
        setDataSource("Firebase Authentication Session Token");

      } catch (err) {
        console.error("Critical error parsing profile documents:", err);
      } finally {
        setLoading(false);
      }
    }

    resolveUserProfile();
  }, [auth, db, navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  if (loading) {
    return (
      <Container className="py-5 mt-5 text-center">
        <Spinner animation="border" variant="primary" className="mb-2" />
        <p className="text-secondary small">Synchronizing your professional credentials from Firestore...</p>
      </Container>
    );
  }

  // Extract initials for clean visual placeholder avatars
  const initials = profile?.fullName
    ? profile.fullName.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase()
    : "WP";

  return (
    <Container className="py-5 mt-5">
      <Row className="g-4">
        {/* Left Side Column: Interactive Profile Card */}
        <Col lg={4}>
          <Card className="border-0 shadow-sm text-center p-4 bg-white rounded-3 h-100 d-flex flex-column justify-content-between">
            <div>
              <div className="mx-auto mb-3 d-flex align-items-center justify-content-center rounded-circle bg-primary text-white font-monospace fw-bold shadow-sm"
                   style={{ width: "110px", height: "110px", fontSize: "2.2rem", overflow: "hidden" }}>
                {profile?.photoUrl ? (
                  <img src={profile.photoUrl} alt="User Profile" className="w-100 h-100 object-fit-cover" />
                ) : (
                  <span>{initials}</span>
                )}
              </div>
              <h4 className="fw-bold text-dark mb-1 text-truncate px-2">{profile?.fullName}</h4>
              <Badge bg="primary" className="px-3 py-2 text-uppercase mb-2 small">{profile?.membershipType}</Badge>
              <p className="text-muted small mb-0 px-3">Account verified via {dataSource}</p>
            </div>
            
            <Button variant="outline-danger" className="w-100 d-inline-flex align-items-center justify-content-center gap-2 py-2.5 mt-4 fw-semibold" onClick={handleLogout}>
              <FaSignOutAlt /> Sign Out
            </Button>
          </Card>
        </Col>

        {/* Right Side Column: Core Membership Metrics Roster Sheets */}
        <Col lg={8}>
          <Card className="border-0 shadow-sm p-4 bg-white rounded-3 text-start">
            <h5 className="fw-bold text-dark border-bottom pb-3 mb-4">Official Identification Details</h5>
            
            <ListGroup variant="flush" className="d-flex flex-column gap-3.5">
              <ListGroup.Item className="border-0 px-0 d-flex align-items-center gap-3 bg-transparent py-1">
                <div className="bg-light p-2.5 rounded text-primary"><FaUser size={18} /></div>
                <div>
                  <span className="text-muted d-block small mb-0.5">Full Name</span>
                  <strong className="text-dark fs-6">{profile?.fullName}</strong>
                </div>
              </ListGroup.Item>

              <ListGroup.Item className="border-0 px-0 d-flex align-items-center gap-3 bg-transparent py-1">
                <div className="bg-light p-2.5 rounded text-secondary"><FaEnvelope size={18} /></div>
                <div>
                  <span className="text-muted d-block small mb-0.5">Email Address</span>
                  <strong className="text-dark fs-6">{profile?.email}</strong>
                </div>
              </ListGroup.Item>

              <ListGroup.Item className="border-0 px-0 d-flex align-items-center gap-3 bg-transparent py-1">
                <div className="bg-light p-2.5 rounded text-success"><FaPhone size={18} /></div>
                <div>
                  <span className="text-muted d-block small mb-0.5">Contact Number</span>
                  <strong className="text-dark fs-6">{profile?.phone}</strong>
                </div>
              </ListGroup.Item>

              <ListGroup.Item className="border-0 px-0 d-flex align-items-center gap-3 bg-transparent py-1">
                <div className="bg-light p-2.5 rounded text-info"><FaBuilding size={18} /></div>
                <div>
                  <span className="text-muted d-block small mb-0.5">Organization / Company Affiliation</span>
                  <strong className="text-dark fs-6">{profile?.organization}</strong>
                </div>
              </ListGroup.Item>

              <ListGroup.Item className="border-0 px-0 d-flex align-items-center gap-3 bg-transparent py-1">
                <div className="bg-light p-2.5 rounded text-danger"><FaMapMarkerAlt size={18} /></div>
                <div>
                  <span className="text-muted d-block small mb-0.5">Location / Base Station</span>
                  <strong className="text-dark fs-6">{profile?.location}</strong>
                </div>
              </ListGroup.Item>

              <ListGroup.Item className="border-0 px-0 d-flex align-items-center gap-3 bg-transparent py-1">
                <div className="bg-light p-2.5 rounded text-warning"><FaCalendarCheck size={18} /></div>
                <div>
                  <span className="text-muted d-block small mb-0.5">Registration Timestamp</span>
                  <strong className="text-dark fs-6">
                    {profile?.joinedAt ? new Date(profile.joinedAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }) : "Recent Account"}
                  </strong>
                </div>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
