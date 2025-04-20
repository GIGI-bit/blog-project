type ContactTextProps = {
  forContact: string;
  children: React.ReactNode;
};

const ContactText = ({ forContact, children }: ContactTextProps) => {
  return (
    <p className="text-gray-600">
      <span className="text-black font-medium">{forContact}:</span>
      {children}
    </p>
  );
};

export default ContactText;
