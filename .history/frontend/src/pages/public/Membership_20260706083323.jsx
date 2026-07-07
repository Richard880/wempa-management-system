import PageBanner from "../../components/ui/PageBanner";
import MembershipCategories from "../../components/membership/MembershipCategories";
import MembershipBenefits from "../../components/membership/MembershipBenefits";
import MembershipProcess from "../../components/membership/MembershipProcess";

import banner from "../../assets/banners/membership-banner.png";

function Membership() {
  return (
    <>
      <PageBanner
        title="Membership"
        subtitle="Join a growing network of maritime professionals dedicated to excellence, innovation, and collaboration across Western Kenya."
        background={banner}
      />

      <MembershipCategories />

      <MembershipBenefits />
    </>
  );
}

export default Membership;
