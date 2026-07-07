import PageBanner from "../../components/ui/PageBanner";

import ContactInfo from "../../components/contact/ContactInfo";
// import ContactForm from "../../components/contact/ContactForm";
import GoogleMap from "../../components/contact/GoogleMap";
import ContactFAQ from "../../components/contact/ContactFAQ";

import banner from "../../assets/banners/-banner.jpg";

function Contact() {
  return (
    <>
      <PageBanner
        title="Contact Us"
        subtitle="We'd love to hear from you. Reach out to WEMPA for enquiries, partnerships, membership support, or event information."
        background={banner}
      />

      <ContactInfo />

      <GoogleMap />

      <ContactFAQ />
    </>
  );
}

export default Contact;
