type ContactTextProps = {
  forContact: string;
  children: React.ReactNode;
};

const ContactText = ({ forContact, children }: ContactTextProps) => {
  return (
    <p className="text-gray-600 dark:text-[#97989F]">
      <span className="text-black font-medium dark:text-white">
        {forContact}:
      </span>
      {children}
    </p>
  );
};

export default ContactText;
