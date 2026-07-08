//src/components/contact/ContactMap.tsx

export default function ContactMap() {
  return (
    <div className="mt-10 overflow-hidden rounded-2xl border border-[#ECECEC] shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
      <iframe
        title="MPR Furniture Location"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3920.1959088427416!2d78.4117519!3d10.719367700000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baa6982a2d8c067%3A0x350575e96b8cc5cf!2sMPR%20FURNITURE%20Office%20Chair%20Service!5e0!3m2!1sen!2sin!4v1783232088115!5m2!1sen!2sin"
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        className="h-[260px] w-full border-0 sm:h-[300px] lg:h-[330px]"
      />
    </div>
  );
}