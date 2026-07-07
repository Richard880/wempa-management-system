import {
  FaGraduationCap,
  FaUserTie,
  FaBuilding,
  FaHandshake,
  FaUsers,
  FaCertificate,
  FaBriefcase,
  FaChalkboardTeacher,
  FaIdCard,
  FaBullhorn,
} from "react-icons/fa";

/* ==========================================
     MEMBERSHIP CATEGORIES
  ========================================== */

export const membershipCategories = [
  {
    id: 1,
    title: "Student Membership",
    icon: FaGraduationCap,
    description:
      "Designed for students pursuing maritime education and training who wish to begin their professional journey.",
  },
  {
    id: 2,
    title: "Professional Membership",
    icon: FaUserTie,
    description:
      "For practicing maritime professionals seeking networking, certification, and career development opportunities.",
  },
  {
    id: 3,
    title: "Corporate Membership",
    icon: FaBuilding,
    description:
      "For companies, institutions, and organizations supporting maritime growth and collaboration.",
  },
  {
    id: 4,
    title: "Associate Membership",
    icon: FaHandshake,
    description:
      "For individuals and organizations interested in supporting WEMPA's vision and activities.",
  },
];

/* ==========================================
     MEMBERSHIP BENEFITS
  ========================================== */

export const membershipBenefits = [
  {
    id: 1,
    title: "Professional Networking",
    icon: FaUsers,
    description:
      "Connect with maritime professionals, organizations, and industry leaders across Kenya.",
  },
  {
    id: 2,
    title: "Professional Certification",
    icon: FaCertificate,
    description:
      "Access certification programmes, seminars, and continuous professional development opportunities.",
  },
  {
    id: 3,
    title: "Career Opportunities",
    icon: FaBriefcase,
    description:
      "Receive updates on maritime jobs, internships, scholarships, and consultancy opportunities.",
  },
  {
    id: 4,
    title: "Training & Workshops",
    icon: FaChalkboardTeacher,
    description:
      "Participate in workshops, conferences, and practical maritime training sessions.",
  },
  {
    id: 5,
    title: "Digital Membership Card",
    icon: FaIdCard,
    description:
      "Access your secure digital membership card through the WEMPA member portal.",
  },
  {
    id: 6,
    title: "Industry Representation",
    icon: FaBullhorn,
    description:
      "Be part of a unified voice advocating for maritime professionals and industry growth.",
  },
];

import {
  FaUserPlus,
  FaFileAlt,
  FaUpload,
  FaCreditCard,
  FaCheckCircle,
} from "react-icons/fa";

/* ==========================================
     MEMBERSHIP PROCESS
  ========================================== */

export const membershipProcess = [
  {
    id: 1,
    title: "Create an Account",
    icon: FaUserPlus,
    description:
      "Register your account on the WEMPA portal using your email address and personal details.",
  },
  {
    id: 2,
    title: "Complete Application",
    icon: FaFileAlt,
    description:
      "Fill in your membership application with your education, qualifications, and work experience.",
  },
  {
    id: 3,
    title: "Upload Documents",
    icon: FaUpload,
    description: "Upload the required supporting documents for verification.",
  },
  {
    id: 4,
    title: "Pay Membership Fee",
    icon: FaCreditCard,
    description:
      "Complete your membership payment securely using the available payment methods.",
  },
  {
    id: 5,
    title: "Approval & Activation",
    icon: FaCheckCircle,
    description:
      "Your application will be reviewed and, once approved, your membership will be activated.",
  },
];

/* ==========================================
   MEMBERSHIP FEES
========================================== */

export const membershipFees = [
  {
    id: 1,
    title: "Student",
    fee: "KES 1,000",
    annual: "KES 500 Renewal",
    features: [
      "Student Membership",
      "Training Opportunities",
      "Networking Events",
      "Digital Membership Card",
    ],
  },
  {
    id: 2,
    title: "Professional",
    fee: "KES 3,000",
    annual: "KES 1,500 Renewal",
    featured: true,
    features: [
      "Professional Membership",
      "Certification Programmes",
      "Career Opportunities",
      "Voting Rights",
      "Digital Membership Card",
    ],
  },
  {
    id: 3,
    title: "Corporate",
    fee: "KES 15,000",
    annual: "KES 10,000 Renewal",
    features: [
      "Corporate Membership",
      "Company Recognition",
      "Event Sponsorship",
      "Multiple Representatives",
    ],
  },
];

/* ==========================================
   MEMBERSHIP FAQ
========================================== */

export const membershipFAQs = [
  {
    id: 1,
    question: "Who can become a WEMPA member?",
    answer:
      "Anyone with an interest in the maritime sector, including students, professionals, organizations, and industry stakeholders, may apply for membership under the appropriate category.",
  },
  {
    id: 2,
    question: "How long does the application process take?",
    answer:
      "Applications are reviewed after all required documents have been submitted and payment has been confirmed. Processing typically takes a few working days.",
  },
  {
    id: 3,
    question: "How do I pay my membership fee?",
    answer:
      "Membership fees can be paid using the payment methods provided on the WEMPA portal. Additional payment options will be available as the platform grows.",
  },
  {
    id: 4,
    question: "Will I receive a membership certificate?",
    answer:
      "Yes. Approved members receive a digital membership card and may also receive certificates depending on the membership category and WEMPA policies.",
  },
  {
    id: 5,
    question: "Can I renew my membership online?",
    answer:
      "Yes. Existing members will be able to log into the member portal, renew their membership, update their profile, and make payments online.",
  },
];
