import { motion } from "framer-motion";

function PartnerCard({ partner }) {
  return (
    <motion.a
      href={partner.website}
      className="partner-card"
      whileHover={{
        y: -6,
        scale: 1.03,
      }}
      transition={{ duration: 0.25 }}
    >
      {/* Placeholder until logos are added */}
      <div className="partner-placeholder">
        {partner.shortName}
      </div>

      <h6>{partner.name}</h6>
    </motion.a>
  );
}

export default PartnerCard;